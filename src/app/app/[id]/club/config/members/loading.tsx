import { ListLoading } from "@/components/loading";
import { Skeleton, TabNav } from "@radix-ui/themes";

export default async function Loading() {
  return (
    <>
      <TabNav.Root>
        <TabNav.Link>
          <Skeleton width="80px" />
        </TabNav.Link>
        <TabNav.Link>
          <Skeleton width="80px" />
        </TabNav.Link>
        <TabNav.Link>
          <Skeleton width="80px" />
        </TabNav.Link>
        <TabNav.Link>
          <Skeleton width="80px" />
        </TabNav.Link>
      </TabNav.Root>
      <ListLoading />
    </>
  );
}
