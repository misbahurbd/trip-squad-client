export interface CurrentUser {
  id: string
  name: string
  username: string
  email: string
  mobile?: string
  emailVerified?: date
  role: "Admin" | "User" | "SuperAdmin"
  status: "Active" | "Deactivated"
  profilePhoto?: string
  dateOfBirth?: date
  bio?: string
  userId?: string
  createdAt: date
  updatedAt: date
}

export interface IProfile {
  id: string
  name: string
  email: string
  mobile: string
  profilePhoto: string
  dateOfBirth: string
  bio: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface ITrip {
  id: string
  destination: string
  description: string
  startDate: Date
  endDate: Date
  tripType: string
  photos: string[]
  budget: number
  isDeleted: boolean
  creatorId: string
  itinerary: string
  location: string
  tripBuddy: ITripBuddy[]
  createdBy: {
    username: string
    email: string
    profile: IProfile
    _count: { trip: number }
  }
  createdAt: string
  updatedAt: string
}

export interface IUser {
  id: string
  name: string
  email: string
  mobile?: string
  profilePhoto?: string
  dateOfBirth?: string
  bio?: string
  createdAt: string
  updatedAt: string
  username: string
  emailVerified: Date
  role: "Admin" | "User"
  status: "Active" | "Blocked"
  isDeleted: boolean
}

export interface ITripType {
  label: string
  count: number
}

export interface ITripBuddy {
  id: string
  tripId: string
  userId: string
  status: "Pending" | "Approved" | "Rejected"
  createdAt: string
  updatedAt: string
}

export interface IBuddyRequest extends ITripBuddy {
  trip: {
    id: string
    destination: string
    description: string
    startDate: string
    endDate: string
    tripType: string
    photos: any[]
    itinerary: string
    location: string
    budget: number
    tripStatus: string
    isDeleted: boolean
    creatorId: string
    createdAt: string
    updatedAt: string
  }
  user: {
    username: string
    profile: IProfile
  }
}
