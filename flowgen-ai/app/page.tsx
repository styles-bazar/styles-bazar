"use client";

import { useState } from "react";

type Mode = "Image" | "Video";

export default function Home() {
  const [mode, setMode] = useState<Mode>("Image");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first.");
      return;
    }

    setIsGenerating(true);
    setGenerated(false);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const useExample = (text: string) => {
    setPrompt(text);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-xl font-bold">
              F
            </div>

            <h1 className="text-xl font-bold sm:text-2xl">
              FlowGen{" "}
              <span className="text-purple-400">AI</span>
            </h1>
          </div>

          <button className="rounded-full border border-white/15 px-5 py-2 text-sm transition hover:bg-white/10">
            Sign In
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm text-purple-300">
            ✨ AI Creative Studio
          </div>

          <h2 className="text-5xl font-black tracking-tight sm:text-7xl">
            Create anything
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              with AI
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Turn your ideas into stunning images and videos with
            FlowGen AI.
          </p>
        </div>

        {/* CREATOR */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-purple-950/20 sm:p-6">
            {/* MODE SELECTOR */}
            <div className="mb-5 flex justify-center">
              <div className="flex rounded-xl border border-white/10 bg-black/60 p-1">
                <button
                  onClick={() => setMode("Image")}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition ${
                    mode === "Image"
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  🖼️ Image
                </button>

                <button
                  onClick={() => setMode("Video")}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition ${
                    mode === "Video"
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  🎬 Video
                </button>
              </div>
            </div>

            {/* PROMPT */}
            <div className="rounded-2xl border border-white/10 bg-black/50">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  mode === "Image"
                    ? "Describe the image you want to create..."
                    : "Describe the video you want to create..."
                }
                className="h-36 w-full resize-none bg-transparent p-5 text-base outline-none placeholder:text-gray-600 sm:h-40 sm:text-lg"
              />

              {/* BOTTOM BAR */}
              <div className="flex flex-col gap-4 border-t border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {prompt.length} characters
                  </span>

                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 outline-none"
                  >
                    <option className="bg-black">Cinematic</option>
                    <option className="bg-black">Realistic</option>
                    <option className="bg-black">Anime</option>
                    <option className="bg-black">3D</option>
                    <option className="bg-black">Fantasy</option>
                  </select>
                </div>

                <button
                  onClick={generate}
                  disabled={isGenerating}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 font-bold transition hover:scale-[1.02] hover:from-purple-500 hover:to-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating ? "⏳ Generating..." : "✨ Generate"}
                </button>
              </div>
            </div>
          </div>

          {/* EXAMPLES */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={() =>
                useExample(
                  "A futuristic city at night, neon lights, cinematic, ultra realistic"
                )
              }
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              🌃 Futuristic City
            </button>

            <button
              onClick={() =>
                useExample(
                  "A cute robot exploring Mars, cinematic movie scene, dramatic lighting"
                )
              }
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              🤖 Robot on Mars
            </button>

            <button
              onClick={() =>
                useExample(
                  "Beautiful mountain landscape at sunset, realistic photography, 8K"
                )
              }
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              🏔️ Mountain
            </button>
          </div>

          {/* RESULT AREA */}
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Your Creation</h3>

              {generated && (
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(prompt)
                  }
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
                >
                  📋 Copy Prompt
                </button>
              )}
            </div>

            <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-purple-950/10">
              {isGenerating ? (
                <div className="text-center">
                  <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-purple-500" />

                  <p className="font-semibold">
                    Creating your {mode.toLowerCase()}...
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Style: {style}
                  </p>
                </div>
              ) : generated ? (
                <div className="w-full p-8 text-center">
                  <div className="mx-auto flex h-48 max-w-2xl items-center justify-center rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/40 via-black to-pink-900/20">
                    <div>
                      <div className="mb-3 text-5xl">
                        {mode === "Image" ? "🖼️" : "🎬"}
                      </div>

                      <p className="font-semibold">
                        {mode} generation preview
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Your AI-generated result will appear here.
                      </p>
                    </div>
                  </div>

                  <p className="mx-auto mt-5 max-w-2xl text-sm text-gray-400">
                    <span className="text-purple-400">
                      Prompt:
                    </span>{" "}
                    {prompt}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4 text-5xl opacity-50">
                    ✨
                  </div>

                  <p className="font-semibold text-gray-300">
                    Nothing generated yet
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Enter a prompt and click Generate.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-8 text-center">
        <p className="text-sm text-gray-600">
          © 2026 FlowGen AI — Create without limits.
        </p>
      </footer>
    </main>
  );
}