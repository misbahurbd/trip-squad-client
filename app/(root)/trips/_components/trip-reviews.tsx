"use client"

import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { CurrentUser, IReview, ITrip } from "@/interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { MdOutlineRateReview } from "react-icons/md"
import { z } from "zod"
import { RatingInput } from "./rating-input"
import FormTextArea from "@/components/form-ui/form-textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { TripReview } from "./trip-review"
import Link from "next/link"

interface TripReviewsProps {
  trip: ITrip
  currentUser: CurrentUser | null
}

const reviewSchema = z.object({
  rating: z.string().min(1, { message: "Rating is required" }),
  content: z
    .string()
    .min(1, "Review content is required")
    .min(90, "Review length must be more then 90 characters")
    .max(160, "Review length can be maximum 160 characters"),
})

const TripReviews: React.FC<TripReviewsProps> = ({ trip, currentUser }) => {
  const [leaveReview, setLeaveReview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: "",
      content: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    setIsLoading(true)
    const toaster = toast.loading("Review submiting...", { id: "login" })
    try {
      const res = await axiosInstance.post(`/trips/${trip.id}/review`, values)
      toast.success(res?.data?.message || "Review posted successfully!", {
        id: toaster,
      })
      form.reset()
      router.refresh()
      if (res.status === 200) {
        setLeaveReview(false)
      }
    } catch (error: any) {
      toast.error(error.message || "Unable to post review", { id: toaster })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-background p-3 space-y-4 rounded-xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-xl">
            Reviews ({trip.reviews.length})
          </h4>
          <Button
            onClick={() => {
              setLeaveReview(true)
              form.setFocus("content")
            }}
            variant={"link"}
            className="p-0 px-2"
          >
            Write a Review
          </Button>
        </div>

        {trip.reviews.length === 0 && (
          <div className="flex flex-col gap-3 items-center justify-center py-8 px-4">
            <MdOutlineRateReview className="size-10 text-primary" />
            <p className="text-muted-foreground text-base">
              This trip has no reviews yet. Be the first one to write a review.
            </p>
          </div>
        )}
        {trip.reviews.map((review: IReview) => (
          <TripReview
            key={trip.id + review.id}
            review={review}
          />
        ))}
      </div>

      {leaveReview && (
        <>
          {!currentUser ? (
            <div className="px-4 py-6 text-center bg-secondary rounded-lg text-muted-foreground">
              <p>
                Please{" "}
                <Link
                  href="/login"
                  className="text-primary"
                >
                  login
                </Link>{" "}
                or{" "}
                <Link
                  href="/register"
                  className="text-primary"
                >
                  Register
                </Link>{" "}
                to leave your review
              </p>
            </div>
          ) : currentUser.role !== "User" ? (
            <div className="px-4 py-6 text-center bg-secondary rounded-lg text-muted-foreground">
              <p>You can't leave reivew as Admin!</p>
            </div>
          ) : currentUser.userId === trip.creatorId ? (
            <div className="px-4 py-6 text-center bg-secondary rounded-lg text-muted-foreground">
              <p>You can't leave reivew on your own trip!</p>
            </div>
          ) : (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold text-xl">Leave a Review</h4>
                <form
                  className="flex flex-col gap-1"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <Form {...form}>
                    <RatingInput
                      form={form}
                      name="rating"
                      label="Overall Rating:"
                      disabled={isLoading}
                    />
                    <FormTextArea
                      form={form}
                      name="content"
                      counter
                      minLength={90}
                      maxLength={160}
                      label="Your review"
                      disabled={isLoading}
                      placeholder="Write your review..."
                    />
                    <Button
                      type="submit"
                      className="self-end"
                    >
                      Submit
                    </Button>
                  </Form>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
export default TripReviews
