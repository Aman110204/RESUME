import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { SiteContent } from "./types";
import { seedContent } from "./content";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

const SITE_ROW_ID = 1;

export async function fetchSiteContent(): Promise<SiteContent> {
  if (!supabase) return seedContent;

  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", SITE_ROW_ID)
    .maybeSingle();

  if (error || !data) return seedContent;
  return { ...seedContent, ...(data.data as SiteContent) };
}

export async function saveSiteContent(content: SiteContent) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("site_content")
    .upsert({ id: SITE_ROW_ID, data: content, updated_at: new Date().toISOString() });

  if (error) throw error;

  await supabase.from("site_revisions").insert({ site_id: SITE_ROW_ID, data: content });
}
