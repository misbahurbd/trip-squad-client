import { formatNumber } from "@/lib/utils"

export const OverviewCard = ({
  label,
  value,
  currency = false,
}: {
  label: string
  value: number
  currency?: boolean
}) => {
  return (
    <div className="text-center flex flex-col items-center justify-center bg-background px-4 py-6 rounded-md">
      <h3 className="text-foreground font-semibold text-xl">
        {currency && "$"}
        {formatNumber(value || 0)}
      </h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}
