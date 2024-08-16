import avatar from "@/assets/img/avatar.jpeg"
import Image from "next/image"
import { LuMail, LuPhone } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { FaPhone } from "react-icons/fa"
import Link from "next/link"

const BuddiesInfoCard = ({
  name,
  profilePhoto,
  email,
  mobile,
}: {
  name: string
  profilePhoto: string
  email: string
  mobile?: string
}) => {
  return (
    <div className="flex items-center gap-3 h-12">
      <div className="h-12 group aspect-square relative">
        <Image
          src={profilePhoto || avatar}
          fill
          alt={name}
          className="rounded-lg object-cover"
        />
        <span className="text-xs bg-background text-muted-foreground py-0.5 px-1 rounded text-center shadow absolute top-0 left-1/2 -translate-x-1/2 z-10 -translate-y-[90%] opacity-0 invisible transition group-hover:opacity-100 group-hover:-translate-y-[110%] group-hover:visible">
          {name}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-foreground">{name}</h4>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <LuMail className="size-3" /> {email}
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <LuPhone className="size-3" /> {mobile}
        </p>
      </div>
      <Button
        size="icon"
        variant="outline"
        asChild
      >
        <Link href={`tel:${mobile}`}>
          <FaPhone className="text-muted-foreground" />
        </Link>
      </Button>
    </div>
  )
}
export default BuddiesInfoCard
