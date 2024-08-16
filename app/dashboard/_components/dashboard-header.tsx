"use client"

interface DashboardHeaderProps {
  pageTitle: string
  children?: React.ReactNode
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  children,
  pageTitle,
}) => {
  return (
    <aside className="flex items-center gap-3">
      <h1 className="text-xl font-semibold text-foreground mr-auto">
        {pageTitle}
      </h1>
      {children && <div>{children}</div>}
    </aside>
  )
}
export default DashboardHeader
