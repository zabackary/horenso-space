import { ListLoading } from "@/components/loading";

export default async function Loading() {
  return <ListLoading withHeading={false} cards={true} />;
}
