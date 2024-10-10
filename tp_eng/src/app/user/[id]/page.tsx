import { useParams } from 'next/navigation';

export default function UserPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>User ID: {params.id}</h1>
    </div>
  );
}