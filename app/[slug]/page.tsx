import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import type { Founder } from "@/lib/types";
import { toSlug } from "@/lib/slugs";
import FounderDetail from "@/app/components/FounderDetail";

export const revalidate = 60;

async function getFounders(): Promise<Founder[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("founders")
      .select("*")
      .order("name", { ascending: true });
    if (error) return [];
    return data as Founder[];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const founders = await getFounders();
  return founders.map((f) => ({ slug: toSlug(f.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const founders = await getFounders();
  const founder = founders.find((f) => toSlug(f.name) === slug);
  if (!founder) return {};
  return {
    title: `${founder.name} — bos.network`,
    description: `${founder.name} is building ${founder.startup_name} at ${founder.college}.`,
  };
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const founders = await getFounders();
  const founder = founders.find((f) => toSlug(f.name) === slug);
  if (!founder) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <nav className="py-6 border-b border-border">
          <Link
            href="/"
            className="text-sm font-semibold text-foreground hover:text-secondary transition-colors"
          >
            bos.network
          </Link>
        </nav>
        <div className="py-10">
          <FounderDetail founder={founder} />
        </div>
      </div>
    </div>
  );
}
