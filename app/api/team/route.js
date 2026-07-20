import TeamMember from '@/models/TeamMember';
import { collectionHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: TeamMember, tags: ['team', 'pages'], hasSlug: false });
export const GET = h.GET;
export const POST = h.POST;
