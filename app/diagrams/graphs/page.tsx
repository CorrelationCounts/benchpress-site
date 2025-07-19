"use client";

import Link from "next/link";
import { Button } from "flowbite-react";
import Image from "next/image";

export default function GraphDashboard() {
  // Now each image can have its own path and label
  const images = [
    { src: "C:/Users/Lenovo/Documents/benchpress/results/evaluation/bagging/bagtest_01/bagged_adjmat.png", label: "Graph 1" },
    { src: "C:/Users/Lenovo/Documents/benchpress/results/evaluation/bagging/bagtest_01/agged_graph.png", label: "Graph 2" },
    // Add more here
  ];

  return (
    <div className="min-h-screen bg-green-100 p-10">
      <h1 className="mb-4 text-4xl font-bold text-green-800">
        Graph Dashboard
      </h1>
      <p className="mb-6">
        Showcasing latest bagging graphs:
      </p>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center rounded bg-white p-4 shadow"
          >
            <Image
              src={img.src}
              alt={img.label}
              width={300}
              height={192}
              className="mb-2 max-h-48 w-auto"
            />
            <span className="text-sm text-gray-700">{img.label}</span>
          </div>
        ))}
      </div>

      <Link href="/">
        <Button color="gray">Back to Home</Button>
      </Link>
    </div>
  );
}
