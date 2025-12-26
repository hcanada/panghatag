import CarouselPhoto from "@/components/items/carousel-items";
import Wrapper from "@/components/layout/Wrapper";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

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
    <main>
      <Wrapper className="max-w-512">
        <div className="grid md:grid-cols-2">
          <CarouselPhoto images={data[0].images} title={data[0].title} />
          <div className="flex flex-col gap-y-2 mt-20 items-center">
            <h1 className="font-bold text-3xl">{data[0].title}</h1>{" "}
            <p className="text-lg">{data[0].description}</p>
            <p className="text-xs">{data[0].city}</p>
            <p className="text-muted-foreground">{data[0].status}</p>
            <Button>Claim</Button>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
