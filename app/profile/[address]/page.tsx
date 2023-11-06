import { Page } from 'features/profile/components/page';

export default function Home({ params }: { params: { address: string } }) {
  return <Page address={params.address} />;
}
