"use client";

import { DarkThemeToggle, Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function GraphRunListPage() {
  const runs = ["bagtest_01", "bag_diff_022", "paper_hepar2_bin_bag_001"];

  return (
    <main className="flex min-h-screen flex-row bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col gap-6 bg-gray-100 p-6 dark:bg-gray-800">
        <div>
          <h2 className="mb-2 text-xl font-bold">Navigation</h2>
          <nav className="flex flex-col gap-3">
            <Link href="/" className="hover:text-primary-500">
              🏠 Home
            </Link>
            <Link
              href="https://github.com/felixleopoldo/benchpress"
              target="_blank"
              className="hover:text-primary-500"
            >
              📁 Repository
            </Link>
            <Link
              href="https://benchpressdocs.readthedocs.io/en/latest/"
              target="_blank"
              className="hover:text-primary-500"
            >
              📚 Documentation
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="relative flex-1 p-10">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 select-none">
          <Image
            className="absolute right-0 min-w-dvh dark:hidden"
            alt="Pattern Light"
            src="/pattern-light.svg"
            width={803}
            height={774}
          />
          <Image
            className="absolute right-0 hidden min-w-dvh dark:block"
            alt="Pattern Dark"
            src="/pattern-dark.svg"
            width={803}
            height={775}
          />
        </div>

        {/* Dark mode toggle */}
        <div className="absolute top-4 right-4">
          <DarkThemeToggle />
        </div>

        {/* Latest Runs List */}
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Latest Runs</h2>
          <div className="flex flex-col gap-3">
            {runs.map((run) => (
              <Link
                key={run}
                href={`/diagrams/graphs/${run}`}
                className="text-lg text-blue-600 hover:underline"
              >
                🧪 {run}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
