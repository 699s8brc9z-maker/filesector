import Hero from "@/components/Hero";
import ConversionExamples from "@/components/ConversionExamples";
import HelpSection from "@/components/HelpSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Hero />
            <ConversionExamples />
            <HelpSection />
            <Footer />
        </div>
    );
}
