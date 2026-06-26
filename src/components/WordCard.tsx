import type { Word } from "../types/Word";

export function WordCard({ word }: { word: Word }) {
  return (
    <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-semibold">{word.text}</h2>

          <p className="text-sm italic text-slate-500 mt-1">{word.phonetic}</p>
        </div>

        <span
          className={`
            text-xs px-3 py-1 rounded-full font-medium
            ${
              word.status === "MASTERED"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }
          `}
        >
          {word.status === "MASTERED" ? "Mastered" : "Learning"}
        </span>
      </div>

      <div className="mt-3">
        <span className="text-xs bg-slate-100 px-2 py-1 rounded">
          {word.partOfSpeech}
        </span>
      </div>

      <p className="mt-3 text-slate-700">{word.definition}</p>

      {word.example && (
        <p className="mt-3 italic text-slate-500">“{word.example}”</p>
      )}
    </div>
  );
}
