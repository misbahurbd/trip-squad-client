import {
  HiOutlineCog6Tooth,
  HiOutlineComputerDesktop,
  HiOutlineMap,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
} from "react-icons/hi2"

export const getDashboardNav = (pathname: string, role: string) => {
  console.log({ pathname, status: pathname.includes("/trips") })
  const navs = [
    {
      label: "My Trips",
      href: "/dashboard/trips",
      icon: HiOutlineMap,
      active: pathname.includes("/trips"),
      userRole: ["User"],
    },
    {
      label: "Buddy Requests",
      href: "/dashboard/buddy-requests",
      icon: HiOutlineUserPlus,
      active: pathname.includes("/buddy-requests"),
      userRole: ["User"],
    },
    {
      label: "User Management",
      href: "/dashboard/user-management",
      icon: HiOutlineUserGroup,
      active: pathname.includes("/user-management"),
      userRole: ["Admin"],
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: HiOutlineUserCircle,
      active: pathname.includes("/profile"),
      userRole: ["Admin", "SuperAdmin", "User"],
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: HiOutlineCog6Tooth,
      active: pathname.includes("/settings"),
      userRole: ["Admin", "SuperAdmin", "User"],
    },
  ]

  return navs.filter(nav => nav.userRole.includes(role))
}

export const getDesktopNav = (pathname: string) => [
  {
    label: "Home",
    href: "/",
    active: pathname === "/",
  },
  {
    label: "About Us",
    href: "/about-us",
    active: pathname.includes("/about-us"),
  },
  {
    label: "Trips",
    href: "/trips",
    active: pathname.includes("/trips"),
  },
  {
    label: "Contact",
    href: "/contact",
    active: pathname.includes("/contact"),
  },
]

export const travelTripTypes = [
  { label: "Beach", value: "beach" },
  { label: "Adventure", value: "adventure" },
  { label: "Cultural", value: "cultural" },
  { label: "Cruise", value: "cruise" },
  { label: "Nature", value: "nature" },
  { label: "City Tour", value: "city_tour" },
  { label: "Wellness", value: "wellness" },
  { label: "Sports", value: "sports" },
  { label: "Road Trip", value: "road_trip" },
  { label: "Historical", value: "historical" },
  { label: "Safari", value: "safari" },
  { label: "Food and Drink", value: "food_and_drink" },
  { label: "Luxury", value: "luxury" },
  { label: "Ecotourism", value: "ecotourism" },
  { label: "Backpacking", value: "backpacking" },
  { label: "Family", value: "family" },
  { label: "Shopping", value: "shopping" },
  { label: "Photography", value: "photography" },
  { label: "Festivals", value: "festivals" },
  { label: "Winter Sports", value: "winter_sports" },
]

export type TravelTripType = typeof travelTripTypes
