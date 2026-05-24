// Content data — single source of truth for static-ish marketing copy.
// Anything user/admin-editable lives in Firestore; this file holds the
// structural defaults so the site never shows lorem ipsum.

import { ASSETS } from "./storage";
import { WA_MESSAGES } from "./utils";

export const PARTNERS: { name: string; domain?: string; logo?: string }[] = [
  { name: "Dell Technologies", domain: "dell.com", logo: ASSETS.logoDell },
  { name: "Indian Oil", domain: "iocl.com", logo: ASSETS.logoIndianOil },
  { name: "Hindustan Petroleum", domain: "hindustanpetroleum.com", logo: ASSETS.logoHPCL },
  { name: "ONGC", domain: "ongcindia.com", logo: ASSETS.logoONGC },
  { name: "Bharat Petroleum", domain: "bharatpetroleum.com", logo: ASSETS.logoBPCL }
];

export const MEDIA_OUTLETS: { name: string; domain?: string; logo?: string }[] = [
  { name: "India TV", domain: "indiatvnews.com", logo: ASSETS.logoIndiaTV },
  { name: "Zee News", domain: "zeenews.india.com", logo: ASSETS.logoZee },
  { name: "News24", domain: "news24online.com", logo: ASSETS.logoNews24 },
  { name: "N Darshan", logo: ASSETS.logoNDarshan }
];

export const RECOGNITIONS: { name: string; domain?: string }[] = [
  { name: "Ministry of AYUSH", domain: "ayush.gov.in" },
  { name: "Yoga Alliance USA", domain: "yogaalliance.org" }
];

// Legacy plain string list — kept for any code still consuming it
export const MARQUEE_ITEMS = [
  ...PARTNERS.map((p) => p.name),
  ...MEDIA_OUTLETS.map((m) => m.name),
  ...RECOGNITIONS.map((r) => r.name)
];

export const STATS = [
  { value: 22, suffix: "+", labelKey: "stats.years" },
  { value: 1, prefix: "", suffix: "", display: "PhD", labelKey: "stats.phd" },
  { value: 100, suffix: "+", labelKey: "stats.workshops" },
  { value: 100, suffix: "+", labelKey: "stats.media" },
  { value: 5000, suffix: "+", labelKey: "stats.lives" }
] as const;

export const EXPERTISE = [
  {
    title: "Pain & Mobility",
    items: [
      "Back & Spine",
      "Joint Rehabilitation",
      "Posture Correction",
      "Sports Injury",
      "Chronic Pain"
    ]
  },
  {
    title: "Lifestyle & Hormonal",
    items: [
      "PCOD/PCOS",
      "Fertility Wellness (SFY)",
      "Thyroid",
      "Stress & Anxiety",
      "Weight"
    ]
  },
  {
    title: "Corporate Wellness",
    items: [
      "On-site Sessions",
      "Stress Programs",
      "Executive Wellness",
      "Ergonomics"
    ]
  },
  {
    title: "Holistic Wellness",
    items: [
      "Meditation & Breathwork",
      "Naturopathy",
      "Diet & Lifestyle",
      "Sleep",
      "Immunity"
    ]
  },
  {
    title: "Therapeutic Practice",
    items: [
      "Evidence-informed protocols",
      "Clinical methodology",
      "Breath-body integration"
    ]
  }
];

