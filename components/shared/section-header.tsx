import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  className?: string
  subTitle?: string
  mode?: "light" | "dark"
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subTitle,
  className,
  mode = "light",
}) => {
  return (
    <section className={cn("max-w-3xl mx-auto text-center", className)}>
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
      {subTitle && (
        <h4 className="leading-normal text-sm sm:text-base opacity-70">
          {subTitle}
        </h4>
      )}
    </section>
  )
}
export default SectionHeader
