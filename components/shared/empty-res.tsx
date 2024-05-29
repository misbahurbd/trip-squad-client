import { IconType } from "react-icons"

interface EmptyResProps {
  icon: IconType
  message: string
}

const EmptyRes: React.FC<EmptyResProps> = ({ icon: Icon, message }) => {
  return (
    <div className="px-5 py-20 bg-background rounded-md flex items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center gap-3">
        <Icon className="text-6xl text-muted-foreground" />
        <p className="text-lg text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  )
}
export default EmptyRes