export const ASANAS: { name: string; benefit: string; image?: string }[] = [
  { name: "Raja Kapotasana", benefit: "Improves flexibility, opens hips, stretches spine", image: "/images/WhatsApp Image 2026-05-12 at 2.48.20 PM (2).jpeg" },
  { name: "Baddha Konasana", benefit: "Opens hips, improves posture, relaxes mind", image: "/images/WhatsApp Image 2026-05-12 at 2.48.22 PM (1).jpeg" },
  { name: "Halasana", benefit: "Improves spinal flexibility, aids digestion, calms nerves", image: "/images/WhatsApp Image 2026-05-12 at 2.48.20 PM.jpeg" },
  { name: "Janu Sirsasana", benefit: "Stretches hamstrings, improves digestion, relaxes body", image: "/images/WhatsApp Image 2026-05-12 at 2.48.19 PM (1).jpeg" },
  { name: "Garudasana", benefit: "Improves balance, strengthens legs, boosts focus", image: "/images/WhatsApp Image 2026-05-12 at 2.48.19 PM.jpeg" },
  { name: "Parivrtta Janu Sirsasana", benefit: "Improves side flexibility, stretches spine, aids breathing", image: "/images/WhatsApp Image 2026-05-12 at 2.48.18 PM (2).jpeg" },
  { name: "Trikonasana", benefit: "Strengthens legs, improves balance, stretches waist", image: "/images/WhatsApp Image 2026-05-12 at 2.48.18 PM (1).jpeg" },
  { name: "Upavistha Konasana", benefit: "Opens hips, stretches inner thighs, improves flexibility", image: "/images/WhatsApp Image 2026-05-12 at 2.48.18 PM.jpeg" },
  { name: "Navasana", benefit: "Strengthens core, improves balance, tones abdomen", image: "/images/WhatsApp Image 2026-05-12 at 2.48.17 PM (1).jpeg" },
  { name: "Chakrasana", benefit: "Strengthens spine, improves flexibility, boosts energy", image: "/images/WhatsApp Image 2026-05-12 at 2.48.17 PM.jpeg" },
  { name: "Natarajasana", benefit: "Improves balance, stretches chest, strengthens legs", image: "/images/WhatsApp Image 2026-05-12 at 2.48.15 PM.jpeg" },
  { name: "Mermaid Pose", benefit: "Opens shoulders, improves spinal flexibility, stretches hips", image: "/images/WhatsApp Image 2026-05-12 at 2.48.11 PM.jpeg" },
  { name: "Ustrasana", benefit: "Opens chest, improves posture, stretches spine", image: "/images/WhatsApp Image 2026-05-12 at 2.48.09 PM.jpeg" },
  { name: "Anjaneyasana", benefit: "Strengthens legs, stretches hips, improves balance", image: "/images/WhatsApp Image 2026-05-12 at 2.48.07 PM (1).jpeg" },
  { name: "Adho Mukha Svanasana", benefit: "Stretches full body, strengthens arms, improves circulation", image: "/images/WhatsApp Image 2026-05-12 at 2.48.05 PM (2).jpeg" }
];

export type ServiceKey = "corporate" | "group" | "personal" | "fertility" | "therapeutic";

export const SERVICES: {
  key: ServiceKey;
  title: string;
  tagline: string;
  who: string;
  problems: string[];
  includes: string[];
  format: string;
  price: string;
  image: string;
  whatsapp: string;
}[] = [
  {
    key: "corporate",
    title: "Corporate Yoga",
    tagline: "On-site & online wellness for high-performance teams",
    who: "Companies and teams seeking measurable wellness outcomes for their people.",
    problems: [
      "Desk-job back, neck, and shoulder strain",
      "Workplace stress and burnout",
      "Sedentary lifestyle and low energy",
      "Posture and ergonomics"
    ],
    includes: [
      "On-site or virtual sessions",
      "Customized program design",
      "Pre/post wellness assessment",
      "Reporting for HR teams"
    ],
    format: "On-site / Online · Group",
    price: "₹197 Online · ₹497 Offline",
    image: ASSETS.cardCorporate,
    whatsapp: WA_MESSAGES.corporate
  },
  {
    key: "group",
    title: "Group Yoga Classes",
    tagline: "Small-batch live classes guided personally",
    who: "Anyone seeking structure, community, and accountable practice.",
    problems: [
      "Maintaining a consistent practice",
      "Loneliness in solo practice",
      "General fitness and flexibility",
      "Stress management"
    ],
    includes: [
      "Live small-batch classes",
      "Beginner to intermediate tracks",
      "Recordings for review",
      "Doubt-clearing"
    ],
    format: "Online · Group",
    price: "₹197 Online · ₹497 Offline",
    image: ASSETS.cardGroup,
    whatsapp: WA_MESSAGES.group
  },
  {
    key: "personal",
    title: "Personal Yoga",
    tagline: "1:1 yoga designed around your body",
    who: "Individuals with specific concerns, goals, or limitations.",
    problems: [
      "Specific pain or limitation",
      "Lifestyle disorders",
      "Hormonal balance",
      "Personalized progress"
    ],
    includes: [
      "1:1 sessions with Dr. Sampoorna or trained team",
      "Detailed assessment",
      "Personal yoga plan",
      "Progress tracking"
    ],
    format: "Online / Offline · 1:1",
    price: "₹197 Online · ₹497 Offline",
    image: ASSETS.cardPersonal,
    whatsapp: WA_MESSAGES.personal
  },
  {
    key: "fertility",
    title: "Sampoorna Fertility Yoga (SFY)",
    tagline: "A research-informed protocol designed by Dr. Sampoorna",
    who: "Couples and individuals seeking holistic support alongside their medical journey.",
    problems: [
      "Stress affecting hormonal balance",
      "Lifestyle and posture support",
      "Pelvic mobility and breath integration",
      "Mind-body practice during the journey"
    ],
    includes: [
      "SFY protocol assessment",
      "Personalized practice",
      "Breath, posture and meditation modules",
      "Lifestyle guidance"
    ],
    format: "Online / Offline · 1:1",
    price: "₹197 Online · ₹497 Offline",
    image: ASSETS.cardFertility,
    whatsapp: WA_MESSAGES.fertility
  },
  {
    key: "therapeutic",
    title: "Therapeutic Yoga",
    tagline: "Evidence-informed yoga for specific body concerns",
    who: "Anyone seeking yoga support for a specific body challenge.",
    problems: [
      "Back, neck, knee, shoulder pain",
      "Sleep, digestion, fatigue",
      "Stress, anxiety, posture",
      "Recovery and rehabilitation support"
    ],
    includes: [
      "Detailed condition assessment",
      "Tailored therapeutic sequence",
      "Progressive, phased plan",
      "Practice with Dr. Sampoorna's framework"
    ],
    format: "Online / Offline · 1:1",
    price: "₹197 Online · ₹497 Offline",
    image: ASSETS.cardTherapeutic,
    whatsapp: WA_MESSAGES.therapeutic
  }
];

