interface DeshboardHeaderProps {
  pageTitle: string
  children?: React.ReactNode
}

const DeshboardHeader: React.FC<DeshboardHeaderProps> = ({
  children,
  pageTitle,
}) => {
  return (
    <aside className="py-4 pr-4 flex items-center bg-background gap-4 justify-between">
      <h1 className="text-xl font-semibold">{pageTitle}</h1>
      {children && <div>{children}</div>}
    </aside>
  )
}
export default DeshboardHeader
