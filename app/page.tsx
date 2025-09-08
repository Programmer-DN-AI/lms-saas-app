import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {recentSessions} from "@/constants";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const Page = async () => {
    const { userId } = await auth();
    // If signed out, skip DB and show seeded content immediately
    const companions = userId ? await getAllCompanions({ limit: 3 }) : [];
    const recentSessionsCompanions = userId ? await getRecentSessions(10) : recentSessions.map((s) => ({ ...s, bookmarked: false }));

  // Always show a populated list for Popular Companions (visible when signed out too)
  const popular = recentSessions.map((s) => ({ ...s, bookmarked: false }));

  return (
    <main>
      <h1>Popular Companions</h1>

        <section className="home-section">
            {popular.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                />
            ))}

        </section>

        <section className="home-section">
            <CompanionsList
                title="Recently completed sessions"
                companions={recentSessionsCompanions}
                classNames="w-2/3 max-lg:w-full"
            />
            <CTA />
        </section>
    </main>
  )
}

export default Page