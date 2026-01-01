import Wrapper from "@/components/layout/Wrapper";
import { getCurrentUser } from "@/lib/authserver";
import { formatMonthYear } from "@/lib/date";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {itemsData.map((item) => (
              <div key={item.id}>
                <Link
                  href={`/items/${item.id}`}
                  className="space-y-2 flex flex-col hover:underline hover:underline-offset-2 "
                >
                  <div className="relative h-48 md:h-64 w-full">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="rounded-md object-cover"
                    />
                    {/* <p className="absolute text-sm  bottom-0 left-0 pl-2 pb-2">
                  {item.status}
                </p> */}
                  </div>
                  <h2 className="font-bold text-xl">{item.title}</h2>
                  <p className="text-sm text-shadow-muted-foreground font-medium ">
                    {item.description}
                  </p>
                  <footer className="flex flex-col text-sm text-muted-foreground mt-auto">
                    <p>{item.city}</p>
                    <p>{item.status}</p>
                  </footer>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </Wrapper>
    </main>
  );
}
