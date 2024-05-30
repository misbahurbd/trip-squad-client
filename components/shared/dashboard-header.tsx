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
    <aside className="px-4 md:py-4 flex items-center bg-secondary md:bg-background gap-2 ">
      <h1 className="text-xl font-semibold mr-auto">{pageTitle}</h1>
      {children && <div>{children}</div>}
    </aside>
  )
}
export default DashboardHeader
