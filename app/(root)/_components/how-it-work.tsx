import SectionHeader from "@/components/shared/section-header"
import { howItWorksData } from "@/constant"

const HowItWork = () => {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="How It Works"
        subTitle="Discover how Trip Squad helps you connect with like-minded travelers and make your dream trips a reality. It's easy and fun!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {howItWorksData.map((howItWork, i) => (
          <div
            className="relative overflow-hidden text-center flex flex-col items-center justify-center px-6 py-10 rounded-lg bg-background isolate group "
            key={howItWork.title + i}
          >
            <span className="absolute transition -z-10 select-none -bottom-5 -right-3 text-8xl font-bold text-foreground/10 group-hover:text-primary/10">{`0${
              i + 1
            }`}</span>
            <span className="text-primary text-5xl mb-6">
              <howItWork.icon />
            </span>
            <h3 className="text-xl text-foreground font-semibold mb-4">
              {howItWork.title}
            </h3>
            <p className="text-muted-foreground leading-normal">
              {howItWork.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
export default HowItWork
