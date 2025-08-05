"use client";

import Link from "next/link";
import { Button } from "flowbite-react";

type ConfigFile = {
  name: string;
  url: string;
};

export default function ConfigurationsPage() {
  const configList: ConfigFile[] = [
    { name: "chordal_algos.json", url: "/configs/chordal_algos.json" },
    { name: "config.json", url: "/configs/config.json" },
    { name: "configdocs.json", url: "/configs/configdocs.json" },
    { name: "gcastle.json", url: "/configs/gcastle.json" },
    { name: "minimal.json", url: "/configs/minimal.json" },
    { name: "paper_er_bin.json", url: "/configs/paper_er_bin.json" },
    { name: "paper_er_sem.json", url: "/configs/paper_er_sem.json" },
    // Add more here
  ];

  return (
    <main className="flex min-h-screen flex-col justify-between bg-gray-900 px-6 py-10 text-white">
      <div>
        <h1 className="mb-6 text-4xl font-bold">Configurations</h1>
        <p className="mb-6 text-gray-400">
          Browse and download JSON benchmark configurations.
        </p>

        {/* Config file cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {configList.map((file, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-700 bg-gray-800 p-4 shadow transition hover:ring-2 hover:ring-blue-500"
            >
              <h2 className="text-lg font-semibold break-words">{file.name}</h2>
              <div className="mt-4 flex justify-start space-x-2">
                <Link href={file.url} target="_blank">
                  <Button size="sm" color="blue">
                    View
                  </Button>
                </Link>
                <Link href={file.url} download>
                  <Button size="sm" color="gray">
                    Download
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to homepage/dashboard */}
      <div className="mt-10 flex justify-center">
        <Link href="/">
          <Button color="gray">← Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
