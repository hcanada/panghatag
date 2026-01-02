import Wrapper from "@/components/layout/Wrapper";
import { getCurrentUser } from "@/lib/authserver";
import { formatMonthYear } from "@/lib/date";
import { createClient } from "@/lib/supabase/server";
import ItemsList from "@/components/items/items-list";

export default async function Profile() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  const [{ data: profileData }, { data: itemsData, error }] = await Promise.all(
    [
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("items").select("*").eq("user_id", user.id),
    ]
  );
  if (error) return;
  return (
    <main>
      <Wrapper className="max-w-7xl mt-10">
        <section className="flex items-center space-x-6 pb-6 md:pb-10 border-b">
          <div className="size-20 md:size-40 bg-amber-400 rounded-full" />
          <div>
            <h2 className="font-semibold text-2xl md:text-3xl">
              {profileData.username}
            </h2>
            <div className="flex space-x-4 text-muted-foreground text-sm md:text-md">
              <p>{profileData.city ?? "Null"}</p>
              <p>Member since {formatMonthYear(profileData.created_at)}</p>
            </div>
          </div>
        </section>
        <section>
          <h1 className="font-semibold text-xl md:text-3xl my-4 md:my-6">
            Items shared
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <ItemsList data={itemsData} />
          </div>
        </section>
      </Wrapper>
    </main>
  );
}
