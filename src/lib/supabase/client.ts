"use client";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export const SupabaseClient = () => {
  const { session } = useSession();
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      accessToken: async () => session?.getToken() ?? null,
    }
  );
  return supabaseClient;
};
