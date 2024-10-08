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
  address?: string
  city?: string
  country?: string
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
  createdAt: Date
  updatedAt: Date
}

export interface IReview {
  id: string
  content: string
  rating: number
  tripId: string
  trip: ITrip
  userId: string
  user: {
    profile: IProfile
  }
  createdAt: Date
  updatedAt: Date
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
  tripBuddy: {
    email: string
    mobile: string
    name: string
    createdAt: Date
    id: string
    status: "Approved" | "Rejected" | "Pending"
    tripId: string
    updatedAt: Date
    user: {
      profile: IProfile
    }
    userId: string
  }[]
  createdBy: {
    username: string
    email: string
    profile: IProfile
    _count: { trip: number }
  }
  reviews: IReview[]
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
  name: string
  email: string
  mobile: string
  address: string
  city: string
  country: string
  status: "Pending" | "Approved" | "Rejected"
  createdAt: string
  updatedAt: string
  user: {
    profile: IProfile
  }
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
    createdBy: {
      profile: IProfile
    }
    createdAt: string
    updatedAt: string
  }
  user: {
    username: string
    profile: IProfile
  }
}

export interface ITripWithBuddy extends ITrip {
  tripBuddy: {
    user: {
      profile: IProfile
    }
  }[]
  createdBy: {
    user: {
      profile: IProfile
    }
  }
}

export interface IBuddies {
  id: string
  photos: string[]
  destination: string
  startDate: string
  endDate: string
  location: string
  tripBuddy: ITripBuddy[]
  createdBy: {
    profile: IProfile
  }
}

export interface IReview {
  id: string
  content: string
  rating: number
  tripId: string
  userId: string
  parentId: string | null
  createdAt: string
  updatedAt: string
  user: {
    profile: IProfile
  }
}