export const HOW_STEPS = [
  {
    n: "01",
    title: "Consultation",
    body: "An unhurried conversation about your body, history, lifestyle and what you're seeking. No assumptions.",
    image: ASSETS.step1
  },
  {
    n: "02",
    title: "Assessment",
    body: "Posture, breath, mobility and lifestyle assessment to understand the whole person, not just symptoms.",
    image: ASSETS.step2
  },
  {
    n: "03",
    title: "Customized Plan",
    body: "A personal practice protocol — postures, breath, meditation and lifestyle — built for you.",
    image: ASSETS.step3
  },
  {
    n: "04",
    title: "Guided Sessions",
    body: "Live sessions, refined week to week as your body responds. Online or in-person.",
    image: ASSETS.step4
  },
  {
    n: "05",
    title: "Progress Tracking",
    body: "Honest check-ins, measurable markers and gentle progressions. The plan evolves with you.",
    image: ASSETS.step5
  }
];

export const BODY_PROBLEMS = [
  { title: "Back Pain", image: ASSETS.bodyBack, blurb: "Spinal mobility & decompression" },
  { title: "Neck Pain", image: ASSETS.bodyNeck, blurb: "Cervical release work" },
  { title: "Knee Pain", image: ASSETS.bodyKnee, blurb: "Joint stabilisation" },
  { title: "Shoulder Stiffness", image: ASSETS.bodyShoulder, blurb: "Shoulder mobility" },
  { title: "Joint Discomfort", image: ASSETS.bodyJoint, blurb: "Whole-joint support" },
  { title: "Sciatica-style", image: ASSETS.bodySciatica, blurb: "Pelvic & spinal alignment" },
  { title: "Stress", image: ASSETS.bodyStress, blurb: "Nervous system reset" },
  { title: "Sleep Issues", image: ASSETS.bodySleep, blurb: "Pranayama for rest" },
  { title: "Fatigue", image: ASSETS.bodyFatigue, blurb: "Energy restoration" },
  { title: "Weight Management", image: ASSETS.bodyWeight, blurb: "Metabolic support" },
  { title: "Digestion", image: ASSETS.bodyDigestion, blurb: "Abdominal flow" },
  { title: "Posture Correction", image: ASSETS.bodyPosture, blurb: "Postural rewiring" }
];

export const NEWS_VIDEOS = [
  { id: "n1", channel: "India TV", title: "Featured on India TV Wellness", src: ASSETS.newsIndiaTV, poster: ASSETS.thumbNewsIndiaTV },
  { id: "n2", channel: "Zee News", title: "Featured on Zee News", src: ASSETS.newsZee, poster: ASSETS.thumbNewsZee },
  { id: "n3", channel: "N Darshan", title: "Featured on N Darshan", src: ASSETS.newsDarshan, poster: ASSETS.thumbNewsDarshan },
  { id: "n4", channel: "News24", title: "Featured on News24", src: ASSETS.news24, poster: ASSETS.thumbNews24 }
];

