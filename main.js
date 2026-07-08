import { supabase } from './supabase.js';

// Initialize Google Analytics if ID is provided
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaId) {
  const scriptEl = document.createElement('script');
  scriptEl.async = true;
  scriptEl.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(scriptEl);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId);
}

const isSupabaseActive = () => supabase !== null;

// Helper to dynamically calculate mock launch dates relative to today (guaranteeing past 1 month startups)
const daysAgo = (num) => {
  const d = new Date();
  d.setDate(d.getDate() - num);
  return d.toISOString().split('T')[0];
};

// 1. MOCK DATA BASE FOR STARTUPS (VETTED & GENUINE)
let startupsDatabase = [
  {
    id: "noida-ai-1",
    name: "NoidaAI Solutions",
    tagline: "Smarter automated operations for emerging NCR enterprises",
    description: "NoidaAI Solutions provides localized low-code robotic process automation (RPA) tools tailored for manufacturing, logistics, and textile enterprises in the National Capital Region (NCR). Their agentic system easily integrates with legacy inventory databases without requiring API overhaul.",
    sector: "AI & Tech",
    location: "Noida, India",
    logo: "🤖",
    launchDate: daysAgo(4),
    growthPotential: 88,
    declineRisk: 28,
    funding: "₹1.5Cr Pre-seed",
    teamSize: "9 members",
    website: "https://sarvam.ai",
    isHiring: true,
    openRoles: [
      { title: "Senior AI Integration Engineer", type: "Full-Time", location: "Noida (Hybrid)", salary: "₹12 - 16 LPA" },
      { title: "Junior React Developer", type: "Full-Time", location: "Noida (On-Site)", salary: "₹5 - 8 LPA" }
    ],
    growthReasons: [
      {
        title: "Noida-Greater Noida Tech Corridor",
        desc: "Direct physical proximity to major electronics manufacturing hubs allows them to acquire corporate clients with zero shipping/deployment delays.",
        icon: "🏢"
      },
      {
        title: "Low Integration Overhead",
        desc: "Their agentic solution connects directly to legacy SQL systems, which is highly appealing to traditional firms in NCR that are reluctant to migrate to the cloud.",
        icon: "🔌"
      },
      {
        title: "Vast Regional Developer Talent",
        desc: "Abundant tech colleges in Noida/Greater Noida provide a steady flow of high-quality developers at a sustainable cost structure.",
        icon: "🎓"
      }
    ],
    declineReasons: [
      {
        title: "Intense Talent Competition",
        desc: "Noida is also home to development offices of global tech conglomerates, creating a high poaching risk that could lead to development delays.",
        icon: "💸"
      },
      {
        title: "Regional Sales Dependency",
        desc: "The product is heavily customized for NCR business cultures. Scaling outside this corridor will require significant product-market re-alignment.",
        icon: "🗺️"
      }
    ]
  },
  {
    id: "tech-vapor-2",
    name: "VaporScale SaaS",
    tagline: "Serverless web caching with zero cold start delays",
    description: "VaporScale is a developer-tooling startup that optimizes edge networking. By predicting incoming web request patterns using lightweight machine learning, it pre-caches static resources at edge nodes, reducing latency by up to 70% compared to traditional CDN setups.",
    sector: "SaaS",
    location: "San Francisco, USA",
    logo: "☁️",
    launchDate: daysAgo(1),
    growthPotential: 92,
    declineRisk: 42,
    funding: "$2.4M Seed",
    teamSize: "12 members",
    website: "https://upstash.com",
    isHiring: true,
    openRoles: [
      { title: "Systems Engineer (Rust/Go)", type: "Full-Time", location: "San Francisco (Hybrid)", salary: "$140k - $180k" },
      { title: "Developer Relations Manager", type: "Full-Time", location: "Remote (US)", salary: "$110k - $140k" }
    ],
    growthReasons: [
      {
        title: "Developer Productivity Surge",
        desc: "As web applications become more dynamic, reducing initial load latency is a high priority for engineering leads seeking SEO benefits.",
        icon: "⚡"
      },
      {
        title: "High-Margin Infrastructure Model",
        desc: "Built on serverless edge nodes, their costs scale linearly with usage, leading to a highly attractive gross margin structure above 85%.",
        icon: "💰"
      }
    ],
    declineReasons: [
      {
        title: "Cloud Giants Domination",
        desc: "Cloud providers like AWS, Cloudflare, or Vercel could easily ship similar native caching features, making VaporScale's wrapper obsolete.",
        icon: "⛈️"
      },
      {
        title: "Complex Security Vetting",
        desc: "Enterprise customers are hesitant to route user traffic through an early-stage startup, causing prolonged B2B sales cycles.",
        icon: "🔒"
      }
    ]
  },
  {
    id: "ncr-solar-ledger-3",
    name: "NCR Solar Ledger",
    tagline: "Peer-to-peer solar energy trading using local smart grids",
    description: "NCR Solar Ledger operates a software platform enabling commercial warehouses in Greater Noida and Noida industrial sectors to trade excess rooftop solar energy directly with neighbouring manufacturing facilities, bypassing central state utility inefficiencies.",
    sector: "Green Energy",
    location: "Noida, India",
    logo: "☀️",
    launchDate: daysAgo(7),
    growthPotential: 82,
    declineRisk: 48,
    funding: "₹3.2Cr Seed",
    teamSize: "14 members",
    website: "https://www.powerledger.io",
    isHiring: false,
    growthReasons: [
      {
        title: "Industrial Rooftop Proliferation",
        desc: "The Noida Expressway is lined with thousands of sq meters of empty factory rooftops, representing cheap untapped solar generation capacity.",
        icon: "🏭"
      },
      {
        title: "Local Peak-Load Demands",
        desc: "Frequent local power grids struggles during hot summers create a high incentive for factories to buy reliable, cheaper local solar offsets.",
        icon: "⚡"
      }
    ],
    declineReasons: [
      {
        title: "State Policy Volatility",
        desc: "Uttar Pradesh electricity regulation changes or net metering cap shifts could severely restrict local peer-to-peer microgrids.",
        icon: "📜"
      },
      {
        title: "High Initial Infrastructure Cost",
        desc: "Connecting adjacent warehouses physically requires grid-interface smart meters, increasing upfront capital expenditure.",
        icon: "🔧"
      }
    ]
  },
  {
    id: "biome-london-4",
    name: "BiomeBio",
    tagline: "Microbiome-based personalized allergy treatments",
    description: "BiomeBio utilizes machine learning to analyze gut microbiome DNA sequencing, synthesizing personalized prebiotic capsules that target the root cause of chronic seasonal allergies rather than just masking symptoms with antihistamines.",
    sector: "HealthTech",
    location: "London, UK",
    logo: "🧬",
    launchDate: daysAgo(5),
    growthPotential: 78,
    declineRisk: 22,
    funding: "£1.2M Grant / Seed",
    teamSize: "7 members",
    website: "https://www.viome.com",
    isHiring: false,
    growthReasons: [
      {
        title: "Rising Chronic Allergies",
        desc: "Over 20% of the UK population suffers from respiratory allergies. Demand for long-term curative solutions is at an all-time high.",
        icon: "📈"
      },
      {
        title: "Proprietary Microbial Datasets",
        desc: "Their ML model trains on a proprietary database of UK microbiome profiles, creating a defensible moat against copycat health startups.",
        icon: "🧪"
      }
    ],
    declineReasons: [
      {
        title: "Stringent Regulatory Approval",
        desc: "Synthesizing bio-supplements requires strict clinical safety reviews. Any regulatory delay in the UK or EU could drain their cash reserves.",
        icon: "⚠️"
      },
      {
        title: "High Pricing Elasticity",
        desc: "Personalized prebiotics are expensive to produce. Inflation could cause consumers to revert to cheaper generic antihistamines.",
        icon: "💳"
      }
    ]
  },
  {
    id: "pay-noida-5",
    name: "PayNoida Merchant Link",
    tagline: "Collateral-free instant micro-loans for regional retail",
    description: "PayNoida is a fintech enabler built specifically for retail micro-merchants in Sector 18, Sector 62, and wholesale markets of Noida. By analyzing daily ledger cashflows, they disburse micro-loans instantly for inventory restocking, bypassing long bank approvals.",
    sector: "FinTech",
    location: "Noida, India",
    logo: "🏦",
    launchDate: daysAgo(9),
    growthPotential: 75,
    declineRisk: 55,
    funding: "₹80 Lakhs Angel",
    teamSize: "6 members",
    website: "https://bharatpe.com",
    isHiring: true,
    openRoles: [
      { title: "Business Development Representative", type: "Full-Time", location: "Noida (On-Site)", salary: "₹4 - 6 LPA" },
      { title: "Backend Node.js Developer", type: "Full-Time", location: "Noida (Hybrid)", salary: "₹9 - 13 LPA" }
    ],
    growthReasons: [
      {
        title: "High Retail Transaction Velocity",
        desc: "Noida’s expanding commercial sectors possess thousands of daily cash-generating shops that require quick short-term cash cushions.",
        icon: "🛍️"
      },
      {
        title: "Under-banked Merchant Base",
        desc: "Traditional banks require physical assets or extensive records. PayNoida uses WhatsApp ledger uploads for instant credit scoring.",
        icon: "📱"
      }
    ],
    declineReasons: [
      {
        title: "Extremely High Default Risk",
        desc: "Collateral-free loans to micro-merchants suffer from high seasonal defaults if local market conditions deteriorate.",
        icon: "📉"
      },
      {
        title: "Intense Competition",
        desc: "Fintech giants (Paytm, BharatPe, PhonePe) already capture a massive share of QR merchant payments and can easily roll out matching loan products.",
        icon: "🥊"
      }
    ]
  },
  {
    id: "zen-flow-6",
    name: "ZenFlow Automation",
    tagline: "Visual workflow builders for customer success teams",
    description: "ZenFlow enables customer operations leaders to build visual pipelines that auto-triage emails, draft responses, and update Salesforce objects. The drag-and-drop tool utilizes native LLMs to understand customer sentiment.",
    sector: "SaaS",
    location: "Bangalore, India",
    logo: "🌊",
    launchDate: daysAgo(2),
    growthPotential: 86,
    declineRisk: 30,
    funding: "$1.8M Seed",
    teamSize: "18 members",
    website: "https://n8n.io",
    isHiring: true,
    openRoles: [
      { title: "Lead Product Designer", type: "Full-Time", location: "Bangalore (Hybrid)", salary: "₹14 - 18 LPA" },
      { title: "Full Stack Engineer", type: "Full-Time", location: "Bangalore (On-Site)", salary: "₹12 - 16 LPA" }
    ],
    growthReasons: [
      {
        title: "CS Cost Rationalization",
        desc: "Global tech companies are under pressure to cut support costs, creating a high demand for automated triaging products.",
        icon: "📉"
      },
      {
        title: "Extremely Intuitive UX",
        desc: "Unlike complex tools like Zapier, ZenFlow is built purely for non-technical customer support managers, lowering barriers to adoption.",
        icon: "🎨"
      }
    ],
    declineReasons: [
      {
        title: "High API Platform Fees",
        desc: "Over-reliance on commercial LLM APIs (OpenAI, Anthropic) makes them vulnerable to pricing changes that could squeeze their margins.",
        icon: "💸"
      }
    ]
  },
  {
    id: "tokyo-robotics-7",
    name: "Tokyo Kinetic",
    tagline: "Autonomous inspection robots for heavy manufacturing",
    description: "Tokyo Kinetic creates quadruped robots specifically engineered to inspect heavy forging equipment and high-temperature smelting lines in metal industries, preventing human exposure to hazardous factory conditions.",
    sector: "AI & Tech",
    location: "Tokyo, Japan",
    logo: "🦾",
    launchDate: daysAgo(3),
    growthPotential: 90,
    declineRisk: 35,
    funding: "¥320M Series A",
    teamSize: "22 members",
    website: "https://www.bostondynamics.com",
    isHiring: false,
    growthReasons: [
      {
        title: "Severe Labor Shortage",
        desc: "Japan's rapidly aging industrial workforce creates a vital need for autonomous mechanical inspecton systems to keep plants running.",
        icon: "👴"
      },
      {
        title: "World-Class Robotics Ecosystem",
        desc: "Direct access to high-precision actuator and motor parts suppliers in Tokyo keeps their prototyping speeds extremely fast.",
        icon: "⚙️"
      }
    ],
    declineReasons: [
      {
        title: "Extended Sales and Pilot Cycles",
        desc: "Industrial plants require months of safety validation testing before buying units, leading to high capital burn during sales cycles.",
        icon: "⏳"
      },
      {
        title: "Hardware Supply Chain Risks",
        desc: "Global chip shortages or specialized steel export controls could stop assembly lines for their quadruped units.",
        icon: "🌍"
      }
    ]
  },
  {
    id: "earth-cycle-8",
    name: "EarthCycle Logistics",
    tagline: "Reverse logistics software for reusable cargo boxes",
    description: "EarthCycle provides an end-to-end asset tracking software and network that helps global logistics operators swap single-use cardboard crates for robust, IoT-tracked plastic crates that can be reused up to 50 times.",
    sector: "Green Energy",
    location: "Munich, Germany",
    logo: "📦",
    launchDate: daysAgo(8),
    growthPotential: 70,
    declineRisk: 18,
    funding: "€1.1M Pre-Seed",
    teamSize: "11 members",
    website: "https://www.packhelp.com",
    isHiring: false,
    growthReasons: [
      {
        title: "EU Green Mandates",
        desc: "New EU waste reduction policies penalize companies that rely heavily on single-use packaging, encouraging reusable crate networks.",
        icon: "🇪🇺"
      },
      {
        title: "Demonstrated Cost Reductions",
        desc: "Although initial crate deposits are higher, customers reduce recurring packaging costs by 40% over a 12-month period.",
        icon: "📈"
      }
    ],
    declineReasons: [
      {
        title: "High Tracking Losses",
        desc: "Even with IoT, crates are frequently lost or damaged, meaning the startup has to invest heavily in replacing lost fleet assets.",
        icon: "📡"
      }
    ]
  },
  {
    id: "old-startup-9",
    name: "Legacy Web Services",
    tagline: "Outdated static website hosting solutions",
    description: "Legacy Web Services provides simple static hosting services. Having launched over a month ago, it does not fit the criteria of recently launched startups.",
    sector: "SaaS",
    location: "Austin, USA",
    logo: "🗄️",
    launchDate: daysAgo(45),
    growthPotential: 30,
    declineRisk: 80,
    funding: "$100K Angel",
    teamSize: "2 members",
    website: "https://github.com",
    isHiring: false,
    growthReasons: [
      {
        title: "Cheap maintenance",
        desc: "Very low upkeep for static files.",
        icon: "💵"
      }
    ],
    declineReasons: [
      {
        title: "Obsolete Technology",
        desc: "Static web hosts are highly commoditized by free services like Netlify or GitHub Pages.",
        icon: "🔌"
      }
    ]
  }
];

