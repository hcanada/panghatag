"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

type ItemData = {
  id: number;
  user_id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  city: string;
  barangay: string;
  status: string;
  created_at: Date;
  claimed_by: string | null;
};
type ClaimButtonProps = {
  data: ItemData;
};

export default function ClaimButton({ data }: ClaimButtonProps) {
  const supabase = createClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClaim = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      setOpen(true);
      return;
    }

    const res = await fetch("/api/claims", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.id,
        claimed_by: user.id,
      }),
    });
    router.refresh();
  };

  return (
    <>
      <Button
        disabled={data.status !== "available"}
        onClick={handleClaim}
        className="w-full"
      >
        Claim
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to claim this item</DialogTitle>
            <div className="flex gap-x-4">
              <Button
                onClick={() => {
                  setOpen(false);
                  router.push(
                    `/login?redirect=${encodeURIComponent(
                      window.location.pathname
                    )}`
                  );
                }}
                className="flex-1"
              >
                Sign in
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  router.push(
                    `/signup?redirect=${encodeURIComponent(
                      window.location.pathname
                    )}`
                  );
                }}
                className="flex-1"
              >
                Sign up
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
