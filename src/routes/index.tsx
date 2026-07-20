import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { FeatureStrip } from "@/components/FeatureStrip/FeatureStrip";
import { UpcomingJams } from "@/components/UpcomingJams/UpcomingJams";
import { Desk } from "@/components/Desk/Desk";
import { Perks } from "@/components/Perks/Perks";
import { Waitlist } from "@/components/Waitlist/Waitlist";
import { Footer } from "@/components/Footer/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureStrip />
        <UpcomingJams />
        <Desk />
        <Perks />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
