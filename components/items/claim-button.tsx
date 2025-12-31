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

export default function ClaimButton() {
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
    console.log("claimed");
  };

  return (
    <>
      <Button onClick={handleClaim} className="w-full">
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
