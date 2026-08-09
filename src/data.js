/**
 * data.js — All site content lives here.
 * Edit this file to update projects, skills, and contact info.
 * Layout code in components does NOT need to change when content changes.
 */

// ---------------------------------------------------------------------------
// PROJECTS
// Each entry: { id, name, oneLiner, description, role, workflow, stack, status, links, externalLinks }
// links: array of { label, href }           — Certificate etc. shown under description
// externalLinks: array of tab-card links    — shown in "Links" tab
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: 'ui-ux-case-study',
    name: 'UI / UX Case Study',
    oneLiner: 'A mobile laundry service app concept with a fully designed UI/UX system.',
    description:
      'A complete UI/UX case study for a mobile laundry service marketplace app — covering user flow, site map, and a fully designed Figma UI system, built using Google Stitch and refined in Figma.',
    role: 'Designer + developer — owns design system, UI structure, and frontend implementation',
    workflow:
      'Sourced UI inspiration from a curated collection of Pinterest references, then described the desired interface to Google Stitch to generate an initial layout. Exported the output into Figma and refined it further — applying Auto Layout, spacing, and component structure to production quality.',
    stack: ['Google Stitch', 'Figma', 'Miro', 'Figma MCP'],
    status: 'Completed',
    links: [
      { label: '[Certificate]', href: 'https://drive.google.com/file/d/1Pvm-rDQ45mqhrl_Kw3DmwkOAE4kjUSO6/view?usp=sharing' },
    ],
    externalLinks: [
      {
        label: 'User Flow & Site Map',
        href: 'https://miro.com/miroverse/laundryease-sitemap-userflow/?social=copy-link',
        platform: 'miro',
        thumbnailKey: 'miro',
      },
      {
        label: 'Figma Community link',
        href: 'https://www.figma.com/community/file/1668355994797358216',
        platform: 'figma',
        thumbnailKey: 'figma',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// SKILLS
// skillGroups — accordion categories with badge/pill items
// ---------------------------------------------------------------------------
export const skillGroups = [
  {
    category: 'Languages',
    items: ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C++'],
  },
  {
    category: 'Frameworks',
    items: ['React', 'Express.js', 'Next.js', 'React Native'],
  },
  {
    category: 'Tools',
    items: ['Figma', 'VS Code', 'Docker', 'Git', 'Github', 'Vercel', 'Supabase'],
  },
  {
    category: 'AI Tools',
    items: ['Antigravity', 'Cursor', 'Google Stitch'],
  },
  {
    category: 'Productivity Tools',
    items: ['Slack', 'Canva', 'Miro', 'Eraser.io', 'Notion', 'Obsidian'],
  },
];

/**
 * currentlyLearning — rendered in its OWN labeled block, completely separate
 * from skillGroups. Never treat these as proficiencies — they are explicitly
 * in-progress. This distinction must be obvious to any reader.
 */
export const currentlyLearning = [
  'TypeScript',
  'Express.js',
  'React',
  'React Native',
  'Next.js',
];

// ---------------------------------------------------------------------------
// CONTACT — real values wired in
// ---------------------------------------------------------------------------
export const contact = {
  email:    'vedantmungapatil@gmail.com',
  github:   'https://github.com/VeDaNt080706',
  linkedin: 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BXblgCQWvRaG8K0Xvmoy6bw%3D%3D',
  instagram: 'https://www.instagram.com/_vedantwhoo/?hl=en',
  phone:    '7507548711',
  resume: null,
};
