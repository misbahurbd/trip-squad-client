import LottieLoading from "@/components/shared/lottie-loading"

const Loading = () => {
  return (
    <div className="w-full flex-1 min-h-[50vh] flex items-center justify-center flex-col gap-5 bg-secondary">
      {/* <div className="size-8 bg-muted-foreground rounded-sm animate-spin" /> */}
      <LottieLoading />
    </div>
  )
}
export default Loading
