import Testimonial from '@/models/Testimonial';
import { collectionHandlers } from '@/lib/crud';
import { testimonials as seed } from '@/lib/seed';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({
  Model: Testimonial,
  tags: ['testimonials', 'pages'],
  hasSlug: false,
  seed,
});
export const GET = h.GET;
export const POST = h.POST;
