"use client";

import {
  fetchTodo,
  createTodo,
  deleteTodo,
  updateToDoStatus,
} from "@/lib/utils/todos";
import { useUser } from "@clerk/nextjs";
import { SupabaseClient } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tasks } from "@/types/type";

const UseToDos = () => {
  const queryClient = useQueryClient();
  const supabase = SupabaseClient();
  const { user } = useUser();
  const queryKey = ["tasks", user?.id];

  const { data: todos, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTodo(supabase, user!.id),
    enabled: !!user,
  });

  const addMutation = useMutation({
    mutationFn: () => createTodo(supabase, user!.id),
    onSuccess: (newTodo) => {
      queryClient.setQueryData(queryKey, (oldTask: Tasks[] = []) => [
        newTodo,
        ...oldTask,
      ]);
    },
    onError: (error) => {
      throw new Error("Yükleme hatası", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      projectId,
      status,
    }: {
      projectId: string;
      status: string;
    }) => updateToDoStatus(supabase, projectId, status),
    onMutate: async ({ projectId, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const oldTodos = queryClient.getQueryData<Tasks[]>(queryKey);
      queryClient.setQueryData(queryKey, (oldTask: Tasks[] = []) =>
        oldTask.map((task) =>
          task.id === projectId ? { ...task, status } : task
        )
      );
      return { oldTodos };
    },
    onError: (error, id, context) => {
      if (context?.oldTodos) {
        queryClient.setQueryData(queryKey, context.oldTodos);
      }
      throw new Error("Güncelleme hatası", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => deleteTodo(supabase, projectId),
    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const oldTodos = queryClient.getQueryData<Tasks[]>(queryKey);

      queryClient.setQueryData(queryKey, (oldTask: Tasks[] = []) =>
        oldTask.filter((task) => task.id !== projectId)
      );
      return { oldTodos };
    },
    onError: (error, id, context) => {
      if (context?.oldTodos) {
        queryClient.setQueryData(queryKey, context.oldTodos);
      }
      throw new Error("Silme hatası", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  return {
    todos,
    loading: isLoading,
    updateTodo: (projectId: string, status: string) =>
      updateMutation.mutate({ projectId, status }),
    addTodo: async () => await addMutation.mutateAsync(),
    deletetTodo: async (id: string) => await deleteMutation.mutateAsync(id),
  };
};

export default UseToDos;