// 2. QUEUED UP STARTUPS FOR SIMULATED LIVE LAUNCHES
const upcomingLaunchesQueue = [
  {
    id: "noida-organic-9",
    name: "Noida Agrow Tech",
    tagline: "Hydroponic farm monitoring sensors for Delhi NCR",
    description: "Noida Agrow Tech builds IoT moisture and nutrient sensors for high-yield hydroponic vertical farms. The system sends real-time nutrient levels directly to farmers' mobile applications, saving up to 30% on liquid fertilizer costs.",
    sector: "Green Energy",
    location: "Noida, India",
    logo: "🌱",
    launchDate: daysAgo(0),
    growthPotential: 80,
    declineRisk: 32,
    funding: "₹45 Lakhs Bootstrapped",
    teamSize: "4 members",
    website: "https://www.kheyti.com",
    isHiring: true,
    openRoles: [
      { title: "IoT Firmware Developer", type: "Full-Time", location: "Noida (On-Site)", salary: "₹6 - 9 LPA" }
    ],
    growthReasons: [
      {
        title: "Vertical Farming Boom",
        desc: "Rapid real estate prices in NCR are pushing growers towards hydroponic setups in commercial buildings, creating a ready market.",
        icon: "🥬"
      },
      {
        title: "Affordable Manufacturing",
        desc: "By 3D-printing casing shells locally in Sector 63, they keep production costs low enough to sell to smaller family farmers.",
        icon: "🖨️"
      }
    ],
    declineReasons: [
      {
        title: "Slow Rural Tech Literacy",
        desc: "Many traditional farmers in the region prefer manual crop checks and are reluctant to rely on app notifications.",
        icon: "🌾"
      }
    ]
  },
  {
    id: "pay-london-10",
    name: "GigaLedger UK",
    tagline: "High-speed clearing protocols for digital banking",
    description: "GigaLedger provides high-frequency financial ledgers that reconcile thousands of cross-border settlements per second using custom distributed validation nodes, minimizing transaction fee friction.",
    sector: "FinTech",
    location: "London, UK",
    logo: "⚡",
    launchDate: daysAgo(0),
    growthPotential: 89,
    declineRisk: 40,
    funding: "£3.1M Seed",
    teamSize: "15 members",
    website: "https://www.revolut.com",
    isHiring: true,
    openRoles: [
      { title: "Blockchain Infrastructure Architect", type: "Full-Time", location: "London (Hybrid)", salary: "£95k - £130k" }
    ],
    growthReasons: [
      {
        title: "Cross-Border Commerce Friction",
        desc: "UK companies trading with EU markets face high transaction fees, making instant, cheap clearance platforms highly valuable.",
        icon: "🚢"
      }
    ],
    declineReasons: [
      {
        title: "Strict FCA Compliance",
        desc: "Financial regulations in the UK are tough. A single compliance auditing failure could halt operations entirely.",
        icon: "⚖️"
      }
    ]
  },
  {
    id: "noida-care-11",
    name: "NoidaCare Telehealth",
    tagline: "Vernacular medical consultation platform for NCR",
    description: "NoidaCare connects Hindi and regional dialect speakers with top physicians across Greater Noida, Noida, and Ghaziabad via low-bandwidth video consultations, providing prescription delivery within 2 hours.",
    sector: "HealthTech",
    location: "Noida, India",
    logo: "🏥",
    launchDate: daysAgo(0),
    growthPotential: 85,
    declineRisk: 38,
    funding: "₹1.1Cr Angel",
    teamSize: "8 members",
    website: "https://www.practo.com",
    isHiring: true,
    openRoles: [
      { title: "Telehealth Consultant Doctor", type: "Part-Time", location: "Remote (India)", salary: "₹10 - 14 LPA" },
      { title: "Customer Success Lead", type: "Full-Time", location: "Noida (On-Site)", salary: "₹4 - 6 LPA" }
    ],
    growthReasons: [
      {
        title: "Massive Vernacular Market",
        desc: "Over 70% of NCR residents prefer speaking in Hindi or local dialects, which major global health portals fail to serve correctly.",
        icon: "🗣️"
      },
      {
        title: "Pharmacy Partnerships",
        desc: "Tie-ups with local Sector 18 drug distributors ensure rapid prescription fulfillment and strong referral margins.",
        icon: "💊"
      }
    ],
    declineReasons: [
      {
        title: "Medical Liabilities",
        desc: "Consulting patients online carries inherent risks of misdiagnosis, exposing the startup to legal claims.",
        icon: "🩺"
      }
    ]
  },
  {
    id: "sf-eco-12",
    name: "EcoPack SF",
    tagline: "Mushroom-mycelium based alternative packaging supply",
    description: "EcoPack grows custom-molded packaging materials using mushroom mycelium and agricultural waste. The organic material decomposes naturally in backyards within 45 days, replacing styrofoam inserts.",
    sector: "Green Energy",
    location: "San Francisco, USA",
    logo: "🍄",
    launchDate: daysAgo(0),
    growthPotential: 91,
    declineRisk: 25,
    funding: "$1.5M Seed",
    teamSize: "8 members",
    website: "https://www.mycoworks.com",
    isHiring: false,
    growthReasons: [
      {
        title: "Plastic Bans in California",
        desc: "California cities are moving to ban polystyrene packaging, prompting retail companies to source biological replacements.",
        icon: "📜"
      }
    ],
    declineReasons: [
      {
        title: "Scale Limits",
        desc: "Growing organic mycelium takes up to 7 days, making it harder to fulfill massive, unexpected logistics order spikes.",
        icon: "🍄"
      }
    ]
  }
];

