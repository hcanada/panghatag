import { cn } from "@/lib/utils";

type ItemStatus =
  | "available"
  | "reserved"
  | "claimed"
  | "pending"
  | "approved"
  | "rejected";
type StatusType = { status: ItemStatus; className?: string };

const statusStyles: Record<ItemStatus, string> = {
  available: "border-green-400/60 bg-green-400/10 text-green-500",
  reserved: "border-yellow-400/60 bg-yellow-400/10 text-yellow-500",
  claimed: "border-gray-400/60 bg-gray-400/10 text-gray-500",
  approved: "border-green-400/60 bg-green-400/10 text-green-500",
  pending: "border-yellow-400/60 bg-yellow-400/10 text-yellow-500",
  rejected: "border-red-400/60 bg-red-400/10 text-red-500",
};
export default function StatusBadge({ status, className }: StatusType) {
  return (
    <span
      className={cn(
        `flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium backdrop-blur border capitalize ${statusStyles[status]}`,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
