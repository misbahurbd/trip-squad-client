"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { IBuddies } from "@/interface"
import { useState } from "react"
import TripBuddiesCard from "./trip-buddies-card"
import { ScrollArea } from "@/components/ui/scroll-area"

const BuddyDetailsModel = ({
  buddies,
  userId,
}: {
  buddies: IBuddies
  userId: string
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <ScrollArea className="p-3 max-h-[80vh]">
          <TripBuddiesCard
            trip={buddies}
            userId={userId}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
export default BuddyDetailsModel
