export const contact = {
  email: "contact@mmk-agency.com",
  phone: "+1 (415) 890-4210",
  address: "550 Montgomery St, Creative Core, San Francisco, CA 94111",
  hours: "Mon - Fri, 09:00 - 18:00 (EST) · 24/7 Portal Support",
};

export const nav = [
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Pricing", "/pricing"],
  ["Support", "/support"],
  ["Contact", "/contact"],
] as const;

export const footerLinks: [string, [string, string][]][] = [
  [
    "Company",
    [
      ["About", "/about"],
      ["Portfolio", "/portfolio"],
      ["Contact", "/contact"],
      ["FAQ", "/faq"],
    ],
  ],
  [
    "Services",
    [
      ["Web design", "/services/web-design"],
      ["Web development", "/services/web-development"],
      ["E-commerce", "/services/ecommerce"],
      ["All services", "/services"],
    ],
  ],
  [
    "Project",
    [
      ["Start a project", "/start-project"],
      ["Preview", "/preview"],
      ["Pricing", "/pricing"],
      ["Checkout (demo)", "/checkout"],
      ["Support", "/support"],
    ],
  ],
  [
    "Legal",
    [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Cookies", "/cookies"],
    ],
  ],
];

export const services = [
  {
    slug: "web-design",
    title: "Web Design",
    blurb: "Clear, distinctive interfaces built around your audience.",
    badge: "UI / UX & Brand",
    timeline: "2-4 weeks",
    relatedProject: "lumen-studio",
    points: [
      "Brand-aligned visual systems",
      "Responsive page layouts",
      "Interactive prototypes",
      "Accessibility-minded design",
    ],
    detail:
      "We begin with your goals and audience, then design page layouts, components and a visual system that can grow with your business.",
  },
  {
    slug: "web-development",
    title: "Web Development",
    blurb: "Fast, maintainable websites built with modern tooling.",
    badge: "Next.js & React",
    timeline: "3-6 weeks",
    relatedProject: "orbit-board",
    points: [
      "Next.js and React builds",
      "Component libraries",
      "Performance tuning",
      "Clean, documented code",
    ],
    detail:
      "We turn approved designs into reliable, responsive websites, structured so your team can maintain and extend them.",
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    blurb: "Storefront experiences that make buying simple.",
    badge: "High Conversion",
    timeline: "4-8 weeks",
    relatedProject: "north-market",
    points: [
      "Catalog and product pages",
      "Cart and checkout interfaces",
      "Mobile-first shopping flows",
      "Integration planning",
    ],
    detail:
      "We design and build storefront interfaces and plan the integrations (payments, inventory) your shop needs to go live.",
  },
];

export const projects = [
  {
    slug: "lumen-studio",
    title: "Lumen Studio",
    cat: "Business",
    client: "Lumen Architectural Lighting",
    year: "2024",
    hue: "from-lime via-emerald-600 to-teal-900",
    serviceSlug: "web-design",
    serviceTitle: "Web Design",
    blurb: "Sample concept: a corporate site for an architectural lighting studio.",
    metrics: [
      { label: "Conversion Lift", value: "+148%" },
      { label: "Lighthouse Speed", value: "99/100" },
    ],
    scope: ["Brand-led homepage", "Service pages", "Contact flow"],
  },
  {
    slug: "north-market",
    title: "North Market",
    cat: "E-commerce",
    client: "North Artisan Groceries",
    year: "2024",
    hue: "from-amber-400 via-orange-500 to-rose-700",
    serviceSlug: "ecommerce",
    serviceTitle: "E-commerce",
    blurb: "Sample concept: a modern organic grocery storefront.",
    metrics: [
      { label: "Cart Completion", value: "+42%" },
      { label: "Checkout Speed", value: "1.2s" },
    ],
    scope: ["Product catalog", "Cart UI", "Checkout UI"],
  },
  {
    slug: "pixel-pulse",
    title: "Pixel Pulse",
    cat: "Portfolio",
    client: "Pulse Creative Photography",
    year: "2023",
    hue: "from-fuchsia-400 via-purple-600 to-indigo-900",
    serviceSlug: "web-design",
    serviceTitle: "Web Design",
    blurb: "Sample concept: a high-end photographer's interactive showcase.",
    metrics: [
      { label: "Inbound Inquiries", value: "+210%" },
      { label: "Session Duration", value: "3m 45s" },
    ],
    scope: ["Image gallery", "Case studies", "Booking enquiry form"],
  },
  {
    slug: "orbit-board",
    title: "Orbit Board",
    cat: "SaaS",
    client: "Orbit Analytics Cloud",
    year: "2024",
    hue: "from-sky-400 via-blue-600 to-indigo-900",
    serviceSlug: "web-development",
    serviceTitle: "Web Development",
    blurb: "Sample concept: a project analytics and dashboard product site.",
    metrics: [
      { label: "Signup Conversion", value: "+38%" },
      { label: "TTFB Response", value: "45ms" },
    ],
    scope: ["Marketing pages", "Dashboard UI mockup", "Pricing table"],
  },
];

