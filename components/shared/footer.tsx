import { footerNavs, footerSocialLinks } from "@/constant"
import Link from "next/link"
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <footer className="bg-background py-10 pt-20 border-t border-foreground/5">
      <div className="container space-y-6">
        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap align-top gap-x-8 gap-y-10 md:gap-x-20 mb-16">
          <div className="space-y-4 grow w-full md:w-auto">
            <Link
              href={"/"}
              className="text-2xl font-bold mb-6 block"
            >
              Trip Squad
            </Link>
            <p className="text-muted-foreground max-w-md">
              Connect with fellow travelers and explore new destinations. Join
              Trip Squad today and embark on unforgettable journeys.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="w-max">
                <Link
                  className="flex items-center gap-2 transition-all hover:text-primary"
                  href={"tel:+8801853644982"}
                >
                  <HiOutlinePhone />
                  <span>+880 1853-644 982</span>
                </Link>
              </li>
              <li className="w-max">
                <Link
                  className="flex items-center gap-2 transition-all hover:text-primary"
                  href={"mailto:tripsquad@gmail.com"}
                >
                  <HiOutlineEnvelope />
                  <span>tripsquad@gmail.com</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 grow">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="text-muted-foreground space-y-2">
              {footerNavs.map(link => (
                <li key={link.href}>
                  <Link
                    className="transition-all hover:text-primary whitespace-nowrap"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 grow">
            <h3 className="font-bold text-lg">Social Links</h3>
            <ul className="text-muted-foreground space-y-2">
              {footerSocialLinks.map(link => (
                <li key={link.href}>
                  <Link
                    className="transition-all flex items-center gap-2 hover:text-primary whitespace-nowrap"
                    href={link.href}
                  >
                    <link.icon />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator />
        <p className="text-center text-muted-foreground">
          &copy; 2024 Trip Squad | Designed by Misbahur Rahman
        </p>
      </div>
    </footer>
  )
}
export default Footer
