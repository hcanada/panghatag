import CarouselPhoto from "@/components/items/carousel-items";
import ClaimButton from "@/components/items/claim-button";
import { createClient } from "@/lib/supabase/server";

type Item_id = {
  item_id: string;
};
export default async function Item({ params }: { params: Promise<Item_id> }) {
  const supabase = await createClient();
  const { item_id } = await params;
  const { data, error } = await supabase
    .from("items")
    .select()
    .eq("id", item_id);
  if (error) return;
  console.log(data);
  //

  return (
    <main className="h-full min-h-0">
      <div className="grid lg:grid-cols-4 h-full min-h-0">
        <div className="lg:col-span-3  h-full min-h-0 overflow-hidden">
          <CarouselPhoto images={data[0].images} title={data[0].title} />
        </div>
        <div className="flex flex-col gap-y-2 pt-20 px-6 overflow-y-auto bg-gray-800">
          <h1 className="font-bold text-3xl">{data[0].title}</h1>{" "}
          <p className="text-lg">{data[0].description}</p>
          <p className="text-xs">{data[0].city}</p>
          <p className="text-muted-foreground">{data[0].status}</p>
          <ClaimButton />
        </div>
      </div>
    </main>
  );
}
