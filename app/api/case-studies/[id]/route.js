import CaseStudy from '@/models/CaseStudy';
import { itemHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = itemHandlers({ Model: CaseStudy, tags: ['case-studies', 'pages'], hasSlug: true });
export const GET = h.GET;
export const PUT = h.PUT;
export const DELETE = h.DELETE;
