import { PortfolioPage } from "@/components/portfolio-page";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";

export default async function Home() { return <PortfolioPage locale={await getLocale()} />; }