// 3. CORE STATE VARIABLES
let activeFilters = {
  search: "",
  sector: "all",
  growth: "all",
  risk: "all",
  location: "all",
  hiring: "all",
  timeframe: "all"
};
let activeSort = "launchDateDesc";
let selectedCompanyId = null;

// 4. UI ELEMENT CACHE
const elements = {
  appContainer: document.getElementById("app-container"),
  companiesGrid: document.getElementById("companies-grid"),
  searchInput: document.getElementById("search-input"),
  searchClearBtn: document.getElementById("search-clear-btn"),
  sortSelect: document.getElementById("sort-select"),
  noResults: document.getElementById("no-results"),
  resetSearchBtn: document.getElementById("reset-search-btn"),
  
  // Sidebar
  sectorFilters: document.getElementById("sector-filters"),
  growthFilters: document.getElementById("growth-filters"),
  riskFilters: document.getElementById("risk-filters"),
  hiringFilters: document.getElementById("hiring-filters"),
  timeframeFilters: document.getElementById("timeframe-filters"),
  locationLinks: document.getElementById("location-links"),
  
  // Stats
  statTotal: document.getElementById("stat-total"),
  statHighGrowth: document.getElementById("stat-high-growth"),
  statHighRisk: document.getElementById("stat-high-risk"),
  statHiringNow: document.getElementById("stat-hiring-now"),
  
  // Drawer
  detailDrawer: document.getElementById("detail-drawer"),
  drawerBackdrop: document.getElementById("drawer-backdrop"),
  closeDrawerBtn: document.getElementById("close-drawer-btn"),
  drawerCompanyName: document.getElementById("drawer-company-name"),
  drawerSector: document.getElementById("drawer-sector"),
  drawerLocation: document.getElementById("drawer-location"),
  drawerLogoPlaceholder: document.getElementById("drawer-logo-placeholder"),
  drawerGrowthScoreVal: document.getElementById("drawer-growth-score-val"),
  drawerGrowthBar: document.getElementById("drawer-growth-bar"),
  drawerRiskScoreVal: document.getElementById("drawer-risk-score-val"),
  drawerRiskBar: document.getElementById("drawer-risk-bar"),
  drawerDescription: document.getElementById("drawer-description"),
  drawerLaunchDate: document.getElementById("drawer-launch-date"),
  drawerFunding: document.getElementById("drawer-funding"),
  drawerTeamSize: document.getElementById("drawer-team-size"),
  drawerHiringStatus: document.getElementById("drawer-hiring-status"),
  drawerGrowthFactors: document.getElementById("drawer-growth-factors"),
  drawerRiskFactors: document.getElementById("drawer-risk-factors"),
  drawerChartSvg: document.getElementById("drawer-chart-svg"),
  drawerWebsiteBtn: document.getElementById("drawer-website-btn"),
  drawerJobsList: document.getElementById("drawer-jobs-list"),
  drawerCareersHiringState: document.getElementById("drawer-careers-hiring-state"),
  drawerCareersEmptyState: document.getElementById("drawer-careers-empty-state"),
  
  // Active Filter Row
  activeFiltersRow: document.getElementById("active-filters-row"),
  activeFiltersList: document.getElementById("active-filters-list"),
  clearAllFilters: document.getElementById("clear-all-filters"),
  
  // Auth Elements
  authModal: document.getElementById("auth-modal"),
  lockWarningBanner: document.getElementById("lock-warning-banner"),
  warningTimer: document.getElementById("warning-timer"),
  signupFormContainer: document.getElementById("signup-form-container"),
  loginFormContainer: document.getElementById("login-form-container"),
  signupForm: document.getElementById("signup-form"),
  loginForm: document.getElementById("login-form"),
  toLoginBtn: document.getElementById("to-login-btn"),
  toSignupBtn: document.getElementById("to-signup-btn"),
  headerAuthBtn: document.getElementById("header-auth-btn"),
  headerSyncTime: document.getElementById("header-sync-time"),
  themeToggle: document.getElementById("theme-toggle"),
  toastContainer: document.getElementById("toast-container"),

  // Policy Modals & Links
  linkAbout: document.getElementById("link-about"),
  linkContact: document.getElementById("link-contact"),
  linkPrivacy: document.getElementById("link-privacy"),
  linkTerms: document.getElementById("link-terms"),
  policyModal: document.getElementById("policy-modal"),
  policyModalTitle: document.getElementById("policy-modal-title"),
  policyModalBody: document.getElementById("policy-modal-body"),
  closePolicyBtn: document.getElementById("close-policy-btn")
};

