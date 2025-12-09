import { SupabaseClient } from "@supabase/supabase-js";
import { Tasks } from "@/types/type";

export const fetchTodo = async (
  supabase: SupabaseClient,
  userId: string
): Promise<Tasks[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("user_id", userId)
    .order("id", { ascending: false });

  if (error) throw error;

  return data || [];
};

export const createTodo = async (
  supabase: SupabaseClient,
  userId: string,
  status: string
): Promise<Tasks> => {
  const taskPayload = {
    name: "New Task",
    status: status,
    user_id: userId,
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert(taskPayload)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateToDoStatus = async (
  supabase: SupabaseClient,
  projectId: string,
  status: string
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status: status })
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateToDoName = async (
  supabase: SupabaseClient,
  projectId: string,
  name: string
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ name: name })
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTodo = async (
  supabase: SupabaseClient,
  projectId: string
) => {
  const { error } = await supabase.from("tasks").delete().eq("id", projectId);

  if (error) throw error;
  return projectId;
};
