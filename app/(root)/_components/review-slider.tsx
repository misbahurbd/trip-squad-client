"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import { IReview } from "@/interface"

import "swiper/css"
import "swiper/css/effect-coverflow"
import Image from "next/image"

import avatar from "@/assets/img/avatar.jpeg"
import { format } from "date-fns"
import { HiStar } from "react-icons/hi2"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { CgQuote } from "react-icons/cg"

const ReviewSlider = ({ tripReviewData }: { tripReviewData: IReview[] }) => {
  return (
    <Swiper
      slidesPerView={1}
      grabCursor={true}
      spaceBetween={16}
      autoplay={{
        delay: 2000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      centeredSlides
      loop={true}
      className="relative items-center"
      modules={[Autoplay]}
    >
      {tripReviewData &&
        tripReviewData?.map(review => (
          <SwiperSlide key={review.id}>
            {({ isActive }) => (
              <div
                className={cn(
                  "py-6 px-10 relative rounded-xl text-center space-y-5 border border-border transition bg-background/40",
                  isActive && "bg-background"
                )}
              >
                <CgQuote
                  className={cn(
                    "absolute right-0 size-32 -bottom-12 text-foreground/10",
                    isActive && "text-primary/20"
                  )}
                />
                <CgQuote
                  className={cn(
                    "absolute left-0 size-32 -top-16 text-foreground/10",
                    isActive && "text-primary/20"
                  )}
                />
                <div className="grid place-items-center">
                  <Image
                    src={review?.user?.profile?.profilePhoto || avatar}
                    height={160}
                    width={160}
                    className="size-16 rounded-md object-center object-cover"
                    alt="User photo"
                  />
                </div>
                <div className="flex items-center justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar
                      className={cn(
                        "size-5",
                        review.rating > i
                          ? "text-primary"
                          : "text-muted-foreground/40"
                      )}
                      key={review.id + "-" + i}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review.content}
                </p>
                <Separator className="w-20 mx-auto" />
                <div className="text-center space-y-0.5">
                  <h3 className="text-foreground font-bold text-center">
                    {review.user.profile.name}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center">
                    {format(review.createdAt, "d MMM, yyyy")}
                  </p>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
export default ReviewSlider
