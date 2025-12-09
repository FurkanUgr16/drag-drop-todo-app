"use client";

import { useState } from "react";
import {
  fetchTodo,
  createTodo,
  deleteTodo,
  updateToDoStatus,
  updateToDoName,
} from "@/lib/utils/todos";
import { useUser } from "@clerk/nextjs";
import { SupabaseClient } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tasks } from "@/types/type";

const UseToDos = () => {
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const supabase = SupabaseClient();
  const { user } = useUser();
  const queryKey = ["tasks", user?.id];

  const { data: rawTodos = [], isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchTodo(supabase, user!.id),
    enabled: !!user,
  });

  const todos: Tasks[] = rawTodos.map((todo) => ({
    ...todo,
    isEditing: isEditing[todo.id] || false,
  }));

  const addMutation = useMutation({
    mutationFn: (status: string) => createTodo(supabase, user!.id, status),
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
  // updateStatus
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
      throw new Error("Statü güncelleme hatası", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  //update name
  const updateNameMutation = useMutation({
    mutationFn: ({ projectId, name }: { projectId: string; name: string }) =>
      updateToDoName(supabase, projectId, name),
    onMutate: async ({ projectId, name }) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const oldTodos = queryClient.getQueryData<Tasks[]>(queryKey);
      queryClient.setQueryData(queryKey, (oldTasks: Tasks[] = []) =>
        oldTasks.map((task) =>
          task.id === projectId ? { ...task, name } : task
        )
      );
      return { oldTodos };
    },
    onError: (error, id, context) => {
      if (context?.oldTodos) {
        queryClient.setQueryData(queryKey, context.oldTodos);
      }
      throw new Error("İsim değiştirme hatası", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  //delete
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

  const toggleEditMode = (id: string, value: boolean) => {
    setIsEditing((prev) => ({ ...prev, [id]: value }));
  };

  return {
    todos,
    loading: isLoading,
    updateToDoStatus: (projectId: string, status: string) =>
      updateMutation.mutate({ projectId, status }),
    updateToDoName: (projectId: string, name: string) =>
      updateNameMutation.mutate({ projectId, name }),
    addTodo: async (status: string) => await addMutation.mutateAsync(status),
    deleteTodo: async (id: string) => await deleteMutation.mutateAsync(id),
    toggleEditMode,
  };
};

export default UseToDos;
