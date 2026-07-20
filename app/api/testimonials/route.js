import Testimonial from '@/models/Testimonial';
import { collectionHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: Testimonial, tags: ['testimonials', 'pages'], hasSlug: false });
export const GET = h.GET;
export const POST = h.POST;
