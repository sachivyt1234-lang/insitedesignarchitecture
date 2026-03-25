import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import JournalSection from "./components/JournalSection";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";

const ScrollBuilding3D = lazy(() => import("./components/ScrollBuilding3D"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ProjectsSection />
          <JournalSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      {/* Fixed 3D building overlay */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none"
        style={{ width: 340, height: 520, zIndex: 10, opacity: 0.75 }}
      >
        <Suspense fallback={null}>
          <ScrollBuilding3D />
        </Suspense>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
