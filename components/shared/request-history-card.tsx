import { IBuddyRequest } from "@/interface"
import { format } from "date-fns"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PiHandshake } from "react-icons/pi"
import avatar from "@/assets/img/avatar.jpeg"

const RequestHistoryCard = ({ request }: { request: IBuddyRequest }) => {
  return (
    <div className="@container/req-history">
      <article className="flex flex-col gap-2 p-3 bg-background rounded-lg overflow-hidden">
        <div className="h-40 w-full relative">
          <Image
            src={request.trip.photos[0]}
            alt={request.trip.destination}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute bg-foreground/30 backdrop-blur-sm w-full h-full top-0 left-0 rounded-lg flex items-center justify-center gap-4">
            <div className="size-20 relative rounded-lg border-2 border-background overflow-hidden">
              <Image
                src={request?.user?.profile?.profilePhoto || avatar}
                fill
                alt={request?.user?.profile?.name}
                className="object-cover"
              />
            </div>
            <PiHandshake className="text-background size-10" />
            <div className="size-20 relative rounded-lg border-2 border-background overflow-hidden">
              <Image
                src={request?.trip?.createdBy?.profile?.profilePhoto || avatar}
                fill
                alt={request?.user?.profile?.name}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="space-y-1 w-full flex items-center gap-3">
          <div className="grow space-y-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground line-clamp-1">
                {request.trip.destination}
              </h2>
              <p className="text-xs text-muted-foreground">
                {request?.trip?.location}
              </p>
            </div>
            <Separator className="opacity-50" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <span className="font-medium">Date:</span>
                  <span>{format(request.trip.startDate, "d MMM")}</span>
                  <Separator className="bg-muted-foreground w-1.5" />
                  <span>{format(request.trip.startDate, "d MMM, yyyy")}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <span className="font-medium">Budget:</span>
                  <span>${request.trip.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <span className="font-medium">Buddy:</span>
                  <span>{request?.trip?.createdBy?.profile?.name}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <span className="font-medium">Update At:</span>
                  <span>{format(request.updatedAt, "d MMM, yyyy")}</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-0.5">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  className="text-xs px-1 py-0.5"
                  variant={
                    request.status === "Approved"
                      ? "active"
                      : request.status === "Pending"
                      ? "pending"
                      : "destructive"
                  }
                >
                  {request.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
export default RequestHistoryCard
