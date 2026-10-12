import { useParams } from 'react-router-dom';
import { getCardCollection } from '@/config/collections';
import CollectionPage from '@/pages/CollectionPage';
import CardCollectionPage from '@/pages/CardCollectionPage';
import TokenPage from '@/pages/TokenPage';
import CardTokenPage from '@/pages/CardTokenPage';

/** Card campaigns have their own pages; everything else keeps the original ones. */
export function CollectionRoute() {
  const { contractId } = useParams<{ contractId: string }>();
  return getCardCollection(contractId) ? <CardCollectionPage /> : <CollectionPage />;
}

export function TokenRoute() {
  const { contractId } = useParams<{ contractId: string }>();
  return getCardCollection(contractId) ? <CardTokenPage /> : <TokenPage />;
}
