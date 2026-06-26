export type Word = {
  id: string;
  text: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  deckId: string;
  status: "NOT_YET" | "MASTERED";
};
