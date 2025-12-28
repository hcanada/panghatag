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
  return Object.keys(images).length > 1 ? (
    <Carousel className="ml-10">
      <CarouselContent>
        {images.map((image, index) => {
          console.log(images);
          console.log(typeof images, "haha");
          console.log(Object.keys(images).length > 1);
          return (
            <CarouselItem className="relative h-screen w-full " key={index}>
              <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center blur-lg "
                style={{ backgroundImage: `url(${image})` }}
              />
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain blur-none"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ) : (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center blur-lg "
        style={{ backgroundImage: `url(${images[0]})` }}
      />
      <Image
        src={images[0]}
        alt={title}
        fill
        className="object-contain blur-none"
      />
    </div>
  );
}
