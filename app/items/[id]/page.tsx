import { notFound } from 'next/navigation';
import { getAllItems, getItemById } from '@/lib/items';
import ItemDetailClient from './ItemDetailClient';

export async function generateStaticParams() {
  const items = getAllItems();
  return items.map((item) => ({
    id: item.id,
  }));
}

export default async function ItemDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const item = getItemById(id);

  if (!item) {
    notFound();
  }

  return <ItemDetailClient item={item} />;
}

