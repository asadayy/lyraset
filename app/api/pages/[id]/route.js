import Page from '@/models/Page';
import { itemHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = itemHandlers({ Model: Page, tags: ['pages'], hasSlug: true });
export const GET = h.GET;
export const PUT = h.PUT;
export const DELETE = h.DELETE;
