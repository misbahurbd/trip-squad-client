import Image from "next/image"
import Link from "next/link"

interface TripTypeItemProps {
  tripType: { label: string; count: number }
}

const TripTypeItem: React.FC<TripTypeItemProps> = ({ tripType }) => {
  return (
    <Link href={`/trips?tripType=${tripType.label}`}>
      <div className="px-6 py-8 aspect-[4/3] rounded-2xl shadow-lg transition relative group">
        <div className="absolute w-full h-full inset-0 overflow-hidden rounded-2xl ">
          <Image
            fill
            className="object-cover object-center group-hover:scale-110 transition rounded-2xl duration-500"
            src={`/img/trip-place/${tripType.label
              .replace(" ", "-")
              .toLowerCase()}.jpg`}
            alt={tripType.label}
          />
        </div>
        <span className="absolute rounded-2xl  transition-all w-full h-full left-0 top-0 bg-gradient-to-t from-black/80 to-black/0 to-50%" />
        <div className="absolute w-full left-0 bottom-0 px-5 py-4 space-y-0.5">
          <h3 className="text-white font-semibold">{tripType.label}</h3>
          <p className="text-white/90 text-xs">
            {tripType.count} Trips Available
          </p>
        </div>
      </div>
    </Link>
  )
}
export default TripTypeItem
