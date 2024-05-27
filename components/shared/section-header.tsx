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
        "max-w-2xl mx-auto space-y-1",
        align === "center" && "text-center",
        align === "left" && "text-start",
        align === "right" && "text-end"
      )}
    >
      <h2 className="text-2xl text-foreground font-bold">{title}</h2>
      {subTitle && <h4 className="text-muted-foreground">{subTitle}</h4>}
    </section>
  )
}
export default SectionHeader
