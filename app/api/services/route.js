import Service from '@/models/Service';
import { collectionHandlers } from '@/lib/crud';
import { services as seed } from '@/lib/seed';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: Service, tags: ['services', 'pages'], hasSlug: true, seed });
export const GET = h.GET;
export const POST = h.POST;
