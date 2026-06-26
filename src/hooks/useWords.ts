import { useQuery } from "@tanstack/react-query";
import { getWords } from "../api/word-api";

export const WORDS_QUERY_KEY = ["words"];

export const useWords = () => {
  return useQuery({
    queryKey: WORDS_QUERY_KEY,
    queryFn: getWords,
    staleTime: 1000 * 60 * 5,
  });
};
