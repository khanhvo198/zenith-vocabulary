import axios from "axios";

export interface Word {
  id: string;
  text: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  deckId: string;
  status: "NOT_YET" | "MASTERED";
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getWords = async (): Promise<Word[]> => {
  const response = await api.get("/vocabulary");

  return response.data;
};

export type CreateWordRequest = {
  text: string;
};

export const createWord = async (payload: CreateWordRequest) => {
  const res = await axios.post("/vocabulary", payload);
  return res.data;
};
