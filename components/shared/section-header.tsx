import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

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
      <h2
        className={cn(
          "text-2xl md:text-3xl font-bold mb-3",
          mode === "light" ? "text-foreground" : "text-background"
        )}
      >
        {title}
      </h2>
      {subTitle && (
        <h4
          className={cn(
            "leading-normal text-sm sm:text-base ",
            mode === "light" ? "text-muted-foreground" : "text-muted"
          )}
        >
          {subTitle}
        </h4>
      )}
    </section>
  )
}

export const SectionHeaderSkeleton = () => {
  return (
    <section
      className={cn(
        "max-w-3xl w-full border mx-auto flex flex-col items-center justify-center"
      )}
    >
      <Skeleton className="w-3/5 h-8 mb-4" />
      <Skeleton className="w-5/6 h-4 mb-2" />
      <Skeleton className="w-3/4 h-4" />
    </section>
  )
}

export default SectionHeader
