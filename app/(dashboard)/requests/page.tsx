import ItemsList from "@/components/items/items-list";
import Wrapper from "@/components/layout/Wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/auth/get-user-server";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

type ItemStatus = "available" | "reserved" | "claimed";
type ClaimStatus = "approved" | "rejected" | "pending";

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

  const itemsInClaims: Item[] =
    data?.map((claim) => ({
      ...claim.items,
      status: claim.status, // optional: override or keep item status
    })) ?? [];

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

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <ItemsList data={itemsInClaims} />
        </div>
      </Wrapper>
    </main>
  );
}
