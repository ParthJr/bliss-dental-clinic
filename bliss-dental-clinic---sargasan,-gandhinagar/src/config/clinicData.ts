/**
 * Central business configuration for Bliss Dental Clinic
 * Sargasan, Gandhinagar, Gujarat
 *
 * All business details, timings, verified services, and contact channels are
 * maintained centrally here to ensure single-source truth across all components.
 */

export interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  tagType: 'foundational' | 'aesthetic' | 'contouring' | 'restorative' | 'prosthetics' | 'hygiene';
  description: string;
  ctaText: string;
  cardVariant: 'peach' | 'coral' | 'lavender' | 'ivory';
  colSpan?: string;
  iconName: 'notes' | 'whitening' | 'smile' | 'shield' | 'dentures' | 'hygiene';
  details?: {
    duration: string;
    comfortLevel: string;
    recoveryTime: string;
    clinicalFocus: string[];
  };
}

export interface DoctorProfile {
  name: string;
  role: string;
  qualification: string;
  experience: string;
  specialization: string;
  bio: string;
  philosophy: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface SmileCase {
  id: string;
  title: string;
  category: string;
  description: string;
  highlight: string;
  tag: string;
}

export interface ClinicConfig {
  name: string;
  tagline: string;
  descriptor: string;
  locationLabel: string;
  address: {
    line1: string;
    line2: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
    accessibilityNotes: string;
  };
  phone: {
    raw: string;
    display: string;
    international: string;
    telUri: string;
  };
  reputation: {
    rating: number;
    ratingScale: number;
    reviewCount: number;
    platform: string;
    badgeLabel: string;
    verifiedLabel: string;
  };
  hours: {
    weekdaySaturday: string;
    sunday: string;
    mondayOpen: string;
    badgeSchedule: string;
  };
  services: ServiceItem[];
  smilePriorities: Array<{
    id: string;
    title: string;
    description: string;
    icon: 'health' | 'cosmetic' | 'restorative';
  }>;
  principles: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  journeySteps: Array<{
    number: string;
    badge: string;
    title: string;
    description: string;
  }>;
  team: DoctorProfile[];
  faqs: FaqItem[];
  smileCases: SmileCase[];
  links: {
    googleMapsDirections: string;
    googleReviews: string;
  };
}

export const clinicData: ClinicConfig = {
  name: "Bliss Dental Clinic",
  tagline: "Clinic & Implant Centre",
  descriptor: "Implant & Family Dental Care Centre",
  locationLabel: "Sargasan, Gandhinagar",
  address: {
    line1: "Pramukh Horizon-2, Shop No. 115, First Floor",
    line2: "Sargasan Cross Roads",
    landmark: "Sargasan Cross Roads",
    area: "Sargasan",
    city: "Gandhinagar",
    state: "Gujarat",
    pincode: "382419",
    full: "Pramukh Horizon-2, Shop No. 115, First Floor, Sargasan Cross Roads, Sargasan, Gandhinagar, Gujarat 382419",
    accessibilityNotes: "Easy parking & accessible elevators on 1st Floor",
  },
  phone: {
    raw: "07990723416",
    display: "079907 23416",
    international: "+91 079907 23416",
    telUri: "tel:07990723416",
  },
  reputation: {
    rating: 4.9,
    ratingScale: 5.0,
    reviewCount: 166,
    platform: "Google",
    badgeLabel: "4.9 ★ · 166 Google reviews",
    verifiedLabel: "Verified Patient Rating",
  },
  hours: {
    weekdaySaturday: "Monday – Saturday: 10:00 AM – 8:00 PM",
    sunday: "Sunday: By Prior Appointment",
    mondayOpen: "10:00 AM",
    badgeSchedule: "Mon: 10:00 AM - 8:00 PM",
  },
  services: [
    {
      id: "checkups",
      title: "Dental Check-ups & Consultations",
      tag: "Foundational Care",
      tagType: "foundational",
      description: "Comprehensive preventive oral health evaluations, digital imaging, and soft tissue checks designed to understand health status before symptoms arise.",
      ctaText: "Book Preventive Consultation",
      cardVariant: "peach",
      colSpan: "lg:col-span-2",
      iconName: "notes",
      details: {
        duration: "30 – 45 mins",
        comfortLevel: "Completely Pain-Free",
        recoveryTime: "Immediate",
        clinicalFocus: [
          "Digital intra-oral examination",
          "Gum health & periodontal probing",
          "Early cavity & enamel wear detection",
          "Personalized oral hygiene coaching",
        ],
      },
    },
    {
      id: "whitening",
      title: "Teeth Whitening",
      tag: "Aesthetic",
      tagType: "aesthetic",
      description: "Safe aesthetic shade enhancement tailored to your sensitivity threshold and personal tooth tone.",
      ctaText: "Explore Shade Options",
      cardVariant: "coral",
      colSpan: "lg:col-span-1",
      iconName: "whitening",
      details: {
        duration: "45 – 60 mins",
        comfortLevel: "Gentle & Monitored",
        recoveryTime: "Same Day Brilliance",
        clinicalFocus: [
          "Shade guide matching & assessment",
          "Gingival barrier protection",
          "Advanced LED-accelerated whitening gel",
          "Post-whitening desensitizing varnish",
        ],
      },
    },
    {
      id: "cosmetic",
      title: "Cosmetic Dentistry & Bonding",
      tag: "Contouring",
      tagType: "contouring",
      description: "Gentle cosmetic contouring, composite tooth bonding, and discrete gap closure crafted for seamless symmetry.",
      ctaText: "Discuss Cosmetic Goals",
      cardVariant: "lavender",
      colSpan: "lg:col-span-1",
      iconName: "smile",
      details: {
        duration: "45 – 90 mins",
        comfortLevel: "Minimally Invasive",
        recoveryTime: "Immediate Return",
        clinicalFocus: [
          "Micro-composite layering for chips",
          "Diastema (gap) closure",
          "Enamel contouring for harmony",
          "Natural light reflection matching",
        ],
      },
    },
    {
      id: "implants",
      title: "Dental Implants",
      tag: "Restorative",
      tagType: "restorative",
      description: "Durable restorative tooth replacements precision-engineered to mirror natural root structure and jaw alignment.",
      ctaText: "View Implant Options",
      cardVariant: "ivory",
      colSpan: "lg:col-span-1",
      iconName: "shield",
      details: {
        duration: "Surgical Session + Follow-ups",
        comfortLevel: "Local Anesthesia / Comfort Sedation",
        recoveryTime: "Gradual Osseointegration",
        clinicalFocus: [
          "Titanium / Zirconia biocompatible fixtures",
          "Natural bite force distribution",
          "Preserving adjacent natural teeth",
          "Long-term stability and bone preservation",
        ],
      },
    },
    {
      id: "dentures",
      title: "Dentures & Restorations",
      tag: "Prosthetics",
      tagType: "prosthetics",
      description: "Custom-molded full and partial dentures calibrated for chewing stability, gum comfort, and speech clarity.",
      ctaText: "Restorative Consultation",
      cardVariant: "peach",
      colSpan: "lg:col-span-1",
      iconName: "dentures",
      details: {
        duration: "Multi-stage impressions",
        comfortLevel: "Custom Contour Fit",
        recoveryTime: "Brief Adjustment Period",
        clinicalFocus: [
          "Full and removable partial dentures",
          "Precision bite alignment",
          "Aesthetic gum contour simulation",
          "Comfort adjustments and relining",
        ],
      },
    },
    {
      id: "hygiene",
      title: "Preventive Oral Hygiene",
      tag: "Routine Wellness",
      tagType: "hygiene",
      description: "Ultrasonic scaling, deep plaque removal, and actionable personalized brushing coaching for gum resilience.",
      ctaText: "Schedule Cleaning",
      cardVariant: "lavender",
      colSpan: "lg:col-span-1",
      iconName: "hygiene",
      details: {
        duration: "30 – 45 mins",
        comfortLevel: "Gentle Ultrasonic Scaling",
        recoveryTime: "Immediate Freshness",
        clinicalFocus: [
          "Plaque and calculus removal",
          "Stain polishing",
          "Gum pocket disinfection",
          "Interdental brushing guidance",
        ],
      },
    },
  ],
  smilePriorities: [
    {
      id: "priority-health",
      title: "Everyday Oral Health",
      description: "Routine check-ups, early cavity identification, and proactive gum therapy to keep teeth robust and pain-free.",
      icon: "health",
    },
    {
      id: "priority-cosmetic",
      title: "Cosmetic Discussions",
      description: "Low-pressure conversations about shade corrections, alignment options, and bonding techniques.",
      icon: "cosmetic",
    },
    {
      id: "priority-restorative",
      title: "Restorative Options",
      description: "Reconstructing bite functionality and replacing missing teeth with durable, natural-feeling restorations.",
      icon: "restorative",
    },
  ],
  principles: [
    {
      step: "01",
      title: "Listen",
      description: "Understand your personal dental concerns, past comfort levels, and aesthetic priorities before any exam.",
    },
    {
      step: "02",
      title: "Explain",
      description: "Discuss the available clinical options clearly, outlining what procedures involve without jargon.",
    },
    {
      step: "03",
      title: "Plan",
      description: "Review appropriate next steps collaboratively, pacing treatment to match your timing and comfort.",
    },
  ],
  journeySteps: [
    {
      number: "01",
      badge: "Initiate Contact",
      title: "Reach Out",
      description: "Request a consultation online or via phone and share a day and time that best matches your routine.",
    },
    {
      number: "02",
      badge: "Consultation",
      title: "Have a Conversation",
      description: "Discuss your questions, undergo a thorough examination, and review options in an unhurried consultation.",
    },
    {
      number: "03",
      badge: "Collaborative Plan",
      title: "Plan Your Next Step",
      description: "Review customized clinical recommendations and decide on a schedule that feels entirely comfortable for you.",
    },
  ],
  team: [
    {
      name: "Dr. Bliss Specialist & Clinical Team",
      role: "Principal Dental Surgeon & Implantologist",
      qualification: "B.D.S., F.I.C.I. (Implantology)",
      experience: "12+ Years of Clinical Excellence",
      specialization: "Dental Implants, Smile Designing & Pain-Free Restorations",
      bio: "Dedicated to providing advanced, empathetic dental care in Sargasan, Gandhinagar. Passionate about transforming dental anxiety into calm, comfortable, and confident visits.",
      philosophy: "Every smile tells a unique story. Our goal is to listen deeply, explain clearly, and deliver lasting oral health with uncompromising gentleness.",
    },
  ],
  faqs: [
    {
      category: "Visits & Appointments",
      question: "Do I need an appointment before visiting Bliss Dental Clinic?",
      answer: "Yes, scheduling an appointment ensures you receive dedicated, unhurried time with our clinical team without waiting. Walk-ins are accommodated based on daily availability.",
    },
    {
      category: "Treatments",
      question: "Are dental implant procedures painful?",
      answer: "Dental implant placement is performed under precise local anesthesia to ensure you remain completely comfortable. Most patients report feeling only minimal pressure, and post-procedure recovery is typically smooth with prescribed care.",
    },
    {
      category: "Cosmetic",
      question: "How long does professional teeth whitening take?",
      answer: "In-office teeth whitening sessions at Bliss Dental Clinic usually take around 45 to 60 minutes, delivering immediate, brilliant shade improvements tailored to your natural tooth tone and sensitivity threshold.",
    },
    {
      category: "Visits & Appointments",
      question: "What are your operating hours in Sargasan, Gandhinagar?",
      answer: "We are open Monday through Saturday from 10:00 AM to 8:00 PM. Sunday appointments are available exclusively by prior booking.",
    },
    {
      category: "Payments & Care",
      question: "Do you offer transparent treatment estimates?",
      answer: "Absolutely. Before starting any procedure, we explain your clinical options, step-by-step procedures, and transparent estimates so you can make confident, informed decisions.",
    },
  ],
  smileCases: [
    {
      id: "case-1",
      title: "Natural Smile Reconstruction",
      category: "Dental Implants & Crowns",
      description: "Restored missing posterior molars with precision titanium implants and custom porcelain crowns, bringing back full chewing stability and radiant aesthetics.",
      highlight: "Full chewing function restored with seamless natural shade matching.",
      tag: "Restorative",
    },
    {
      id: "case-2",
      title: "Aesthetic Shade Enhancement",
      category: "Professional Whitening & Bonding",
      description: "Gentle in-office shade brightening combined with conservative composite edge bonding to correct minor chipping and uneven wear.",
      highlight: "4 shades brighter with zero sensitivity.",
      tag: "Aesthetic",
    },
    {
      id: "case-3",
      title: "Periodontal Health & Scaling",
      category: "Preventive Oral Hygiene",
      description: "Advanced ultrasonic plaque removal and deep cleaning protocol to eliminate subgingival calculus and restore firm, healthy gum contours.",
      highlight: "Eliminated gum bleeding and achieved 100% tissue health.",
      tag: "Wellness",
    },
  ],
  links: {
    googleMapsDirections: "https://www.google.com/maps/search/?api=1&query=Bliss+Dental+Clinic+Pramukh+Horizon-2+Shop+No+115+First+Floor+Sargasan+Gandhinagar+Gujarat+382419",
    googleReviews: "https://www.google.com/maps/search/?api=1&query=Bliss+Dental+Clinic+Sargasan+Gandhinagar",
  },
};
