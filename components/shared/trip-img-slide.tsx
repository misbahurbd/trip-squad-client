"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

const TripImgSlide = ({ tripImgs }: { tripImgs: string[] }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  return (
    <div className="flex gap-3 p-3 rounded-xl bg-background">
      <div className="flex flex-col gap-3 h-[500px]">
        {tripImgs.map((tripImg, i) => (
          <div
            key={i}
            onClick={() => setActiveImgIndex(i)}
            className={cn(
              "relative h-32 grow aspect-[5/3] rounded-lg overflow-hidden",
              activeImgIndex !== i && "cursor-pointer"
            )}
          >
            <Image
              src={tripImg}
              fill
              alt={"Trip Photo"}
              className="object-cover"
            />
            <span
              className={cn(
                "absolute transition w-full h-full left-0 top-0 right-0 bottom-0 bg-background/40",
                activeImgIndex !== i && "bg-background/0"
              )}
            />
          </div>
        ))}
      </div>

      <div className="grow relative">
        <Image
          src={tripImgs[activeImgIndex]}
          fill
          alt={tripImgs[activeImgIndex]}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
    // <div className="grid grid-cols-3 gap-3 rounded-2xl bg-background p-3">
    //   {tripData.photos.map((photo, i) => (
    //     <div
    //       key={i}
    //       className={cn(
    //         "relative aspect-[5/2] rounded-lg overflow-hidden",
    //         i === 0 && "col-span-3"
    //       )}
    //     >
    //       <Image
    //         src={photo}
    //         fill
    //         alt={tripData.destination}
    //       />
    //     </div>
    //   ))}
    // </div>
  )
}
export default TripImgSlide
