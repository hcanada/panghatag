import Wrapper from "@/components/layout/Wrapper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/auth/get-user-server";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import StatusBadge from "@/components/ui/status-badge";
import { MapPin } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ApproveRejectButton from "@/components/claimrequest/approval-button";
type ItemStatus = "available" | "reserved" | "claimed";
type ClaimStatus = "approved" | "rejected" | "pending";

dayjs.extend(relativeTime);
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
export default async function Request({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  const params = await searchParams;
  const status: ClaimStatus =
    params.status === "approved" || params.status === "rejected"
      ? params.status
      : "pending";

  const { data, error } = await supabase
    .from("claims")
    .select("*,items(*)")
    .eq("items.user_id", user.id)
    .eq("status", status)
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
  }

  return (
    <main>
      <Wrapper className="max-w-7xl">
        <div className="my-10">
          <h1 className="font-semibold text-xl">Manage Claims</h1>
          <p className="text-muted-foreground text-sm">
            Review and respond to claim requests
          </p>
        </div>
        <Tabs value={status}>
          <TabsList className="w-full ">
            <TabsTrigger value="pending" asChild>
              <Link href="/requests?status=pending">Pending</Link>
            </TabsTrigger>
            <TabsTrigger value="approved" asChild>
              <Link href="/requests?status=approved">Approved</Link>
            </TabsTrigger>
            <TabsTrigger value="rejected" asChild>
              <Link href="/requests?status=rejected">Rejected</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {data && data.length === 0 && (
          <div className="mt-10">No {status} data</div>
        )}
        {data && (
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {data.map((claim) => {
              return (
                <div key={claim.id}>
                  <Link
                    href={`/items/${claim.items.id}`}
                    className="space-y-2 flex flex-col hover:underline hover:underline-offset-2 "
                  >
                    <div className="relative h-48 md:h-96 w-full">
                      <Image
                        src={claim.items.images[0]}
                        alt={claim.items.title}
                        fill
                        className="rounded-md object-cover"
                      />
                      <StatusBadge
                        status={claim.status}
                        className="absolute top-2 left-2 "
                      />
                      <span
                        className={
                          "absolute top-2 right-2 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium  border bg-white text-black capitalize"
                        }
                      >
                        {claim.items.category}
                      </span>
                    </div>
                    <h2 className="font-bold text-xl">{claim.items.title}</h2>
                    <div className="flex flex-col text-sm text-muted-foreground mt-auto">
                      <div className=" pb-2 flex justify-between  ">
                        <p className="flex items-center gap-x-1">
                          <MapPin size={15} /> {claim.items.barangay},{" "}
                          {claim.items.city}
                        </p>
                        <p>{dayjs(claim.items.created_at).fromNow()}</p>
                      </div>
                    </div>
                  </Link>
                  {claim.status === "pending" && (
                    <ApproveRejectButton data={claim} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Wrapper>
    </main>
  );
}
