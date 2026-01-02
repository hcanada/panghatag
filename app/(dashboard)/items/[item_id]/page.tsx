import CarouselPhoto from "@/components/items/carousel-items";
import ClaimButton from "@/components/items/claim-button";
import Wrapper from "@/components/layout/Wrapper";
import SafetyReminder from "@/components/ui/safety-reminder";
import StatusBadge from "@/components/ui/status-badge";
import { createClient } from "@/lib/supabase/server";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MapPin } from "lucide-react";

type Item_id = {
  item_id: string;
};

dayjs.extend(relativeTime);
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
      {/* Page container */}
      <Wrapper className="max-w-360 px-6 py-6 md:py-10">
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {/* LEFT: Images */}
          <div className="h-96">
            <CarouselPhoto images={data[0].images} title={data[0].title} />
          </div>

          {/* RIGHT: Details card */}
          <div>
            <div>
              {/* Title + Status */}
              <div className="flex justify-between gap-4">
                <h1 className="text-2xl font-semibold leading-tight">
                  {data[0].title}
                </h1>
                <StatusBadge status={data[0].status} />
              </div>

              {/* Meta */}
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={15} />
                <span>{data[0].city}</span>
                <span>•</span>
                <span>Posted {dayjs(data[0].created_at).fromNow()}</span>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground ">
                  {data[0].description}
                </p>
              </div>

              {/* Owner card */}
              <div className="mt-6 rounded-lg border -50 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full " />
                  <div>
                    <p className="text-sm font-semibold">Maria Santos</p>
                    <p className="text-xs text-muted-foreground">
                      Member since January 2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Safety reminder */}
              <SafetyReminder />

              {/* Claim section */}
              <div className="mt-6">
                <ClaimButton data={data[0]} />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
