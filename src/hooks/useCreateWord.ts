import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWord } from "../api/word-api.ts";

export function useCreateWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words"],
      });
    },
  });
}
