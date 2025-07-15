// app/api/run-benchpress/route.js


import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST() {
  try {
    const { stdout } = await execAsync(
      "snakemake --cores 4 --configfile config/your_config.json",
      {
        cwd: "/benchpress", // replace with your local path
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
