import CaseStudy from '@/models/CaseStudy';
import { collectionHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: CaseStudy, tags: ['case-studies', 'pages'], hasSlug: true });
export const GET = h.GET;
export const POST = h.POST;
