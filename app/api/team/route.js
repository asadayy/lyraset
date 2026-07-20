import TeamMember from '@/models/TeamMember';
import { collectionHandlers } from '@/lib/crud';
import { team as seed } from '@/lib/seed';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: TeamMember, tags: ['team', 'pages'], hasSlug: false, seed });
export const GET = h.GET;
export const POST = h.POST;
