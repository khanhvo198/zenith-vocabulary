import WordListPage from "./components/WordListPage";
import type { Word } from "./types/Word";

const words: Word[] = Array.from({ length: 10000 }, (_, i) => ({
  id: String(i),
  text: `word-${i}`,
  phonetic: "/test/",
  partOfSpeech: "noun",
  definition: `Definition ${i}`,
  example: `Example sentence ${i}`,
  deckId: "ielts",
  status: i % 2 === 0 ? "MASTERED" : "NOT_YET",
}));

function App() {
  return <WordListPage />;
}

export default App;
