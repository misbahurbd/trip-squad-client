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
