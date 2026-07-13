import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { FeatureStrip } from "@/components/FeatureStrip/FeatureStrip";
import { Desk } from "@/components/Desk/Desk";
import { ThreeThings } from "@/components/ThreeThings/ThreeThings";
import { Perks } from "@/components/Perks/Perks";
import { UpcomingJams } from "@/components/UpcomingJams/UpcomingJams";
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
        <Desk />
        <ThreeThings />
        <Perks />
        <UpcomingJams />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
