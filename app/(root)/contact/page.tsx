import ContactUsForm from "@/components/form/contact-us-form"
import SectionHeader from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import contactImage from "@/assets/img/contact-us-img.jpg"

import {
  LuFacebook,
  LuGithub,
  LuInstagram,
  LuLinkedin,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Trip Squad",
  description:
    "Get in touch with Trip Squad for any inquiries or support. Reach out to us through our contact page for prompt assistance and information.",
}

const Contact = () => {
  return (
    <article className="container space-y-12 py-8">
      <section className="space-y-8">
        <SectionHeader
          title="Contact"
          subTitle="Have questions or need assistance? We're here to help! Fill out the form below or contact us directly for prompt support."
        />
        <div className="flex flex-col md:flex-row gap-3 max-w-6xl mx-auto">
          <div className="flex-1 p-8 bg-background rounded-lg relative overflow-hidden">
            <Image
              src={contactImage}
              alt="Contact Image"
              fill
            />
            <span className="absolute w-full h-full left-0 top-0 bg-foreground/60 backdrop-blur-sm" />
            <div className="h-full relative flex flex-col justify-center space-y-8 sm:space-y-12">
              <div>
                <h3 className="font-semibold text-xl text-background">
                  Our Contact Information
                </h3>
                <p className="text-sm text-muted">
                  Reach out to us through any of the following methods. We look
                  forward to hearing from you!
                </p>
              </div>

              <ul className="space-y-2">
                <li>
                  <Link
                    href={"tel:+8801711223344"}
                    className="flex items-center gap-3 text-muted"
                  >
                    <LuMapPin />
                    <span>12/A Raynagar, Sylhet-3100</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"tel:+8801711223344"}
                    className="flex items-center gap-3 text-muted"
                  >
                    <LuPhone />
                    <span>+880 1711-223 344</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"tel:+8801711223344"}
                    className="flex items-center gap-3 text-muted"
                  >
                    <LuMail />
                    <span>contact@tripsquad.vercel.app</span>
                  </Link>
                </li>
              </ul>

              <div className="space-y-1">
                <h2 className="font-medium text-muted">Follow on:</h2>
                <ul className="flex items-center gap-1">
                  <li>
                    <Button
                      size="icon"
                      asChild
                      className="size-7"
                      variant="secondary"
                    >
                      <Link href={"https://www.facebook.com/misbahurbd"}>
                        <LuFacebook className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="icon"
                      asChild
                      className="size-7"
                      variant="secondary"
                    >
                      <Link href={"https://www.instagram.com/misbahurbd"}>
                        <LuInstagram className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="icon"
                      asChild
                      className="size-7"
                      variant="secondary"
                    >
                      <Link href={"https://www.linkedin.com/in/misbahurbd"}>
                        <LuLinkedin className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      size="icon"
                      asChild
                      className="size-7"
                      variant="secondary"
                    >
                      <Link href={"https://www.github.com/misbahurbd"}>
                        <LuGithub className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-background flex-1 p-8 rounded-lg flex flex-col justify-center space-y-8 sm:space-y-12">
            <div>
              <h3 className="font-semibold text-xl">Get In Touch</h3>
              <p className="text-sm text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>
            <ContactUsForm />
          </div>
        </div>
      </section>
    </article>
  )
}
export default Contact
