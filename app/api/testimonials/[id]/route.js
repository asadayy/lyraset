import Testimonial from '@/models/Testimonial';
import { itemHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = itemHandlers({ Model: Testimonial, tags: ['testimonials', 'pages'], hasSlug: false });
export const GET = h.GET;
export const PUT = h.PUT;
export const DELETE = h.DELETE;
