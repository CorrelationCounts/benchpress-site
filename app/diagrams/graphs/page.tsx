"use client";

import Link from "next/link";
import { Button } from "flowbite-react";
import Image from "next/image";

export default function GraphDashboard() {
  // List your PNG filenames here
  const images = [
    "graph1.png",
    "graph2.png",
    // Add more filenames as needed
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
              src={`/graphs/${img}`}
              alt={img}
              width={300}
              height={192}
              className="mb-2 max-h-48 w-auto"
            />
            <span className="text-sm text-gray-700">{img}</span>
          </div>
        ))}
      </div>

      <Link href="/">
        <Button color="gray">Back to Home</Button>
      </Link>
    </div>
  );
}
