import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subTitle?: string
  align?: "left" | "right" | "center"
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subTitle,
  align = "center",
}) => {
  return (
    <section
      className={cn(
        "max-w-3xl mx-auto",
        align === "center" && "text-center",
        align === "left" && "text-start",
        align === "right" && "text-end"
      )}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl text-foreground font-bold mb-3">
        {title}
      </h2>
      {subTitle && (
        <h4 className="text-muted-foreground leading-normal">{subTitle}</h4>
      )}
    </section>
  )
}
export default SectionHeader
