import Wrapper from "@/components/layout/Wrapper";
import { createClient } from "@/lib/supabase/server";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ItemsList from "@/components/items/items-list";

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

dayjs.extend(relativeTime);

export default async function Items() {
  const supabase = await createClient();
  const { data: item, error: itemError } = await supabase
    .from("items")
    .select()
    .order("id", { ascending: false });

  const items = item as Item[]; // Cast the data to the Item type

  if (itemError) {
    console.error("Error fetching data:", itemError);
  }

  // const { data: profile, error: profileError } = await supabase
  //   .from("profiles")
  //   .select()
  //   .eq("id", items[0].user_id);

  // if (profileError) {
  //   console.error("Error fetching data:", profileError);
  // }
  // const usersMap = profile?.reduce((acc: Record<string, User>, user: User) => {
  //   acc[user.id] = user;
  //   return acc;
  // }, {});

  return (
    <main>
      <Wrapper className="max-w-7xl">
        <h1 className="font-bold text-xl my-6">Todays pick</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ItemsList data={items} />
        </div>
      </Wrapper>
    </main>
  );
}
