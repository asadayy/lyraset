import Service from '@/models/Service';
import { itemHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = itemHandlers({ Model: Service, tags: ['services', 'pages'], hasSlug: true });
export const GET = h.GET;
export const PUT = h.PUT;
export const DELETE = h.DELETE;
