import { axiosInstance } from "@/lib/axios"

export const getTripType = async () => {
  try {
    const tripType = await axiosInstance.get("/trips/top-trip-types")
    return tripType
  } catch (error) {
    return null
  }
}

export const getTrips = async (limit?: number) => {
  try {
    const trips = await axiosInstance.get(
      limit ? `/trips?limit=${limit}` : "/trips"
    )
    return trips
  } catch (error) {
    return null
  }
}

export const getTripsPhoto = async () => {
  try {
    const photos = await axiosInstance.get("/trips/photos")
    return photos
  } catch (error) {
    return null
  }
}