// ----------------------------------------------------
// 5. DYNAMIC STARTUP RENDERING & FILTERING
// ----------------------------------------------------

// Calculate and render top statistics cards
function updateDashboardStats() {
  const total = startupsDatabase.length;
  const highGrowth = startupsDatabase.filter(s => s.growthPotential >= 80).length;
  const highRisk = startupsDatabase.filter(s => s.declineRisk >= 50).length;
  
  const hiringCount = startupsDatabase.filter(s => s.isHiring).length;
  
  elements.statTotal.textContent = total;
  elements.statHighGrowth.textContent = highGrowth;
  elements.statHighRisk.textContent = highRisk;
  elements.statHiringNow.textContent = hiringCount;
}

// Generate the list of startup cards based on filters & search
function renderStartups() {
  const filtered = getFilteredStartups();
  
  if (filtered.length === 0) {
    elements.companiesGrid.innerHTML = "";
    elements.noResults.classList.remove("hidden");
    return;
  }
  
  elements.noResults.classList.add("hidden");
  
  elements.companiesGrid.innerHTML = filtered.map(startup => {
    // Check if the company has been newly launched in this session
    const isNew = startup.isLiveSimulated ? `<span class="new-badge">New Launch</span>` : '';
    
    return `
      <div class="company-card" data-id="${startup.id}">
        ${isNew}
        <div class="card-header">
          <div class="card-logo">${startup.logo}</div>
          <div class="card-title-group">
            <h3>${startup.name}</h3>
            <div class="card-subtitle">
              <span>${startup.sector}</span>
              <span class="bullet-dot"></span>
              <span>Vetted ✓</span>
            </div>
          </div>
        </div>
        <p class="card-body">${startup.tagline}</p>
        
        <div class="card-metrics">
          <div class="metric-bar-group">
            <div class="metric-header">
              <span>Growth</span>
              <span class="text-green font-bold">${startup.growthPotential}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill progress-green" style="width: ${startup.growthPotential}%"></div>
            </div>
          </div>
          
          <div class="metric-bar-group">
            <div class="metric-header">
              <span>Decline Risk</span>
              <span class="text-red font-bold">${startup.declineRisk}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill progress-red" style="width: ${startup.declineRisk}%"></div>
            </div>
          </div>
        </div>
        
        <div class="card-footer">
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <span class="badge badge-location">${startup.location}</span>
            ${startup.isHiring ? '<span class="badge badge-hiring">Hiring 🔥</span>' : '<span class="badge badge-not-hiring">Not Hiring</span>'}
          </div>
          <span>${formatDateLabel(startup.launchDate)}</span>
        </div>
      </div>
    `;
  }).join("");
  
  // Attach click listeners to cards
  document.querySelectorAll(".company-card").forEach(card => {
    card.addEventListener("click", () => {
      openCompanyDetails(card.getAttribute("data-id"));
    });
  });
}

