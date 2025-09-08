import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
            async accessToken() {
                const { getToken } = await auth();
                // Use the Clerk JWT template named "supabase" so RLS works as in the reference repo
                return await getToken({ template: "supabase" });
            }
        }
    )
}