import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req) {
  try {
    const body = await req.json();
    const configFile = body?.config || process.env.BENCHPRESS_CONFIG || "config/config.json";
    const benchpressDir = process.env.BENCHPRESS_PATH || "/home/adam/benchpress";
    const snakemakePath = "/home/adam/.local/bin/snakemake";

    const command = `${snakemakePath} --cores 4 --configfile ${configFile}`;

    console.log("Running Benchpress at:", benchpressDir);
    console.log("Command:", command);

    const { stdout, stderr } = await execAsync(command, {
      cwd: benchpressDir,
      env: {
        ...process.env,
        PATH: process.env.PATH + ":/home/adam/.local/bin",
      },
    });

    console.log("Snakemake Output:", stdout);
    if (stderr) console.warn("Snakemake stderr:", stderr);

    return NextResponse.json({
      message: "Benchpress completed successfully",
      output: stdout,
    });
  } catch (error) {
    console.error("Snakemake error:", error);
    return NextResponse.json(
      {
        message: "Benchpress failed",
        error: error.stderr || error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
