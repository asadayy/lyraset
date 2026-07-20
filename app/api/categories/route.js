import Category from '@/models/Category';
import { collectionHandlers } from '@/lib/crud';
import { categories as seed } from '@/lib/seed';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({
  Model: Category,
  tags: ['categories', 'case-studies'],
  hasSlug: true,
  slugSource: 'name',
  seed,
});
export const GET = h.GET;
export const POST = h.POST;
