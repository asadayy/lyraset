import Category from '@/models/Category';
import { collectionHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({
  Model: Category,
  tags: ['categories', 'case-studies'],
  hasSlug: true,
  slugSource: 'name',
});
export const GET = h.GET;
export const POST = h.POST;
