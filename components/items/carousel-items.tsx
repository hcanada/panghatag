import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
interface CarouselPhotoProps {
  images: string[];
  title: string;
}

export default function CarouselPhoto({ images, title }: CarouselPhotoProps) {
  return (
    <div className="h-full min-h-0">
      <Carousel className=" h-full">
        <CarouselContent className="h-full">
          {images.map((image, index) => {
            return (
              <CarouselItem className="relative h-full" key={index}>
                <div
                  className="absolute inset-0 bg-no-repeat bg-cover bg-center blur-lg"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious
              className="absolute left-4 size-10 "
              variant={"secondary"}
            />
            <CarouselNext
              className="absolute right-4 size-10"
              variant={"secondary"}
            />
          </>
        )}
      </Carousel>
    </div>
  );
}
