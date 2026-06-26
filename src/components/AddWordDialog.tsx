import { useState } from "react";
import { useCreateWord } from "../hooks/useCreateWord";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function AddWordDialog({ open, onOpenChange }: Props) {
  const [text, setText] = useState("");
  const createWord = useCreateWord();

  const submit = async () => {
    if (!text.trim()) return;

    await createWord.mutateAsync({
      text: text.trim(),
    });

    setText("");
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
      {/* Panel */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 shadow-xl">
        {/* Header */}
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold">Add new word</h2>
          <p className="text-sm text-slate-500">
            Just type a word, we’ll handle the rest
          </p>
        </div>

        {/* Body */}
        <div className="p-5">
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="e.g. immensely"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-slate-800
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

          <p className="mt-3 text-xs text-slate-400">
            Press Enter to add quickly
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="
              rounded-xl
              px-4 py-2
              text-sm
              text-slate-600
              hover:bg-slate-100
            "
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={createWord.isPending}
            className="
              rounded-xl
              bg-blue-600
              px-4 py-2
              text-sm
              text-white
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {createWord.isPending ? "Adding..." : "Add word"}
          </button>
        </div>
      </div>
    </div>
  );
}
