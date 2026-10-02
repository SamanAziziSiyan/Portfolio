import snapshot from "../../packages/content/portfolio.json";

export type Evidence = { label: string; url: string; type: string };
export type Project = {
  slug: string; name: string; kind: string; year: string; category: string;
  evidence_type: string; visibility: string; summary: string; problem: string;
  contribution: string; architecture: string; engineering_details: string;
  repository_url: string | null; secondary_url?: string | null;
  live_url: string | null; image_url: string | null; image_alt: string | null;
  featured: boolean;
  technologies: string[]; evidence: Evidence[];
};
export type Experience = {
  company: string; role: string; period: string; start_date: string;
  end_date: string | null; location: string; employment_type: string;
  workplace_type: string; summary: string; highlights: string[];
  technologies: string[]; evidence_type: string; link: string | null;
};
export type Product = {
  slug: string; name: string; label: string; summary: string; url: string;
  relationship: string; evidence_type: string;
};

const local = snapshot as { projects: Project[]; experiences: Experience[]; products: Product[] };

async function fromApi<T>(path: string, fallback: T): Promise<T> {
  const base = process.env.PORTFOLIO_API_URL;
  if (!base) return fallback;
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/api/v1/${path}`, {
      signal: AbortSignal.timeout(2500),
      cache: "no-store",
    });
    if (!response.ok) return fallback;
    const body = (await response.json()) as { data?: T };
    if (Array.isArray(fallback) && (!Array.isArray(body.data) || body.data.length === 0)) return fallback;
    return body.data ?? fallback;
  } catch {
    return fallback;
  }
}

export function getProjects(): Promise<Project[]> {
  return fromApi("projects", local.projects);
}

export function getProject(slug: string): Promise<Project | undefined> {
  const fallback = local.projects.find((project) => project.slug === slug);
  return fromApi(`projects/${encodeURIComponent(slug)}`, fallback);
}

export function getExperiences(): Promise<Experience[]> {
  return fromApi("experiences", local.experiences);
}

export function getProducts(): Promise<Product[]> {
  return fromApi("products", local.products);
}

export const projectSlugs = local.projects.map((project) => project.slug);
export const snapshotProjects = local.projects;
