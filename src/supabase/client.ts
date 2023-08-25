import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? "",
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  {
    realtime: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logger: (msg: any, payload: any) => {
        console.log("REALTIME:", msg, payload);
      },
    },
    auth: {
      persistSession: false,
    },
  }
);
