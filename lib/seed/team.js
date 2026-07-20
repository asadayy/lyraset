/**
 * Seed: team. Individual members + two group cards (Video, Operations),
 * matching the source bios. Photos empty → initials/gradient placeholders.
 */
export const team = [
  {
    name: 'Atta',
    role: 'Founder · Strategy',
    type: 'individual',
    bio: "Founder and head of strategy. Atta spent 6 years inside two of Pakistan's fastest-growing consumer brands before starting LYRASET. He runs every kickoff, signs off on every campaign, and is the person you'll be in Slack with at 11pm. He believes the best strategy is the one the team actually executes.",
    skills: ['Growth Strategy', 'Positioning', 'Client Leadership'],
    order: 1,
    visible: true,
  },
  {
    name: 'Rabia',
    role: 'Head of Brand',
    type: 'individual',
    bio: 'Rabia leads brand and creative. She came up through fashion and lifestyle — she knows what makes a feed feel like a world, not a billboard. She runs the design team, signs off on every campaign visual, and is the reason our work looks the way it does. She also shoots most of our hero photography herself.',
    skills: ['Brand Design', 'Art Direction', 'Photography'],
    order: 2,
    visible: true,
  },
  {
    name: 'Moiz',
    role: 'Performance Lead',
    type: 'individual',
    bio: "Moiz runs paid acquisition. He's managed over $2M in ad spend across Meta, Google, TikTok, and YouTube. He's the person who will tell you the campaign isn't ready, the creative needs one more iteration, and the budget should pause this week. He thinks in ROAS, writes SQL for fun, and is allergic to vanity metrics.",
    skills: ['Paid Media', 'ROAS Optimization', 'Analytics'],
    order: 3,
    visible: true,
  },
  {
    name: 'Ali',
    role: 'Content & SEO',
    type: 'individual',
    bio: "Ali leads content and SEO. He's been writing for the web since before content marketing was a job title. He runs the editorial calendar, owns the keyword strategy, and writes the long-form pieces that earn real links. He reads every brief, edits every draft, and never misses a deadline. Most importantly: he ships.",
    skills: ['SEO', 'Editorial', 'Content Strategy'],
    order: 4,
    visible: true,
  },
  {
    name: 'Video Team',
    role: 'Video Production',
    type: 'group',
    bio: 'Three editors, one cinematographer, one motion designer. They live in Premiere, After Effects, and DaVinci. Reels, YouTube, UGC, ad creative — same team, same weekly cadence. They shoot on Tuesdays, edit Wednesdays–Thursdays, and ship Fridays. We’ve never missed a video deadline in 18 months.',
    skills: ['Editing', 'Motion Design', 'Cinematography'],
    order: 5,
    visible: true,
  },
  {
    name: 'Operations Team',
    role: 'Operations',
    type: 'group',
    bio: "Project managers, account leads, and a finance team. They're the reason your dashboard is updated on Mondays, your invoices arrive on time, and your weekly recap lands in your inbox by 9am. They don't get the bylines, but they make the work possible. Every agency says 'we're client-first.' Ours is.",
    skills: ['Project Management', 'Account Leadership', 'Finance'],
    order: 6,
    visible: true,
  },
];

export default team;
