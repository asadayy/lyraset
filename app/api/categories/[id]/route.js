import Category from '@/models/Category';
import { itemHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = itemHandlers({
  Model: Category,
  tags: ['categories', 'case-studies'],
  hasSlug: true,
  slugSource: 'name',
});
export const GET = h.GET;
export const PUT = h.PUT;
export const DELETE = h.DELETE;
