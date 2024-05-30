"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

const TripImgSlide = ({ tripImgs }: { tripImgs: string[] }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  return (
    <div className="flex flex-col md:flex-row-reverse md:h-[500px] gap-2 p-2 rounded-xl bg-background">
      <div className="aspect-video md:aspect-auto grow relative">
        <Image
          src={tripImgs[activeImgIndex]}
          fill
          alt={tripImgs[activeImgIndex]}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-row md:flex-col md:w-[150px] md:shrink-0 lg:w-[180px] gap-2">
        {tripImgs.map((tripImg, i) => (
          <div
            key={i}
            onClick={() => setActiveImgIndex(i)}
            className={cn(
              "relative flex-1 aspect-[4/3] md:w-full rounded-lg overflow-hidden",
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
    </div>
  )
}
export default TripImgSlide
