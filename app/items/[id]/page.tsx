import { notFound } from 'next/navigation';
import { getAllItems, getItemById } from '@/lib/items';
import ItemDetailClient from './ItemDetailClient';

export async function generateStaticParams() {
  const items = getAllItems();
  return items.map((item) => ({
    id: item.id,
  }));
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);

  if (!item) {
    notFound();
  }

  return <ItemDetailClient item={item} />;
}

