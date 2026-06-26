import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useWords } from "../hooks/useWords";
import { AddWordDialog } from "../components/AddWordDialog";
import { WordCard } from "./WordCard";

type Word = {
  id: string;
  text: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  deckId: string;
  status: "NOT_YET" | "MASTERED";
};

export default function WordListPage() {
  const { data: words = [], isLoading, isError } = useWords();

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);

  // =========================
  // FILTER (safe + fast)
  // =========================
  const filteredWords = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return words;

    return words.filter((w) => {
      return (
        w.text?.toLowerCase().includes(q) ||
        w.definition?.toLowerCase().includes(q) ||
        w.phonetic?.toLowerCase().includes(q) ||
        w.partOfSpeech?.toLowerCase().includes(q)
      );
    });
  }, [words, search]);

  // =========================
  // VIRTUALIZER
  // =========================
  const virtualizer = useVirtualizer({
    count: filteredWords.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 190,
    overscan: 8,
    measureElement: (el) => el?.getBoundingClientRect().height,
  });

  // =========================
  // STATES
  // =========================
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading vocabulary...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load vocabulary
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50">
      <div className="mx-auto flex h-full max-w-6xl flex-col p-6">
        {/* ================= HEADER ================= */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-3xl font-bold">Vocabulary</h1>
            <p className="text-sm text-slate-500 mt-1">
              {filteredWords.length} words
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-xl
              font-medium
              cursor-pointer
            "
          >
            + Add Word
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search word, meaning, phonetic..."
          className="
            mb-4
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-100
            focus:border-blue-500
          "
        />

        {/* ================= EMPTY STATE ================= */}
        {filteredWords.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            No words found
          </div>
        )}

        {/* ================= LIST ================= */}
        <div ref={parentRef} className="flex-1 overflow-auto pr-2">
          <div
            style={{
              height: virtualizer.getTotalSize(),
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((item) => {
              const word = filteredWords[item.index];

              if (!word) return null;

              return (
                <div
                  key={word.id}
                  ref={virtualizer.measureElement}
                  data-index={item.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${item.start}px)`,
                  }}
                >
                  <WordCard word={word} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= ADD MODAL ================= */}
        <AddWordDialog open={openAdd} onOpenChange={setOpenAdd} />
      </div>
    </div>
  );
}
