import CaseStudy from '@/models/CaseStudy';
import { collectionHandlers } from '@/lib/crud';
import { caseStudies as seed } from '@/lib/seed';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({
  Model: CaseStudy,
  tags: ['case-studies', 'pages'],
  hasSlug: true,
  seed,
});
export const GET = h.GET;
export const POST = h.POST;
