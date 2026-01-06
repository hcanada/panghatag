import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Handle POST request
  const supabase = await createClient();
  const { id, item_id, status } = await req.json();

  if (status === "approved") {
    const { error } = await supabase.rpc("approve_claim_request", {
      p_claim_id: id,
      p_item_id: item_id,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } else if (status === "rejected") {
    const { error } = await supabase
      .from("claims")
      .update({ status, updated_at: new Date() })
      .eq("id", id)
      .eq("status", "pending")
      .select();

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Unexpected Error" }, { status: 500 });
  }
}
