import Image from "next/image";
import StatusBadge from "../ui/status-badge";
import { MapPin } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type ItemStatus = "available" | "reserved" | "claimed";

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
export default function ItemsList({ data }: { data: Item[] }) {
  return (
    <>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <Link
              href={`/items/${item.id}`}
              className="space-y-2 flex flex-col hover:underline hover:underline-offset-2 "
            >
              <div className="relative h-48 md:h-96 w-full">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="rounded-md object-cover"
                />
                <StatusBadge
                  status={item.status}
                  className="absolute top-2 left-2 "
                />
                <span
                  className={
                    "absolute top-2 right-2 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium  border bg-white text-black capitalize"
                  }
                >
                  {item.category}
                </span>
              </div>
              <h2 className="font-bold text-xl">{item.title}</h2>
              <div className="flex flex-col text-sm text-muted-foreground mt-auto">
                <div className=" pb-2 flex justify-between  ">
                  <p className="flex items-center gap-x-1">
                    <MapPin size={15} /> {item.barangay}, {item.city}
                  </p>
                  <p>{dayjs(item.created_at).fromNow()}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
