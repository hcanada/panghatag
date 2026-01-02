import Wrapper from "../layout/Wrapper";
import { createClient } from "@/lib/supabase/server";
import ItemsList from "../items/items-list";

type ItemStatus = "available" | "reserved" | "claimed";

interface Item {
  id: number;
  user_id: string;
  title: string;
  description: string;
  category: string;
  images: string;
  barangay: string;
  created_at: Date;
  city: string;
  status: ItemStatus;
}
export default async function Browse() {
  const supabase = await createClient();
  const { data: item, error } = await supabase
    .from("items")
    .select()
    .order("id", { ascending: false })
    .limit(3);
  if (error) {
    console.error("Error fetching data:", error);
  }
  const items = item as Item[];
  return (
    <main className="pb-20">
      <Wrapper>
        <section>
          <div className="text-center space-y-4">
            <p className="font-bold text-xs">Available</p>
            <h1 className="font-bold text-3xl">Recently Shared Items</h1>
            <p className="text-sm text-muted-foreground">
              Discover treasures from your neighbors—all completely free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-pretty">
            <ItemsList data={items} />
          </div>
        </section>
      </Wrapper>
    </main>
  );
}
