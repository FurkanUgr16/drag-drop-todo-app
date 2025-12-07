import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const ServerClient = () => {
  const supabaseServerClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      accessToken: async () => (await auth()).getToken(),
    }
  );
  return supabaseServerClient;
};
