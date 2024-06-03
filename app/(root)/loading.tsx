const Loading = () => {
  return (
    <div className="w-full min-h-[50vh] flex-1 flex items-center justify-center flex-col gap-5 bg-secondary">
      <div className="size-8 bg-muted-foreground rounded-sm animate-spin" />
      <p className=" text-center text-muted-foreground">Loading...</p>
    </div>
  )
}
export default Loading
