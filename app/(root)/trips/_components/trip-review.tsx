import { IReview } from "@/interface"
import Image from "next/image"
import avatar from "@/assets/img/avatar.jpeg"
import { format } from "date-fns"
import { HiOutlineStar, HiStar } from "react-icons/hi2"
import { Separator } from "@/components/ui/separator"

export const TripReview = ({ review }: { review: IReview }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4">
      <Image
        src={review?.user?.profile?.profilePhoto || avatar}
        width={100}
        height={100}
        className="size-12 sm:size-14 md:size-16 object-cover rounded-md"
        alt={review?.user?.profile?.name || "User"}
      />
      <div className="flex-1 isolate bg-secondary p-3 rounded-lg space-y-3 relative before:absolute before:bg-secondary before:size-3 before:left-3 before:top-0 sm:before:left-0 sm:before:top-3 before:-translate-y-1/2 sm:before:translate-y-0 sm:before:-translate-x-1/2 before:rotate-45">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-foreground">
              {review.user.profile.name}
            </h4>
            <p className="text-muted-foreground text-sm">
              {format(review.createdAt, "d MMM, yyyy")}
            </p>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={review.tripId + i}
                className="text-foreground"
              >
                {review.rating > i ? <HiStar /> : <HiOutlineStar />}
              </div>
            ))}
          </div>
        </div>
        <Separator className="bg-border" />
        <p className="text-muted-foreground leading-relaxed">
          {review.content}
        </p>
      </div>
    </div>
  )
}
