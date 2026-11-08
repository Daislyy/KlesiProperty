"use client";

import { useState, useEffect } from "react";
import { Property } from "@/types";
import { API_BASE, DEFAULT_PROPERTIES } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import GalleryFeatures from "@/components/GalleryFeatures";
import DreamHomeSection from "@/components/DreamHomeSection";
import PropertySection from "@/components/PropertySection";
import TestimonialSection from "@/components/TestimonialSection";
import FaqSection from "@/components/FaqSection";
import SurveySection from "@/components/SurveySection";
import Footer from "@/components/Footer";
import PropertyModal from "@/components/PropertyModal";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);
  const [selectedSurveyId, setSelectedSurveyId] = useState<number>(DEFAULT_PROPERTIES[0]?.id || 1);
  const [modalProperty, setModalProperty] = useState<Property | null>(null);

  useEffect(() => {
    async function loadProperties() {
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
        // Otomatis menggunakan data default jika backend offline
      }
    }
    loadProperties();
  }, []);

  const handleSelectSurvey = (id?: number) => {
    if (id) {
      setSelectedSurveyId(id);
    }
    const element = document.getElementById("survey");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Ambil properti yang ditandai is_featured atau fallback ke properti pertama
  const featuredProperty = properties.find((p) => p.is_featured) || properties[0];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 antialiased selection:bg-neutral-950 selection:text-white">
      <Navbar />

      <main className="w-full">
        {/* 1. Hero Section (More Comfortable. More Classy.) dengan Properti Unggulan */}
        <Hero
          featuredProperty={featuredProperty}
          onSelectDetail={setModalProperty}
          onSelectSurvey={(id) => handleSelectSurvey(id || featuredProperty?.id)}
        />

        {/* 2. Intro Section with Real Verified Metrics */}
        <IntroSection />

        {/* 3. Showcase Gallery (3 Rounded Interior Cards) & 3 Key Features */}
        <GalleryFeatures />

        {/* 4. Find Your Dream Home Here (Asymmetric Editorial Grid) */}
        <DreamHomeSection />

        {/* 5. Real Interactive Property Catalog (Supports 3-photo slider) */}
        <PropertySection
          properties={properties}
          onSelectDetail={setModalProperty}
          onSelectSurvey={(id) => handleSelectSurvey(id)}
        />

        {/* 6. Real Client Testimonials */}
        <TestimonialSection />

        {/* 7. Frequently Asked Questions (Accordion) */}
        <FaqSection />

        {/* 8. Survey Booking & Advisor Card (Padly Padilah) */}
        <SurveySection
          properties={properties}
          selectedSurveyId={selectedSurveyId}
          onSelectSurveyId={setSelectedSurveyId}
        />
      </main>

      {/* 8. Minimalist Footer */}
      <Footer />

      {/* 9. High-Res Property Detail Modal */}
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