// Compute filters & sort
function getFilteredStartups() {
  // Strictly include only companies launched in the last 30 days (past 1 month)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  let list = startupsDatabase.filter(item => {
    const launch = new Date(item.launchDate);
    launch.setHours(0, 0, 0, 0);
    return launch >= thirtyDaysAgo;
  });
  
  // Search filter
  if (activeFilters.search) {
    const query = activeFilters.search.toLowerCase().trim();
    list = list.filter(item => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.sector.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query)
      );
    });
  }
  
  // Sector filter
  if (activeFilters.sector !== "all") {
    list = list.filter(item => item.sector === activeFilters.sector);
  }
  
  // Location Filter (sidebar quick links)
  if (activeFilters.location !== "all") {
    list = list.filter(item => item.location.toLowerCase().includes(activeFilters.location.toLowerCase()));
  }
  
  // Growth Potential filter
  if (activeFilters.growth !== "all") {
    if (activeFilters.growth === "high") {
      list = list.filter(item => item.growthPotential >= 80);
    } else if (activeFilters.growth === "medium") {
      list = list.filter(item => item.growthPotential >= 50 && item.growthPotential < 80);
    } else if (activeFilters.growth === "low") {
      list = list.filter(item => item.growthPotential < 50);
    }
  }
  
  // Decline Risk filter
  if (activeFilters.risk !== "all") {
    if (activeFilters.risk === "low") {
      list = list.filter(item => item.declineRisk < 35);
    } else if (activeFilters.risk === "medium") {
      list = list.filter(item => item.declineRisk >= 35 && item.declineRisk <= 65);
    } else if (activeFilters.risk === "high") {
      list = list.filter(item => item.declineRisk > 65);
    }
  }
  
  // Hiring Status filter
  if (activeFilters.hiring !== "all") {
    if (activeFilters.hiring === "hiring") {
      list = list.filter(item => item.isHiring);
    } else if (activeFilters.hiring === "nothiring") {
      list = list.filter(item => !item.isHiring);
    }
  }

  // Timeframe filter
  if (activeFilters.timeframe !== "all") {
    const limitDays = parseInt(activeFilters.timeframe);
    const cutOffDate = new Date();
    cutOffDate.setDate(cutOffDate.getDate() - limitDays);
    // Strip hours/minutes from cutOffDate for consistent comparison
    cutOffDate.setHours(0, 0, 0, 0);
    list = list.filter(item => {
      const launch = new Date(item.launchDate);
      launch.setHours(0, 0, 0, 0);
      return launch >= cutOffDate;
    });
  }
  
  // Apply Sort
  list.sort((a, b) => {
    if (activeSort === "launchDateDesc") {
      return new Date(b.launchDate) - new Date(a.launchDate);
    } else if (activeSort === "growthDesc") {
      return b.growthPotential - a.growthPotential;
    } else if (activeSort === "growthAsc") {
      return a.growthPotential - b.growthPotential;
    } else if (activeSort === "riskDesc") {
      return b.declineRisk - a.declineRisk;
    } else if (activeSort === "nameAsc") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
  
  return list;
}

// ----------------------------------------------------
// 6. ACTIVE FILTER TAGS UI
// ----------------------------------------------------
function updateActiveFilterTags() {
  const tags = [];
  
  if (activeFilters.search) {
    tags.push({ key: "search", label: `Search: "${activeFilters.search}"` });
  }
  if (activeFilters.sector !== "all") {
    tags.push({ key: "sector", label: `Sector: ${activeFilters.sector}` });
  }
  if (activeFilters.location !== "all") {
    tags.push({ key: "location", label: `Area: ${activeFilters.location}` });
  }
  if (activeFilters.growth !== "all") {
    tags.push({ key: "growth", label: `Growth: ${activeFilters.growth.toUpperCase()}` });
  }
  if (activeFilters.risk !== "all") {
    tags.push({ key: "risk", label: `Risk: ${activeFilters.risk.toUpperCase()}` });
  }
  if (activeFilters.hiring !== "all") {
    tags.push({ key: "hiring", label: `Status: ${activeFilters.hiring === "hiring" ? "Hiring" : "Not Hiring"}` });
  }
  if (activeFilters.timeframe !== "all") {
    tags.push({ key: "timeframe", label: `Launched: Past ${activeFilters.timeframe} Days` });
  }
  
  if (tags.length === 0) {
    elements.activeFiltersRow.classList.add("hidden");
    return;
  }
  
  elements.activeFiltersRow.classList.remove("hidden");
  elements.activeFiltersList.innerHTML = tags.map(tag => `
    <span class="active-tag">
      ${tag.label}
      <button data-key="${tag.key}">✕</button>
    </span>
  `).join("");
  
  // Attach remove events
  elements.activeFiltersList.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-key");
      removeFilterKey(key);
    });
  });
}

function removeFilterKey(key) {
  if (key === "search") {
    activeFilters.search = "";
    elements.searchInput.value = "";
    elements.searchClearBtn.classList.add("hidden");
  } else if (key === "location") {
    activeFilters.location = "all";
    document.querySelectorAll(".loc-link").forEach(l => l.classList.remove("text-primary"));
  } else {
    activeFilters[key] = "all";
    // Deactivate filter chip in sidebar
    const chips = document.querySelectorAll(`.filter-chip[data-filter="${key}"]`);
    chips.forEach(c => {
      if (c.getAttribute("data-value") === "all") c.classList.add("active");
      else c.classList.remove("active");
    });
  }
  
  updateActiveFilterTags();
  renderStartups();
}

// ----------------------------------------------------
// 7. COMPANY DETAIL VIEW (SLIDING PANEL)
// ----------------------------------------------------
function openCompanyDetails(companyId) {
  const company = startupsDatabase.find(s => s.id === companyId);
  if (!company) return;
  
  selectedCompanyId = companyId;
  
  // Populate text contents
  elements.drawerCompanyName.textContent = company.name;
  elements.drawerSector.textContent = company.sector;
  elements.drawerLocation.textContent = company.location;
  elements.drawerLogoPlaceholder.textContent = company.logo;
  elements.drawerDescription.textContent = company.description;
  elements.drawerLaunchDate.textContent = formatDateLabel(company.launchDate);
  elements.drawerFunding.textContent = company.funding;
  elements.drawerTeamSize.textContent = company.teamSize;
  elements.drawerHiringStatus.textContent = company.isHiring ? "Active Hiring 🔥" : "Not Hiring";
  elements.drawerHiringStatus.className = company.isHiring ? "meta-value text-green font-bold" : "meta-value text-muted-darker";
  elements.drawerWebsiteBtn.setAttribute("data-url", company.website);
  
  // Set progress numbers and bars
  elements.drawerGrowthScoreVal.textContent = `${company.growthPotential}%`;
  elements.drawerGrowthBar.style.width = `${company.growthPotential}%`;
  elements.drawerRiskScoreVal.textContent = `${company.declineRisk}%`;
  elements.drawerRiskBar.style.width = `${company.declineRisk}%`;
  
  // Render Growth Reasons list
  elements.drawerGrowthFactors.innerHTML = company.growthReasons.map(r => `
    <div class="factor-item">
      <div class="factor-icon-wrapper">${r.icon}</div>
      <div class="factor-details">
        <span class="factor-title">${r.title}</span>
        <p class="factor-desc">${r.desc}</p>
      </div>
    </div>
  `).join("");
  
  // Render Decline Risks list
  elements.drawerRiskFactors.innerHTML = company.declineReasons.map(r => `
    <div class="factor-item">
      <div class="factor-icon-wrapper">${r.icon}</div>
      <div class="factor-details">
        <span class="factor-title">${r.title}</span>
        <p class="factor-desc">${r.desc}</p>
      </div>
    </div>
  `).join("");
  
  // Render interactive SVG comparison metrics chart
  renderSVGComparisonChart(company.growthPotential, company.declineRisk);
  
  // Reset tabs to default (Overview active) when opening
  const tabs = document.querySelectorAll(".drawer-tab");
  const panes = document.querySelectorAll(".tab-pane");
  tabs.forEach(t => t.classList.remove("active"));
  panes.forEach(p => p.classList.remove("active"));
  document.querySelector('.drawer-tab[data-tab="overview"]').classList.add("active");
  document.getElementById("pane-overview").classList.add("active");

  // Render open careers/jobs
  if (company.isHiring && company.openRoles && company.openRoles.length > 0) {
    elements.drawerCareersHiringState.classList.remove("hidden");
    elements.drawerCareersEmptyState.classList.add("hidden");
    
    elements.drawerJobsList.innerHTML = company.openRoles.map((job, idx) => `
      <div class="job-card" data-index="${idx}">
        <div class="job-title-row">
          <h5>${job.title}</h5>
        </div>
        <div class="job-meta-row">
          <span class="job-badge">${job.type}</span>
          <span class="job-badge">${job.location}</span>
          <span class="job-badge job-badge-salary">${job.salary}</span>
        </div>
        <div class="job-actions">
          <button class="btn-job-apply" data-job-title="${job.title}">Quick Apply</button>
        </div>
      </div>
    `).join("");
    
    // Attach apply button listeners
    elements.drawerJobsList.querySelectorAll(".btn-job-apply").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("applied")) return;
        
        btn.classList.add("applied");
        btn.textContent = "Applied ✓";
        
        const jobTitle = btn.getAttribute("data-job-title");
        showToast("Application Submitted!", `You have successfully applied for the <strong>${jobTitle}</strong> position at <em>${company.name}</em>.`, "toast-new-company", "💼");
      });
    });
  } else {
    elements.drawerCareersHiringState.classList.add("hidden");
    elements.drawerCareersEmptyState.classList.remove("hidden");
    elements.drawerJobsList.innerHTML = "";
  }
  
  // Open the drawer UI
  elements.detailDrawer.classList.add("open");
}

