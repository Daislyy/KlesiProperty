"use client";

import { useState, useEffect } from "react";
import { Property } from "@/types";
import { API_BASE, DEFAULT_PROPERTIES } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QualityStandards from "@/components/QualityStandards";
import PropertySection from "@/components/PropertySection";
import KprCalculator from "@/components/KprCalculator";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import PropertyModal from "@/components/PropertyModal";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);
  const [selectedSurveyId, setSelectedSurveyId] = useState<number>(DEFAULT_PROPERTIES[0]?.id || 1);
  const [modalProperty, setModalProperty] = useState<Property | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/properties`);
        if (res.ok) {
          const json = await res.json();
          if (json.data?.length) {
            setProperties(json.data);
            setSelectedSurveyId(json.data[0].id);
          }
        }
      } catch {
        /* Jika backend offline: gunakan data kurasi default */
      }
    }
    load();
  }, []);

  const handleSelectSurvey = (id: number) => {
    setSelectedSurveyId(id);
    const el = document.getElementById("survey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#f7faf8] text-[#0f1f1a]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Hero
          featuredProperty={properties[0]}
          onSelectDetail={setModalProperty}
          onSelectSurvey={handleSelectSurvey}
        />
        <QualityStandards />
        <PropertySection
          properties={properties}
          selectedSurveyId={selectedSurveyId}
          onSelectSurveyId={setSelectedSurveyId}
        />
        <KprCalculator initialPrice={properties[0]?.price || 850000000} />
        <FaqSection />
      </main>

      <Footer />

      {/* Modal Detail Properti Terpadu */}
      {modalProperty && (
        <PropertyModal
          property={modalProperty}
          onClose={() => setModalProperty(null)}
          onSelectSurvey={(id) => {
            handleSelectSurvey(id);
            setModalProperty(null);
          }}
        />
      )}
    </div>
  );
}
