import { ScaleLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className="w-full flex-1 min-h-[50vh] flex items-center justify-center flex-col gap-3 bg-secondary">
      <ScaleLoader className="size-10" />
      <p className="text-sm text-center text-muted-foreground">Loading...</p>
    </div>
  )
}
export default Loading
