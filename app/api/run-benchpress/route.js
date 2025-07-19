import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST() {
  try {
    const benchpressDir = process.env.BENCHPRESS_PATH || "/benchpress";
    const configFile = process.env.BENCHPRESS_CONFIG || "config/weighted.json";
    const { stdout } = await execAsync(
      "snakemake --cores 4 --configfile config/weighted.json",
      `snakemake --cores 4 --configfile ${configFile}`,
      {
        cwd: "/benchpress", // replace with your local path
        cwd: benchpressDir,
      }
    );

    return NextResponse.json({ message: "Benchpress completed", output: stdout });
  } catch (error) {
    return NextResponse.json(
      { message: "Benchpress failed", error: error.stderr || error.message },
      { status: 500 }
    );
  }
}