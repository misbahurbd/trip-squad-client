import { teamMembers } from "@/constant"
import SectionHeader from "./section-header"
import Image from "next/image"
import Link from "next/link"
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6"
import { Button } from "../ui/button"

const OurTeam = () => {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Our Team"
        subTitle="Get to know the passionate professionals driving Trip Squad. Our team is dedicated to making your travel experiences unforgettable."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {teamMembers.map(member => (
          <div
            key={member.img}
            className="flex flex-col items-center gap-4 bg-background rounded-xl px-6 py-10"
          >
            <Image
              src={`/img/team/${member.img}`}
              alt={member.name}
              width={200}
              height={200}
              className="aspect-square object-cover rounded-lg w-24 h-24"
            />
            <div className="text-center">
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">
                {member.designation}
              </p>
            </div>
            <ul className="flex items-center justify-center gap-2">
              <li>
                <Button
                  className="w-8 h-8"
                  asChild
                  size="icon"
                  variant="secondary"
                >
                  <Link
                    href={member.facebook}
                    target="_blank"
                  >
                    <FaFacebookF className="size-4" />
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  className="w-8 h-8"
                  asChild
                  size="icon"
                  variant="secondary"
                >
                  <Link
                    href={member.instagram}
                    target="_blank"
                  >
                    <FaInstagram className="size-4" />
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  className="w-8 h-8"
                  asChild
                  size="icon"
                  variant="secondary"
                >
                  <Link
                    href={member.linkedin}
                    target="_blank"
                  >
                    <FaLinkedin className="size-4" />
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  className="w-8 h-8"
                  asChild
                  size="icon"
                  variant="secondary"
                >
                  <Link
                    href={member.github}
                    target="_blank"
                  >
                    <FaGithub className="size-4" />
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
export default OurTeam
