import Service from '@/models/Service';
import { collectionHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: Service, tags: ['services', 'pages'], hasSlug: true });
export const GET = h.GET;
export const POST = h.POST;
