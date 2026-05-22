// Content data — single source of truth for static-ish marketing copy.
// Anything user/admin-editable lives in Firestore; this file holds the
// structural defaults so the site never shows lorem ipsum.

import { ASSETS } from "./storage";
import { WA_MESSAGES } from "./utils";

export const PARTNERS = [
  "Bharat Petroleum",
  "Indian Oil",
  "ONGC",
  "Hindustan Petroleum",
  "Dell"
];

export const MEDIA_OUTLETS = ["India TV", "News24", "Zee News", "N Darshan"];

export const MARQUEE_ITEMS = [
  ...PARTNERS,
  ...MEDIA_OUTLETS,
  "Ministry of AYUSH",
  "Yoga Alliance USA"
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

export const ASANAS: { name: string; benefit: string }[] = [
  { name: "Tadasana", benefit: "Postural alignment & spinal length" },
  { name: "Vrikshasana", benefit: "Balance and focus" },
  { name: "Adho Mukha Svanasana", benefit: "Full-body decompression" },
  { name: "Bhujangasana", benefit: "Spinal mobility & chest opening" },
  { name: "Setu Bandhasana", benefit: "Lower back support, hip release" },
  { name: "Balasana", benefit: "Restorative reset for nervous system" },
  { name: "Paschimottanasana", benefit: "Hamstring length, calming" },
  { name: "Ardha Matsyendrasana", benefit: "Spinal rotation, digestion" },
  { name: "Trikonasana", benefit: "Lateral spine, hip mobility" },
  { name: "Virabhadrasana II", benefit: "Strength & stamina" },
  { name: "Ustrasana", benefit: "Heart opening, posture" },
  { name: "Marjariasana", benefit: "Spinal articulation" },
  { name: "Padmasana", benefit: "Meditation, hip opening" },
  { name: "Shavasana", benefit: "Deep nervous system rest" },
  { name: "Dhanurasana", benefit: "Backline strength" },
  { name: "Vajrasana", benefit: "Digestion post-meal" },
  { name: "Pranayama Seat", benefit: "Breath training base" },
  { name: "Surya Namaskar A", benefit: "Warm-up flow" },
  { name: "Surya Namaskar B", benefit: "Cardiovascular activation" },
  { name: "Garudasana", benefit: "Joint stability" },
  { name: "Anulom Vilom", benefit: "Pranic balance, calm" }
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
    price: "₹499 / session",
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
    price: "₹499 / session",
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
    price: "₹499 / session",
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
    price: "₹499 / session",
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
    price: "₹499 / session",
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
  { id: "n1", channel: "India TV", title: "Featured on India TV Wellness", src: ASSETS.newsIndiaTV },
  { id: "n2", channel: "Zee News", title: "Featured on Zee News", src: ASSETS.newsZee },
  { id: "n3", channel: "N Darshan", title: "Featured on N Darshan", src: ASSETS.newsDarshan },
  { id: "n4", channel: "News24", title: "Featured on News24", src: ASSETS.news24 }
];

export const WELLNESS_SERIES = [
  { id: "w1", title: "Natural Yoga for Low Blood Pressure", topic: "Cardiovascular", src: ASSETS.wellness1 },
  { id: "w2", title: "Yoga for High BP & Stress Management", topic: "Cardiovascular", src: ASSETS.wellness2 },
  { id: "w3", title: "Eye Relaxation & Vision Wellness", topic: "Vision", src: ASSETS.wellness3 },
  { id: "w4", title: "Natural Face Glow Yoga Routine", topic: "Beauty", src: ASSETS.wellness4 },
  { id: "w5", title: "Yoga for Cervical Pain Relief", topic: "Pain Relief", src: ASSETS.wellness5 },
  { id: "w6", title: "Frozen Shoulder Relief Exercises", topic: "Pain Relief", src: ASSETS.wellness6 },
  { id: "w7", title: "Yoga for Better Sleep", topic: "Sleep", src: ASSETS.wellness7 }
];

export const TESTIMONIALS_VIDEO = [
  { id: "tv1", name: "Asha Jha", role: "News24 Anchor", src: ASSETS.testimonialVideo1 },
  { id: "tv2", name: "Chavi Sharma", role: "House Wife", src: ASSETS.testimonialVideo2 }
];

export const TESTIMONIALS_WRITTEN = [
  {
    id: "tw1",
    name: "Priya Mehta",
    role: "Software Engineer",
    image: ASSETS.face1,
    stars: 5,
    text:
      "Dr. Sampoorna's therapeutic plan helped me address chronic back pain after years of trying everything. Six weeks in, my mobility is genuinely different."
  },
  {
    id: "tw2",
    name: "Anand Verma",
    role: "Banking Professional",
    image: ASSETS.face2,
    stars: 5,
    text:
      "The corporate sessions changed how my team begins the day. The framework feels clinical, the experience feels human."
  },
  {
    id: "tw3",
    name: "Riya Kapoor",
    role: "Architect",
    image: ASSETS.face3,
    stars: 5,
    text:
      "I came in for stress, I left with a practice for life. The breathwork modules are extraordinary."
  },
  {
    id: "tw4",
    name: "Meera Iyer",
    role: "Doctor",
    image: ASSETS.face4,
    stars: 5,
    text:
      "As a clinician myself I appreciate the evidence-informed approach. Nothing performative — careful, measured, effective."
  },
  {
    id: "tw5",
    name: "Karan Saxena",
    role: "Entrepreneur",
    image: ASSETS.face5,
    stars: 5,
    text:
      "The SFY protocol gave my partner and me a sense of agency during a difficult journey. Holistic without ever overpromising."
  },
  {
    id: "tw6",
    name: "Sunita Rao",
    role: "Educator",
    image: ASSETS.face6,
    stars: 5,
    text:
      "I sleep better, I move better, I think clearer. Twelve weeks of small, kind, daily steps."
  }
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
