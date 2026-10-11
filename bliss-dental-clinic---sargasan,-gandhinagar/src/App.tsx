/**
 * Bliss Dental Clinic - Sargasan, Gandhinagar, Gujarat
 * Complete, responsive, production-ready healthcare website matching Google Stitch design
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BlissApproachSection } from './components/BlissApproachSection';
import { TreatmentGrid } from './components/TreatmentGrid';
import { SmilePrioritiesSection } from './components/SmilePrioritiesSection';
import { SmileGallerySection } from './components/SmileGallerySection';
import { DoctorProfileSection } from './components/DoctorProfileSection';
import { PatientJourney } from './components/PatientJourney';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { AppointmentForm } from './components/AppointmentForm';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { TreatmentModal } from './components/TreatmentModal';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [modalServiceId, setModalServiceId] = useState<string | null>(null);

  const scrollToConsultation = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrioritySelect = (priorityId: string) => {
    let serviceMapping = 'checkup';
    if (priorityId === 'priority-cosmetic') serviceMapping = 'whitening';
    if (priorityId === 'priority-restorative') serviceMapping = 'implants';
    scrollToConsultation(serviceMapping);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fef8f1] text-[#1d1b17] overflow-x-hidden selection:bg-[#FF705E] selection:text-white">
      {/* 1. Header and Navigation */}
      <Header onOpenConsultation={() => scrollToConsultation()} />

      {/* Main Content Sections in Required Sequential Order */}
      <main className="flex-1 w-full pt-20">
        {/* 2. Animated Hero */}
        <HeroSection onOpenConsultation={() => scrollToConsultation()} />

        {/* 3. Bliss Approach Section */}
        <BlissApproachSection />

        {/* 4. Treatment Grid (opens detailed modal on click) */}
        <TreatmentGrid
          onSelectService={(id) => setModalServiceId(id)}
        />

        {/* 5. Smile Priorities Section */}
        <SmilePrioritiesSection onSelectPriority={handlePrioritySelect} />

        {/* 6. Smile Gallery & Case Highlights */}
        <SmileGallerySection onOpenConsultation={() => scrollToConsultation()} />

        {/* 7. Meet Our Clinical Team & Philosophy */}
        <DoctorProfileSection onOpenConsultation={() => scrollToConsultation()} />

        {/* 8. Patient Journey */}
        <PatientJourney />

        {/* 9. Google Reviews */}
        <ReviewsSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

        {/* 11. Appointment Form */}
        <AppointmentForm initialServiceId={selectedServiceId} />

        {/* 12. Location and Contact */}
        <LocationSection />
      </main>

      {/* 13. Footer */}
      <Footer onOpenConsultation={() => scrollToConsultation()} />

      {/* Treatment Detail Modal */}
      <TreatmentModal
        serviceId={modalServiceId}
        onClose={() => setModalServiceId(null)}
        onBookConsultation={(id) => scrollToConsultation(id)}
      />
    </div>
  );
}
