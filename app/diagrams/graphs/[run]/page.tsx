"use client";

import { useParams } from "next/navigation";
import { DarkThemeToggle, Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function GraphRunPage() {
  const run = useParams().run;
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    label: string;
  }>(null);

  const graphData: Record<string, { src: string; label: string }[]> = {
    bagtest_01: [
      { src: "/graphs/bagtest_01/bagged_adjmat.png", label: "Graph 1" },
      { src: "/graphs/bagtest_01/bagged_graph.png", label: "Graph 2" },
    ],
    bag_diff_022: [
      {
        src: "/graphs/bag_diff_022/bagging_original_diff.png",
        label: "Graph 1",
      },
      { src: "/graphs/bag_diff_022/bagging_original.png", label: "Graph 2" },
      {
        src: "/graphs/bag_diff_022/bidag_itsearch_original.png",
        label: "Graph 3",
      },
      {
        src: "/graphs/bag_diff_022/bnlearn_tabu_original.png",
        label: "Graph 4",
      },
      {
        src: "/graphs/bag_diff_022/bnlearn_tabu_original_diff.png",
        label: "Graph 5",
      },
      {
        src: "/graphs/bag_diff_022/bidag_itsearch_original_diff.png",
        label: "Graph 6",
      },
      {
        src: "/graphs/bag_diff_022/tetrad_fges_original_diff.png",
        label: "Graph 7",
      },
      {
        src: "/graphs/bag_diff_022/tetrad_fges_original.png",
        label: "Graph 8",
      },
    ],
    paper_hepar2_bin_bag_001: [
      {
        src: "/graphs/paper_hepar2_bin_bag_001/F1_PATTERN_JOINT.png",
        label: "Graph 1",
      },
      {
        src: "/graphs/paper_hepar2_bin_bag_001/F1_SKEL_JOINT.png",
        label: "Graph 2",
      },
      {
        src: "/graphs/paper_hepar2_bin_bag_001/FPR_TPR_Pattern.png",
        label: "Graph 3",
      },
      {
        src: "/graphs/paper_hepar2_bin_bag_001/FPR_TPR_skel.png",
        label: "Graph 4",
      },
      {
        src: "/graphs/paper_hepar2_bin_bag_001/GRAPH_TYPE.png",
        label: "Graph 5",
      },
      {
        src: "/graphs/paper_hepar2_bin_bag_001/ROC_FPR_TPR.png",
        label: "Graph 6",
      },
    ],
  };

  const graphs = graphData[run as string] || [];

  return (
    <main className="relative flex min-h-screen flex-col bg-white px-6 py-10 dark:bg-gray-900">
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

      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>

      {/* Modal viewer */}
      {selectedImage && (
        <div className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 left-4 text-3xl font-bold text-white"
          >
            ×
          </button>
          <div
            className={`max-h-[90%] max-w-[90%] transition-transform duration-300 ${
              selectedImage.label === "Graph 1" ? "scale-90" : "scale-100"
            }`}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.label}
              width={900}
              height={900}
              className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Title */}
      <h1 className="mb-4 text-4xl font-bold text-white dark:text-white">
        Run: {run}
      </h1>
      <p className="mb-6 text-gray-300">
        {graphs.length > 0
          ? "Here are the generated graphs:"
          : "No graphs available for this run."}
      </p>

      {/* Graph card grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {graphs.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className="flex cursor-pointer flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow transition hover:ring-2 hover:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="relative h-[200px] w-[300px]">
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-contain"
              />
            </div>
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {img.label}
            </span>
          </div>
        ))}
      </div>

      {/* Back button */}
      <div className="mt-10">
        <Link href="/diagrams/graphs">
          <Button color="gray">← Back to All Runs</Button>
        </Link>
      </div>
    </main>
  );
}
