import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addWord, deleteWord, fetchWords } from './api';
import { useState } from 'react';

export const useWords = () => {
  // Store deleting word id
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Words query
  const { data, isLoading, error, isFetching, status, dataUpdatedAt } =
    useQuery({
      queryKey: ['words'],
      queryFn: fetchWords
    });

  const queryClient = useQueryClient();

  // Add word mutation
  const addWordMutation = useMutation({
    mutationFn: addWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
    }
  });

  // Delete word mutation
  const deleteWordMutation = useMutation({
    mutationFn: deleteWord,
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
      setDeletingId(null);
    }
  });

  const isDeletingWord = (id: string) => deletingId === id;

  return {
    words: data || [],
    isLoading,
    error,
    isFetching,
    status,
    dataUpdatedAt,
    addWordMutation,
    deleteWordMutation,
    isDeletingWord
  };
};