function closeCompanyDetails() {
  elements.detailDrawer.classList.remove("open");
  selectedCompanyId = null;
}

// Draw a beautiful dynamic SVG ratio visualization inside the drawer
function renderSVGComparisonChart(growth, risk) {
  const size = 180;
  const stroke = 12;
  const radius = (size / 2) - stroke;
  const circum = 2 * Math.PI * radius;
  
  // Draw two offset semi-circles or a single combined pie ring
  const growthOffset = circum - (growth / 100) * circum;
  const riskOffset = circum - (risk / 100) * circum;
  
  elements.drawerChartSvg.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <!-- Outer Growth circle -->
      <circle 
        cx="${size/2}" cy="${size/2}" r="${radius}" 
        stroke="var(--bg-input)" stroke-width="${stroke}" fill="transparent"
      />
      <circle 
        cx="${size/2}" cy="${size/2}" r="${radius}" 
        stroke="var(--green)" stroke-width="${stroke}" fill="transparent"
        stroke-dasharray="${circum}" stroke-dashoffset="${growthOffset}"
        stroke-linecap="round"
        transform="rotate(-90 ${size/2} ${size/2})"
        style="transition: stroke-dashoffset 0.8s ease;"
      />
      <!-- Inner Risk circle -->
      <circle 
        cx="${size/2}" cy="${size/2}" r="${radius - 20}" 
        stroke="var(--bg-input)" stroke-width="${stroke}" fill="transparent"
      />
      <circle 
        cx="${size/2}" cy="${size/2}" r="${radius - 20}" 
        stroke="var(--red)" stroke-width="${stroke}" fill="transparent"
        stroke-dasharray="${2 * Math.PI * (radius - 20)}" stroke-dashoffset="${(2 * Math.PI * (radius - 20)) - (risk / 100) * (2 * Math.PI * (radius - 20))}"
        stroke-linecap="round"
        transform="rotate(-90 ${size/2} ${size/2})"
        style="transition: stroke-dashoffset 0.8s ease;"
      />
      <text x="50%" y="46%" text-anchor="middle" font-family="Outfit" font-weight="800" font-size="1.45rem" fill="var(--text-main)">
        ${Math.round((growth / (growth + risk || 1)) * 100)}%
      </text>
      <text x="50%" y="60%" text-anchor="middle" font-family="Inter" font-weight="600" font-size="0.65rem" fill="var(--text-muted)" letter-spacing="0.05em">
        GROWTH INDEX
      </text>
    </svg>
  `;
}

// ----------------------------------------------------
// 8. 1-MINUTE FORCED LOCK TIMER & REGISTRATION FLOW
// ----------------------------------------------------
let countdownValue = 60; // 1 minute in seconds
let countdownTimerId = null;

let currentUser = null;

function checkAuthStatus() {
  if (currentUser) {
    elements.lockWarningBanner.classList.add("hidden");
    elements.authModal.classList.add("hidden");
    elements.appContainer.classList.remove("locked");
    
    elements.headerAuthBtn.classList.remove("btn-outline");
    elements.headerAuthBtn.classList.add("btn-primary");
    elements.headerAuthBtn.innerHTML = `<span>👋</span> <span class="btn-text">Log Out (${currentUser.name.split(' ')[0]})</span>`;
    return true;
  }
  
  // Local storage fallback for offline/guest state
  const user = localStorage.getItem("userSession");
  if (user) {
    const session = JSON.parse(user);
    currentUser = session;
    elements.lockWarningBanner.classList.add("hidden");
    elements.authModal.classList.add("hidden");
    elements.appContainer.classList.remove("locked");
    
    elements.headerAuthBtn.classList.remove("btn-outline");
    elements.headerAuthBtn.classList.add("btn-primary");
    elements.headerAuthBtn.innerHTML = `<span>👋</span> <span class="btn-text">Log Out (${session.name.split(' ')[0]})</span>`;
    return true;
  }
  
  elements.headerAuthBtn.classList.add("btn-outline");
  elements.headerAuthBtn.classList.remove("btn-primary");
  elements.headerAuthBtn.innerHTML = `<span class="btn-text">Sign In</span>`;
  return false;
}

// Starts the ticking timer for mandatory registration
function startAuthenticationCountdown() {
  if (checkAuthStatus()) return; // Already logged in, no timer needed
  if (countdownTimerId !== null) return; // Timer is already running
  
  elements.lockWarningBanner.classList.remove("hidden");
  elements.warningTimer.textContent = countdownValue;
  
  countdownTimerId = setInterval(() => {
    countdownValue--;
    elements.warningTimer.textContent = countdownValue;
    
    // Animate banner to get attention when under 10 seconds
    if (countdownValue <= 10) {
      elements.lockWarningBanner.style.background = "linear-gradient(90deg, #dc2626, var(--red))";
      elements.lockWarningBanner.style.color = "#fff";
      if (countdownValue % 2 === 0) {
        elements.lockWarningBanner.style.transform = "scale(1.01)";
      } else {
        elements.lockWarningBanner.style.transform = "scale(1)";
      }
    }
    
    if (countdownValue <= 0) {
      clearInterval(countdownTimerId);
      triggerForcedAuthLock();
    }
  }, 1000);
}

// Lock screen wall triggers, blurring the page content
function triggerForcedAuthLock() {
  if (checkAuthStatus()) return; // Double check
  
  // Close any details drawer that is open
  closeCompanyDetails();
  
  elements.lockWarningBanner.classList.add("hidden");
  elements.appContainer.classList.add("locked");
  elements.authModal.classList.remove("hidden");
  
  // Show toast informing the lock
  showToast("Access Locked", "Please register or sign in to continue viewing detailed analysis on recently launched companies.", "toast-warning", "🔑");
}

// Handle local registration mock flow or real Supabase flow
async function handleSignUp(e) {
  e.preventDefault();
  
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  
  if (!name || !email || !password) return;

  const submitBtn = e.target.querySelector("button[type='submit']");
  const originalBtnText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating Account...";
  
  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      if (error) throw error;
      
      // Check if session was generated (some setups auto-login upon signup)
      if (data.session) {
        showToast("Account Created!", `Welcome to RecentLaunchedCompanies, ${name.split(' ')[0]}! Full access unlocked.`, "toast-new-company", "🛡️");
      } else {
        // If email confirmation is required (default Supabase setting)
        showToast("Check your Email!", "We sent a verification link. Please confirm your email to activate your account.", "toast-new-company", "📧");
        
        // Temporarily let them browse for friction-free UX
        const session = { name, email, isLoggedIn: true, token: "temp-jwt-" + Date.now() };
        localStorage.setItem("userSession", JSON.stringify(session));
        currentUser = session;
        
        clearInterval(countdownTimerId);
        elements.authModal.classList.add("hidden");
        elements.appContainer.classList.remove("locked");
        elements.lockWarningBanner.classList.add("hidden");
        checkAuthStatus();
      }
    } catch (err) {
      console.error("Supabase signup error:", err.message);
      showToast("Sign Up Failed", err.message, "toast-warning", "❌");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  } else {
    // Fallback Mock Sign Up
    const session = { name, email, isLoggedIn: true, token: "mock-jwt-" + Date.now() };
    localStorage.setItem("userSession", JSON.stringify(session));
    currentUser = session;
    
    clearInterval(countdownTimerId);
    elements.authModal.classList.add("hidden");
    elements.appContainer.classList.remove("locked");
    elements.lockWarningBanner.classList.add("hidden");
    
    checkAuthStatus();
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    
    showToast("Account Created (Offline)!", `Welcome, ${name.split(' ')[0]}! Full access unlocked.`, "toast-new-company", "🛡️");
  }
}

async function handleLogIn(e) {
  e.preventDefault();
  
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  
  if (!email || !password) return;

  const submitBtn = e.target.querySelector("button[type='submit']");
  const originalBtnText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Signing In...";
  
  if (isSupabaseActive()) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) throw error;
      
      const name = data.user.user_metadata.full_name || email.split('@')[0];
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      
      showToast("Logged In", `Welcome back, ${formattedName}! Unrestricted access restored.`, "toast-new-company", "🔓");
    } catch (err) {
      console.error("Supabase login error:", err.message);
      showToast("Login Failed", err.message, "toast-warning", "❌");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  } else {
    // Fallback Mock Log In
    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    const session = { name: formattedName, email, isLoggedIn: true, token: "mock-jwt-" + Date.now() };
    localStorage.setItem("userSession", JSON.stringify(session));
    currentUser = session;
    
    clearInterval(countdownTimerId);
    elements.authModal.classList.add("hidden");
    elements.appContainer.classList.remove("locked");
    elements.lockWarningBanner.classList.add("hidden");
    
    checkAuthStatus();
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    
    showToast("Logged In (Offline)", `Welcome back, ${formattedName}! Unrestricted access restored.`, "toast-new-company", "🔓");
  }
}

async function handleLogout() {
  if (isSupabaseActive()) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error("Supabase logout error:", err.message);
    }
  }

  localStorage.removeItem("userSession");
  currentUser = null;
  
  checkAuthStatus();
  showToast("Signed Out", "You have logged out. The session is closed.", "toast-warning", "🔒");
  
  // Restart timer
  countdownValue = 60;
  elements.lockWarningBanner.style.background = "linear-gradient(90deg, #d97706, #f59e0b)";
  elements.lockWarningBanner.style.color = "#000";
  startAuthenticationCountdown();
}

// ----------------------------------------------------
// 9. SIMULATED REAL-TIME UPDATES (NEW COMPANY DISCOVERY)
// ----------------------------------------------------
function startLiveSimulatedLaunches() {
  // Add a new company every 45-60 seconds
  let queueIndex = 0;
  
  setInterval(() => {
    if (queueIndex >= upcomingLaunchesQueue.length) return; // No more companies in queue
    
    const newStartup = upcomingLaunchesQueue[queueIndex];
    newStartup.isLiveSimulated = true;
    newStartup.launchDate = new Date().toISOString().split('T')[0]; // set current local date
    
    // Add to top of database
    startupsDatabase.unshift(newStartup);
    queueIndex++;
    
    // Refresh elements
    updateDashboardStats();
    renderStartups();
    
    // Trigger notification toast
    showToast(
      "New Startup Vetted!",
      `<strong>${newStartup.name}</strong> was launched in <em>${newStartup.location}</em>. Growth: ${newStartup.growthPotential}%.`,
      "toast-new-company",
      newStartup.logo
    );
    
  }, 45000); // 45 seconds interval
}

// ----------------------------------------------------
// 10. HELPER FUNCTIONS
// ----------------------------------------------------
function showToast(title, message, cssClass = "toast-new-company", icon = "🚀") {
  const id = "toast-" + Date.now();
  const toastHtml = `
    <div class="toast ${cssClass}" id="${id}">
      <span class="toast-icon">${icon}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">✕</button>
    </div>
  `;
  
  elements.toastContainer.insertAdjacentHTML("beforeend", toastHtml);
  
  const toastNode = document.getElementById(id);
  
  // Close button click
  toastNode.querySelector(".toast-close").addEventListener("click", () => {
    toastNode.classList.add("hide");
    setTimeout(() => toastNode.remove(), 300);
  });
  
  // Self destruct toast after 6 seconds
  setTimeout(() => {
    if (toastNode && toastNode.parentNode) {
      toastNode.classList.add("hide");
      setTimeout(() => toastNode.remove(), 300);
    }
  }, 6000);
}

function formatDateLabel(dateString) {
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ----------------------------------------------------
// 11. ATTACH LISTENERS & INITIALIZATION
// ----------------------------------------------------
function initializeApp() {
  
  // Subscribe to auth state changes if Supabase is active
  if (isSupabaseActive()) {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        currentUser = {
          name: session.user.user_metadata.full_name || session.user.email.split('@')[0],
          email: session.user.email,
          isLoggedIn: true
        };
        clearInterval(countdownTimerId);
        elements.lockWarningBanner.classList.add("hidden");
        elements.authModal.classList.add("hidden");
        elements.appContainer.classList.remove("locked");
        
        elements.headerAuthBtn.classList.remove("btn-outline");
        elements.headerAuthBtn.classList.add("btn-primary");
        elements.headerAuthBtn.innerHTML = `<span>👋</span> <span class="btn-text">Log Out (${currentUser.name.split(' ')[0]})</span>`;
      } else {
        currentUser = null;
        elements.headerAuthBtn.classList.add("btn-outline");
        elements.headerAuthBtn.classList.remove("btn-primary");
        elements.headerAuthBtn.innerHTML = `<span class="btn-text">Sign In</span>`;
        
        // If logged out, start countdown
        if (countdownTimerId === null) {
          startAuthenticationCountdown();
        }
      }
    });
  }

  // Set dynamic Sync time in header (simulate daily sync updates)
  if (elements.headerSyncTime) {
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    elements.headerSyncTime.textContent = `Daily Sync: Today (${todayStr})`;
  }

  // A. Initial Load Content
  updateDashboardStats();
  renderStartups();
  
  // B. Authentication Timer trigger
  startAuthenticationCountdown();
  
  // C. Start Live Simulator ticker
  startLiveSimulatedLaunches();
  
  // D. Search input listener
  elements.searchInput.addEventListener("input", (e) => {
    const val = e.target.value;
    activeFilters.search = val;
    
    if (val.trim()) {
      elements.searchClearBtn.classList.remove("hidden");
    } else {
      elements.searchClearBtn.classList.add("hidden");
    }
    
    updateActiveFilterTags();
    renderStartups();
  });
  
  elements.searchClearBtn.addEventListener("click", () => {
    elements.searchInput.value = "";
    activeFilters.search = "";
    elements.searchClearBtn.classList.add("hidden");
    updateActiveFilterTags();
    renderStartups();
  });
  
  elements.resetSearchBtn.addEventListener("click", resetAllFilters);
  elements.clearAllFilters.addEventListener("click", resetAllFilters);
  
  // E. Sort listener
  elements.sortSelect.addEventListener("change", (e) => {
    activeSort = e.target.value;
    renderStartups();
  });
  
  // F. Sidebar Category Filter chips
  const setupSidebarChips = (container, filterName) => {
    container.addEventListener("click", (e) => {
      if (!e.target.classList.contains("filter-chip")) return;
      
      // Toggle active states in chip group
      container.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      e.target.classList.add("active");
      
      activeFilters[filterName] = e.target.getAttribute("data-value");
      updateActiveFilterTags();
      renderStartups();
    });
  };
  
  setupSidebarChips(elements.sectorFilters, "sector");
  setupSidebarChips(elements.growthFilters, "growth");
  setupSidebarChips(elements.riskFilters, "risk");
  setupSidebarChips(elements.hiringFilters, "hiring");
  setupSidebarChips(elements.timeframeFilters, "timeframe");
  
  // G. Sidebar Popular Location Quick links
  elements.locationLinks.addEventListener("click", (e) => {
    if (!e.target.classList.contains("loc-link")) return;
    
    const isAlreadyActive = e.target.classList.contains("text-primary");
    
    elements.locationLinks.querySelectorAll(".loc-link").forEach(l => l.classList.remove("text-primary"));
    
    if (isAlreadyActive) {
      activeFilters.location = "all";
    } else {
      e.target.classList.add("text-primary");
      activeFilters.location = e.target.getAttribute("data-loc");
    }
    
    updateActiveFilterTags();
    renderStartups();
  });
  
  // H. Drawer Details elements
  elements.closeDrawerBtn.addEventListener("click", closeCompanyDetails);
  elements.drawerBackdrop.addEventListener("click", closeCompanyDetails);
  
  // Drawer Tab toggling
  const tabs = document.querySelectorAll(".drawer-tab");
  const panes = document.querySelectorAll(".tab-pane");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));
      
      tab.classList.add("active");
      const targetPaneId = "pane-" + tab.getAttribute("data-tab");
      document.getElementById(targetPaneId).classList.add("active");
    });
  });
  
  // I. Auth Switch buttons
  elements.toLoginBtn.addEventListener("click", () => {
    elements.signupFormContainer.classList.remove("active");
    elements.loginFormContainer.classList.add("active");
  });
  
  elements.toSignupBtn.addEventListener("click", () => {
    elements.loginFormContainer.classList.remove("active");
    elements.signupFormContainer.classList.add("active");
  });
  
  // Form submissions
  elements.signupForm.addEventListener("submit", handleSignUp);
  elements.loginForm.addEventListener("submit", handleLogIn);
  
  // Manual Header Auth trigger (Sign in or Sign out)
  elements.headerAuthBtn.addEventListener("click", () => {
    const isLoggedIn = checkAuthStatus();
    if (isLoggedIn) {
      handleLogout();
    } else {
      // Toggle to manual lock overlay (dismissible in this case or forces login)
      elements.signupFormContainer.classList.add("active");
      elements.loginFormContainer.classList.remove("active");
      elements.authModal.classList.remove("hidden");
      elements.appContainer.classList.add("locked");
    }
  });
  
  // J. Theme toggle listener
  elements.themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
  });

  // K. Visit website button handler (opening real related websites)
  elements.drawerWebsiteBtn.addEventListener("click", () => {
    const url = elements.drawerWebsiteBtn.getAttribute("data-url");
    if (url) {
      showToast("Opening Live Site", `Redirecting to live page: ${url}`, "toast-new-company", "🌐");
      setTimeout(() => {
        window.open(url, "_blank");
      }, 500);
    }
  });

  // L. Policy Modal Handlers (Essential for AdSense policy compliance)
  const policies = {
    about: {
      title: "About Us",
      content: `
        <p><strong>RecentLaunchedCompanies.com</strong> is a premier independent analytics platform dedicated to vetting and analyzing newly launched startups around the globe.</p>
        <p style="margin-top:0.75rem;">Our team of tech analysts, journalists, and market researchers evaluates early-stage ventures launched within the past 1 month. We track their operations, hiring activity, funding rounds, and target regional markets (including tech hubs like Noida in India, San Francisco in the USA, and London in the UK).</p>
        <p style="margin-top:0.75rem;">Through detailed metrics analyzing Growth Potential and Decline Risk ratios, we aim to provide the most genuine, transparent, and vetted insights for investors, job seekers, and partners looking to connect with tomorrow's market leaders today.</p>
      `
    },
    contact: {
      title: "Contact Us",
      content: `
        <p>If you have any questions, feedback, or inquiries regarding our vetting process, featured startups, or advertising, please reach out to our team:</p>
        <div style="margin-top: 1rem; background: var(--bg-input); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
          <p><strong>📧 Email:</strong> support@recentlaunchedcompanies.com</p>
          <p style="margin-top: 0.5rem;"><strong>🏢 Address:</strong> Sector 62, Noida, Uttar Pradesh, 201301, India</p>
        </div>
        <p style="margin-top: 1rem;">We make every effort to respond to all genuine inquiries within 24 to 48 business hours.</p>
      `
    },
    privacy: {
      title: "Privacy Policy",
      content: `
        <p>At RecentLaunchedCompanies.com, accessible from recentlaunchedcompanies.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by RecentLaunchedCompanies.com and how we use it.</p>
        <h4 style="margin-top:1rem; font-weight:700; color:var(--text-main);">Log Files</h4>
        <p>RecentLaunchedCompanies.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
        <h4 style="margin-top:1rem; font-weight:700; color:var(--text-main);">Google DoubleClick DART Cookie</h4>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</p>
        <h4 style="margin-top:1rem; font-weight:700; color:var(--text-main);">Our Advertising Partners</h4>
        <p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Each of our advertising partners has their own Privacy Policy for their policies on user data.</p>
      `
    },
    terms: {
      title: "Terms of Service",
      content: `
        <p>Welcome to RecentLaunchedCompanies.com!</p>
        <p style="margin-top:0.75rem;">These terms and conditions outline the rules and regulations for the use of RecentLaunchedCompanies.com's Website, located at recentlaunchedcompanies.com.</p>
        <p style="margin-top:0.75rem;">By accessing this website we assume you accept these terms and conditions. Do not continue to use RecentLaunchedCompanies.com if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h4 style="margin-top:1rem; font-weight:700; color:var(--text-main);">License</h4>
        <p>Unless otherwise stated, RecentLaunchedCompanies.com and/or its licensors own the intellectual property rights for all material on RecentLaunchedCompanies.com. All intellectual property rights are reserved. You may access this from RecentLaunchedCompanies.com for your own personal use subjected to restrictions set in these terms and conditions.</p>
        <h4 style="margin-top:1rem; font-weight:700; color:var(--text-main);">Disclaimer</h4>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury resulting from negligence, or limit or exclude liability for fraud or fraudulent misrepresentation.</p>
      `
    }
  };

  const openPolicy = (key) => {
    const policy = policies[key];
    if (!policy) return;
    elements.policyModalTitle.textContent = policy.title;
    elements.policyModalBody.innerHTML = policy.content;
    elements.policyModal.classList.remove("hidden");
  };

  const closePolicy = () => {
    elements.policyModal.classList.add("hidden");
  };

  // Bind footer links
  elements.linkAbout.addEventListener("click", (e) => { e.preventDefault(); openPolicy("about"); });
  elements.linkContact.addEventListener("click", (e) => { e.preventDefault(); openPolicy("contact"); });
  elements.linkPrivacy.addEventListener("click", (e) => { e.preventDefault(); openPolicy("privacy"); });
  elements.linkTerms.addEventListener("click", (e) => { e.preventDefault(); openPolicy("terms"); });

  // Close policy modal
  elements.closePolicyBtn.addEventListener("click", closePolicy);
  elements.policyModal.addEventListener("click", (e) => {
    if (e.target === elements.policyModal) closePolicy();
  });
}

function resetAllFilters() {
  activeFilters = {
    search: "",
    sector: "all",
    growth: "all",
    risk: "all",
    location: "all",
    hiring: "all",
    timeframe: "all"
  };
  activeSort = "launchDateDesc";
  
  // Clear input fields
  elements.searchInput.value = "";
  elements.searchClearBtn.classList.add("hidden");
  elements.sortSelect.value = "launchDateDesc";
  
  // Reset UI chips
  document.querySelectorAll(".filter-chip").forEach(c => {
    if (c.getAttribute("data-value") === "all") c.classList.add("active");
    else c.classList.remove("active");
  });
  
  // Reset quick links
  elements.locationLinks.querySelectorAll(".loc-link").forEach(l => l.classList.remove("text-primary"));
  
  updateActiveFilterTags();
  renderStartups();
}

// Run app init on DOM load
window.addEventListener("DOMContentLoaded", initializeApp);
