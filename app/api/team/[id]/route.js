import TeamMember from '@/models/TeamMember';
import { itemHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = itemHandlers({ Model: TeamMember, tags: ['team', 'pages'], hasSlug: false });
export const GET = h.GET;
export const PUT = h.PUT;
export const DELETE = h.DELETE;
