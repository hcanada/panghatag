"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      className="rounded-full w-0 sm:hidden"
      variant={"ghost"}
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-5" />
    </Button>
  );
}
