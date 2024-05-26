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