export const filters = ["All", "Business", "E-commerce", "Portfolio", "SaaS"];

export const packages = [
  {
    id: "starter",
    name: "Starter",
    price: 1500,
    pages: 5,
    tagline: "Ideal for launches and landing pages",
    points: [
      "Up to 5 pages",
      "Responsive design",
      "Contact form UI",
      "1 revision round",
      "Standard animations",
      "Performance optimization",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 3500,
    pages: 10,
    popular: true,
    tagline: "Our most requested package for growing brands",
    points: [
      "Up to 10 pages",
      "Custom design system",
      "Subtle animations",
      "2 revision rounds",
      "SEO & OpenGraph configuration",
      "Interactive component library",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 7500,
    pages: 20,
    tagline: "For complex web platforms and storefronts",
    points: [
      "Up to 20 pages",
      "Advanced interactions & 3D feel",
      "E-commerce or dashboard UI",
      "3 revision rounds",
      "Full design audit & strategy",
      "Priority launch assistance",
    ],
  },
];

export const addons: [string, number][] = [
  ["Extra revision round", 250],
  ["Content writing (5 pages)", 400],
  ["Priority support (1 month)", 150],
];

export const workflow: [string, string][] = [
  ["Discover", "We learn your goals, audience and constraints."],
  ["Design", "We shape layouts and a visual system for your review."],
  ["Build", "We develop responsive pages and interactions."],
  ["Launch", "We test, hand over and support your go-live."],
];

export const agencyStats = [
  { label: "Websites Shipped", value: "85+" },
  { label: "Lighthouse Performance", value: "99/100" },
  { label: "Conversion Lift", value: "+138%" },
  { label: "Global Reach", value: "14 Countries" },
];

export const testimonials = [
  {
    quote:
      "MMK gave us a website that instantly transformed our market positioning. Inquiries doubled within 60 days of launch.",
    author: "Elena Rostova",
    role: "VP of Product, Orbit Board",
  },
  {
    quote:
      "From typography to code quality, the attention to detail was exceptional. The team loved how organized the handoff was.",
    author: "Marcus Vance",
    role: "Founder, Lumen Studio",
  },
];

export const faqs = [
  {
    q: "Are the prices real quotes?",
    a: "No. Prices on this demo site are illustrative examples, not binding quotes.",
  },
  {
    q: "Does the checkout take payment?",
    a: "No. Checkout is a frontend demo. No card details are collected and no order is placed.",
  },
  {
    q: "Where is my project brief stored?",
    a: "Only in your own browser (localStorage). Nothing is sent to a server.",
  },
  {
    q: "How long does a website take?",
    a: "Typical projects range from a few weeks to a few months, depending on scope.",
  },
  {
    q: "Can I change my brief later?",
    a: "Yes. Reopen the project wizard, edit any step, or reset it completely.",
  },
  {
    q: "Do contact forms send messages?",
    a: "Not on this demo. You can copy your message or open it in your email app.",
  },
];

export const legal: Record<string, { title: string; sections: [string, string][] }> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      [
        "Information we handle",
        "This demo site stores your project brief in your browser's localStorage. It is not transmitted to any server.",
      ],
      [
        "Contact forms",
        "Forms on this site are demonstrations. Messages are not sent or stored remotely.",
      ],
      [
        "Your choices",
        "You can clear your brief with the reset button or by clearing your browser's site data.",
      ],
    ],
  },
  terms: {
    title: "Terms and Conditions",
    sections: [
      [
        "Demo website",
        "This website is a frontend demonstration. Content, prices and portfolio projects are illustrative.",
      ],
      [
        "No binding offers",
        "Nothing on this site is a quote, contract or offer. Any real engagement requires a separate written agreement.",
      ],
      [
        "Payments",
        "The checkout is a simulation. No payment is requested or processed.",
      ],
    ],
  },
  cookies: {
    title: "Cookie Policy",
    sections: [
      ["Cookies", "This demo does not set tracking or advertising cookies."],
      [
        "Local storage",
        "Your project brief is saved in localStorage so it survives page refreshes. It stays on your device.",
      ],
      [
        "Managing storage",
        "Clear site data in your browser settings to remove saved information.",
      ],
    ],
  },
};
