import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ActiveMembers from "../components/ActiveMembers";
import TrainingCards from "../components/TrainingCards";
import ContactSection from "../components/ContactSection";
import AdminAccessButton from "../components/AdminAccessButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans">
      <Navbar />
      <main className="px-6 py-10 md: max-w-8xl mx-auto space-y-10">
        <section className="rounded-2xl shadow-xl border border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 md:p-10">
          <AboutSection />
        </section>

        <section className="rounded-2xl shadow-xl border border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 md:p-10">
          <TrainingCards />
        </section>
        <section className="rounded-2xl shadow-xl border border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 md:p-10">
          <ActiveMembers />
        </section>

        <section className="rounded-2xl shadow-xl border border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 md:p-10">
          <ContactSection />
          <AdminAccessButton />
        </section>
      </main>
    </div>
  );
}
