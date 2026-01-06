"use client";
import { Button } from "../ui/button";

interface Item {
  id: number;
  city: string;
  title: string;
  images: string[];
  status: string;
  user_id: string;
  barangay: string;
  category: string;
  claimed_by: string | null;
  created_at: string;
  description: string;
}

interface Claim {
  id: number;
  item_id: number;
  user_id: string;
  status: string;
  created_at: string;
  items: Item;
}
interface ApproveRejectButtonProps {
  data: Claim;
}
export default function ApproveRejectButton({
  data,
}: ApproveRejectButtonProps) {
  const handleClick = async (status: string) => {
    const res = await fetch("/api/requestclaim", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: data.id, item_id: data.items.id, status }),
    });
    if (res.ok) console.log("success");
  };
  return (
    <div className="w-full flex gap-4">
      <Button
        className="flex-1 rounded-full"
        onClick={() => handleClick("approved")}
      >
        Approve
      </Button>
      <Button
        className="flex-1 rounded-full"
        onClick={() => handleClick("rejected")}
        variant={"secondary"}
      >
        Reject
      </Button>
    </div>
  );
}
