/**
 * data.js — All site content lives here.
 * Edit this file to update projects, skills, and contact info.
 * Layout code in components does NOT need to change when content changes.
 */

// ---------------------------------------------------------------------------
// PROJECTS
// Each entry: { id, name, oneLiner, description, role, stack, status, links }
// links: array of { label, href }
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: 'ui-ux-case-study',
    name: 'UI / UX Case Study',
    oneLiner: 'A mobile laundry service app concept with a fully designed UI/UX system.',
    description:
      'Designed and prototyped a mobile laundry service app, including a complete Figma design system (component library, design tokens, dark/light theme variants). Explored converting Figma designs directly to code using MCP-based tooling in Cursor.',
    role: 'Designer + developer — owns design system, UI structure, and frontend implementation',
    stack: ['Google Stitch', 'Figma', 'Miro', 'Figma MCP'],
    status: 'Completed',
    links: [
      { label: '[GitHub]', href: '#' },
      { label: '[Figma]', href: '#' },
      { label: '[Certificate]', href: 'https://drive.google.com/file/d/1Pvm-rDQ45mqhrl_Kw3DmwkOAE4kjUSO6/view?usp=sharing' },
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
    items: ['Figma', 'VS Code', 'Docker'],
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
