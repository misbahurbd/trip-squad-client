import { TableCell, TableRow } from "@/components/ui/table"
import { IBuddies } from "@/interface"
import Image from "next/image"
import avatar from "@/assets/img/avatar.jpeg"
import BuddyDetailsModel from "./buddy-detai-model"

export const BuddyRow = ({
  buddy,
  userId,
}: {
  buddy: IBuddies
  userId: string
}) => {
  return (
    <TableRow key={buddy.id + "-table-cell"}>
      <TableCell
        width={100}
        className="w-28 shrink-0"
      >
        <div className="relative">
          <Image
            src={buddy?.photos[0] || avatar}
            width={100}
            height={100}
            alt={buddy?.destination}
            className="object-cover aspect-[4/3] rounded-md w-full"
          />
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <h5 className="text-base text-foreground font-semibold">
          {buddy?.destination}
        </h5>
        <p className="text-muted-foreground text-sm">{buddy?.location}</p>
      </TableCell>
      <TableCell className="whitespace-nowrap text-muted-foreground">
        {buddy?.tripBuddy.length} trip buddies
      </TableCell>
      <TableCell>
        <BuddyDetailsModel
          buddies={buddy}
          userId={userId}
        />
      </TableCell>
    </TableRow>
  )
}