export const WELLNESS_SERIES = [
  { id: "w1", title: "Natural Yoga for Low Blood Pressure", topic: "Cardiovascular", src: ASSETS.wellness1, poster: ASSETS.thumbWellness1 },
  { id: "w2", title: "Yoga for High BP & Stress Management", topic: "Cardiovascular", src: ASSETS.wellness2, poster: ASSETS.thumbWellness2 },
  { id: "w3", title: "Eye Relaxation & Vision Wellness", topic: "Vision", src: ASSETS.wellness3, poster: ASSETS.thumbWellness3 },
  { id: "w4", title: "Natural Face Glow Yoga Routine", topic: "Beauty", src: ASSETS.wellness4, poster: ASSETS.thumbWellness4 },
  { id: "w5", title: "Yoga for Cervical Pain Relief", topic: "Pain Relief", src: ASSETS.wellness5, poster: ASSETS.thumbWellness5 },
  { id: "w6", title: "Frozen Shoulder Relief Exercises", topic: "Pain Relief", src: ASSETS.wellness6, poster: ASSETS.thumbWellness6 },
  { id: "w7", title: "Yoga for Better Sleep", topic: "Sleep", src: ASSETS.wellness7, poster: ASSETS.thumbWellness7 }
];

export const TESTIMONIALS_VIDEO = [
  { id: "tv1", name: "Asha Jha", role: "News24 Anchor", src: ASSETS.testimonialVideo1, poster: ASSETS.thumbAshaJha },
  { id: "tv2", name: "Chavi Sharma", role: "House Wife", src: ASSETS.testimonialVideo2, poster: ASSETS.thumbChaviSharma }
];

/**
 * Each testimonial is an authentic review screenshot. The card displays the
 * screenshot itself (which contains the review text + author) plus an avatar:
 * either a face photo, OR an initial-letter circle when the original platform
 * showed only a default avatar.
 */
export interface WrittenTestimonial {
  id: string;
  /** Path to the testimonial review screenshot */
  review: string;
  /** Path to the face photo, OR null to show an initial-letter avatar */
  face: string | null;
  /** Initial letter used when face is null */
  initial?: string;
}

export const TESTIMONIALS_WRITTEN: WrittenTestimonial[] = [
  { id: "t1",  review: "/images/Screenshot 2026-05-14 125842.png",  face: "/images/Screenshot 2026-05-23 220013.png" },
  { id: "t2",  review: "/images/Screenshot 2026-05-14 125823.png",  face: null, initial: "R" },
  { id: "t3",  review: "/images/Screenshot 2026-05-14 125902.png",  face: "/images/Screenshot 2026-05-23 220110.png" },
  { id: "t4",  review: "/images/WhatsApp Image 2026-05-13 at 5.04.14 PM.jpeg", face: "/images/Screenshot 2026-05-23 220214.png" },
  { id: "t5",  review: "/images/WhatsApp Image 2026-05-13 at 5.04.33 PM.jpeg", face: null, initial: "S" },
  { id: "t6",  review: "/images/WhatsApp Image 2026-05-13 at 5.05.15 PM.jpeg", face: "/images/Screenshot 2026-05-23 220600.png" },
  { id: "t7",  review: "/images/Screenshot 2026-05-23 220640.png",  face: "/images/Screenshot 2026-05-23 220706.png" },
  { id: "t8",  review: "/images/Screenshot 2026-05-23 220750.png",  face: "/images/Screenshot 2026-05-23 220806.png" },
  { id: "t9",  review: "/images/Screenshot 2026-05-23 220833.png",  face: "/images/Screenshot 2026-05-23 220857.png" },
  { id: "t10", review: "/images/Screenshot 2026-05-23 220915.png",  face: "/images/Screenshot 2026-05-23 220933.png" },
  { id: "t11", review: "/images/Screenshot 2026-05-23 220949.png",  face: "/images/Screenshot 2026-05-23 221002.png" },
  { id: "t12", review: "/images/Screenshot 2026-05-23 221023.png",  face: "/images/Screenshot 2026-05-23 221038.png" },
  { id: "t13", review: "/images/Screenshot 2026-05-23 221057.png",  face: "/images/Screenshot 2026-05-23 221112.png" },
  { id: "t14", review: "/images/Screenshot 2026-05-23 221125.png",  face: "/images/Screenshot 2026-05-23 221141.png" },
  { id: "t15", review: "/images/Screenshot 2026-05-23 221156.png",  face: "/images/Screenshot 2026-05-23 221208.png" },
  { id: "t16", review: "/images/Screenshot 2026-05-23 221217.png",  face: "/images/Screenshot 2026-05-23 221230.png" },
  { id: "t17", review: "/images/Screenshot 2026-05-23 221239.png",  face: "/images/Screenshot 2026-05-23 221251.png" },
  { id: "t18", review: "/images/Screenshot 2026-05-23 221310.png",  face: "/images/Screenshot 2026-05-23 221324.png" },
  { id: "t19", review: "/images/Screenshot 2026-05-23 221336.png",  face: "/images/Screenshot 2026-05-23 221348.png" },
  { id: "t20", review: "/images/Screenshot 2026-05-23 221357.png",  face: "/images/Screenshot 2026-05-23 221415.png" },
  { id: "t21", review: "/images/Screenshot 2026-05-23 221529.png",  face: "/images/Screenshot 2026-05-23 221539.png" },
  { id: "t22", review: "/images/Screenshot 2026-05-23 221548.png",  face: "/images/Screenshot 2026-05-23 221744.png" },
  { id: "t23", review: "/images/Screenshot 2026-05-23 221559.png",  face: "/images/Screenshot 2026-05-23 221758.png" },
  { id: "t24", review: "/images/Screenshot 2026-05-23 221607.png",  face: "/images/Screenshot 2026-05-23 221812.png" },
  { id: "t25", review: "/images/Screenshot 2026-05-23 221614.png",  face: "/images/Screenshot 2026-05-23 221825.png" },
  { id: "t26", review: "/images/Screenshot 2026-05-23 221622.png",  face: "/images/Screenshot 2026-05-23 221836.png" },
  { id: "t27", review: "/images/Screenshot 2026-05-23 221630.png",  face: "/images/Screenshot 2026-05-23 221854.png" },
  { id: "t28", review: "/images/Screenshot 2026-05-23 221639.png",  face: "/images/Screenshot 2026-05-23 221908.png" },
  { id: "t29", review: "/images/Screenshot 2026-05-23 221649.png",  face: "/images/Screenshot 2026-05-23 221920.png" },
  { id: "t30", review: "/images/Screenshot 2026-05-23 221656.png",  face: "/images/Screenshot 2026-05-23 221934.png" },
  { id: "t31", review: "/images/Screenshot 2026-05-24 131724.png",  face: "/images/Screenshot 2026-05-23 221949.png" },
  { id: "t32", review: "/images/Screenshot 2026-05-23 221708.png",  face: "/images/Screenshot 2026-05-23 222004.png" }
];

