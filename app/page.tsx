import { getSupabase } from "@/lib/supabase";
import type { Founder } from "@/lib/types";
import Directory from "./components/Directory";

export const revalidate = 60;

async function getFounders(): Promise<Founder[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("founders")
      .select("*")
      .order("graduation_year", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true });

    if (error) {
      console.error("Failed to fetch founders:", error);
      return [];
    }

    return data as Founder[];
  } catch (e) {
    console.error("Supabase not configured:", e);
    return [];
  }
}

export default async function Home() {
  const founders = await getFounders();

  return <Directory founders={founders} />;
}
