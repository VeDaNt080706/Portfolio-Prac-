/**
 * data.js — All site content lives here.
 * Edit this file to update projects, skills, hackathons, and contact info.
 * Layout code in components does NOT need to change when content changes.
 */

// ---------------------------------------------------------------------------
// PROJECTS
// Each entry: { id, name, oneLiner, description, role, stack, status, links }
// links: array of { label, href } — use real URLs before going live to judges
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: 'laundryease',
    name: 'LaundryEase',
    oneLiner: 'A mobile laundry service app concept with a fully designed UI/UX system.',
    description:
      'Designed and prototyped a mobile laundry service app, including a complete Figma design system (component library, design tokens, dark/light theme variants). Explored converting Figma designs directly to code using MCP-based tooling in Cursor.',
    role: 'Designer + developer — owns design system, UI structure, and frontend implementation',
    stack: ['Figma', 'React', 'Figma MCP', 'Cursor'],
    // status: "In progress" | "Functional prototype" | "Shipped"
    status: 'In progress',
    links: [
      // TODO: replace href with real GitHub repo URL before going live
      { label: '[GitHub]', href: '#' },
      // TODO: replace href with real Figma file URL before going live
      { label: '[Figma]', href: '#' },
    ],
  },
  {
    id: 'hackathon-chatbot',
    name: 'Hackathon Planning Chatbot',
    oneLiner: 'An AI chatbot that helps hackathon teams stay scoped and on-track during build sprints.',
    description:
      'Built a chatbot using free-tier LLMs (via OpenRouter) with a custom graph-based memory system to track project phase awareness and flag scope creep in real time — a common failure mode in time-boxed hackathons.',
    role: 'Sole builder',
    stack: ['Node.js', 'JSON knowledge graph', 'OpenRouter', 'Gemini 2.0 Flash'],
    status: 'Functional prototype',
    links: [
      // TODO: replace href with real GitHub repo URL before going live
      { label: '[GitHub]', href: '#' },
    ],
  },
  // Slot for a future project — add a third entry here when ready.
  // Copy the shape above, fill in real data, and it will appear automatically.
];

// ---------------------------------------------------------------------------
// SKILLS
// Two separate exports — skillGroups and currentlyLearning are STRUCTURALLY
// distinct and rendered in separate UI blocks. Do not merge them.
// ---------------------------------------------------------------------------

/**
 * skillGroups — things Vedant has actually touched / used in a project.
 * Each group: { category: string, items: string[] }
 * Add a skill ONLY when it has been used in a real project or exercise.
 */
export const skillGroups = [
  {
    category: 'Languages',
    items: ['JavaScript', 'Python', 'Java', 'HTML / CSS'],
  },
  {
    category: 'Frontend',
    items: ['React', 'JavaScript'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Docker (intermediate)', 'AWS basics (EC2, S3)', 'Git / GitHub'],
  },
  {
    category: 'Tools & Workflow',
    items: ['Cursor', 'Claude Code', 'Figma', 'Notion'],
  },
];

/**
 * currentlyLearning — rendered in its OWN labeled block, completely separate
 * from skillGroups. Never treat these as proficiencies — they are explicitly
 * in-progress. This distinction must be obvious to any reader.
 */
export const currentlyLearning = [
  'CI/CD pipelines',
  'Kubernetes fundamentals',
];

// ---------------------------------------------------------------------------
// HACKATHONS
// Each entry: { name, date, built, outcome, projectRef? }
//
// outcome field rules (read this before filling in real data):
//   - Use "Participant" if there was no notable result.
//   - Use "Built [thing] in [timeframe]" to describe the work, not a ranking.
//   - NEVER set outcome to a placement or win that has not been confirmed.
//     Fabricated placements destroy credibility with judges who fact-check.
//   - projectRef is optional — set to a projects[].id to cross-link.
// ---------------------------------------------------------------------------
export const hackathons = [
  {
    name: 'HackXYZ 2025',         // TODO: replace with real event name
    date: 'Month YYYY',           // TODO: fill in actual month and year
    built: 'Hackathon Planning Chatbot',
    outcome: 'Participant',        // Change ONLY if a real, confirmed result exists
    projectRef: 'hackathon-chatbot',
  },
  // Add more entries here — copy the object above and fill in real data.
  // Example shape for a future entry:
  // {
  //   name: 'Real Hackathon Name',
  //   date: 'October 2025',
  //   built: 'What you built',
  //   outcome: 'Participant',  // or e.g. 'Built X in 24 hours' — no fabricated placements
  //   projectRef: 'project-id-if-applicable',
  // },
];

// ---------------------------------------------------------------------------
// CONTACT — real values wired in
// ---------------------------------------------------------------------------
export const contact = {
  email:    'vedantmungapatil@gmail.com',
  github:   'https://github.com/VeDaNt080706',
  linkedin: 'https://linkedin.com/in/vedant',   // TODO: replace with real LinkedIn URL if different
  phone:    '7507548711',
  // Resume: set to a PDF path/URL once resume exists, or leave null to hide the link
  resume: null,
};