export const BLOG_POSTS = [
  {
    slug: "what-is-sampoorna-fertility-yoga",
    category: "Fertility & Hormonal Wellness",
    title: "Inside the Sampoorna Fertility Yoga Protocol",
    excerpt:
      "How a research-informed yoga framework can support couples through their fertility journey — and where it carefully draws a line between support and medical claim.",
    date: "2026-04-22",
    cover: ASSETS.cardFertility,
    body: `The Sampoorna Fertility Yoga (SFY) Protocol was developed during 22 years of clinical practice working with women navigating PCOD, hormonal imbalance and the long road of fertility care.\n\nIt is not a treatment, and it is not a guarantee. It is a supportive practice — built on assessment, breath, posture, meditation and lifestyle — designed to give the body and mind a steady ground from which to do whatever else the medical journey requires.\n\nThe protocol begins with assessment. Pelvic mobility, breath patterning, postural carriage and lifestyle history are recorded with the same care a physiotherapist would bring to a knee assessment. From this we build a phased plan: gentle, restorative, progressive.\n\nWhat SFY is not: it does not replace endocrinology, gynaecology, or assisted reproductive care. It does not promise outcomes that no one can promise. What SFY can do is regulate the nervous system, reduce stress load, build pelvic awareness, support hormonal terrain through lifestyle, and most importantly — return a sense of agency to people who often feel they have lost it.`
  },
  {
    slug: "yoga-for-corporate-burnout",
    category: "Corporate Wellness",
    title: "Yoga for Corporate Burnout: A 4-Week Foundation",
    excerpt:
      "A practical, sober view on how four weeks of structured corporate yoga changes posture, breath, sleep and team dynamics.",
    date: "2026-04-08",
    cover: ASSETS.cardCorporate,
    body: `Most corporate wellness programs fail because they are inspirational rather than structural. After 100+ corporate workshops with companies including Bharat Petroleum, Indian Oil, ONGC, HPCL and Dell, the protocol that consistently delivers begins with structure...`
  },
  {
    slug: "back-pain-three-mistakes",
    category: "Body Pain & Recovery",
    title: "Three Mistakes People Make With Back Pain Yoga",
    excerpt:
      "Why some popular asanas can quietly worsen lower back issues — and the framework we use instead.",
    date: "2026-03-29",
    cover: ASSETS.bodyBack,
    body: `Yoga for back pain is one of the most searched topics online. It's also one of the most misunderstood. Three patterns appear repeatedly in clinical practice: forward folding without spinal length, deep backbending without core integration, and aggressive twisting in acute phases...`
  }
];
