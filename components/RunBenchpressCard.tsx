"use client";

import { useRef, useState } from "react";

export default function RunBenchpressCard() {
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRunClick = () => {
    fileInputRef.current?.click(); // Trigger hidden file input
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setRunning(true);
    setOutput(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const configContent = reader.result as string;

        const res = await fetch("/api/run-benchpress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ config: configContent }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unknown error");
        setOutput(data.message);
      } catch (err) {
        const msg =
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message: string }).message
            : String(err);
        setOutput("Error: " + msg);
      } finally {
        setRunning(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        disabled={running}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-600"
        onClick={handleRunClick}
      >
        {running ? "Running..." : "Choose Config & Run"}
      </button>

      {output && (
        <pre className="mt-3 text-xs whitespace-pre-wrap text-gray-300">
          {output}
        </pre>
      )}
    </div>
  );
}
