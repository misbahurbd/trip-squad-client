import {
  HiOutlineCog6Tooth,
  HiOutlineComputerDesktop,
  HiOutlineMap,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
} from "react-icons/hi2"

export const getDeshboardNav = (pathname: string, role: string) => {
  const navs = [
    {
      label: "Deshboard",
      href: "/dashboard",
      active: pathname.startsWith("/dashboard"),
      icon: HiOutlineComputerDesktop,
      userRole: ["Admin", "SuperAdmin", "User"],
    },
    {
      label: "My Trips",
      href: "/trips",
      icon: HiOutlineMap,
      active: pathname.startsWith("/trips"),
      userRole: ["User"],
    },
    {
      label: "Buddy Requests",
      href: "/buddy-requests",
      icon: HiOutlineUserPlus,
      active: pathname.startsWith("/buddy-requests"),
      userRole: ["User"],
    },
    {
      label: "User Management",
      href: "/user-management",
      icon: HiOutlineUserGroup,
      active: pathname.startsWith("/user-management"),
      userRole: ["Admin"],
    },
    {
      label: "Profile",
      href: "/profile",
      icon: HiOutlineUserCircle,
      active: pathname.startsWith("/profile"),
      userRole: ["Admin", "SuperAdmin", "User"],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: HiOutlineCog6Tooth,
      active: pathname.startsWith("/settings"),
      userRole: ["Admin", "SuperAdmin", "User"],
    },
  ]

  return navs.filter(nav => nav.userRole.includes(role))
}

export const travelTripTypes = [
  { label: "City Break", value: "city-break" },
  { label: "Beach Holiday", value: "beach-holiday" },
  { label: "Adventure Travel", value: "adventure-travel" },
  { label: "Cultural Exploration", value: "cultural-exploration" },
  { label: "Road Trip", value: "road-trip" },
  { label: "Cruise", value: "cruise" },
  { label: "Ski Trip", value: "ski-trip" },
  { label: "Backpacking", value: "backpacking" },
  { label: "Safari", value: "safari" },
  { label: "Mountain Trekking", value: "mountain-trekking" },
  { label: "Wellness Retreat", value: "wellness-retreat" },
  { label: "Historical Tour", value: "historical-tour" },
  { label: "Food and Wine Tour", value: "food-and-wine-tour" },
  { label: "Family Vacation", value: "family-vacation" },
  { label: "Solo Travel", value: "solo-travel" },
  { label: "Group Tour", value: "group-tour" },
  { label: "Romantic Getaway", value: "romantic-getaway" },
  { label: "Honeymoon", value: "honeymoon" },
  { label: "Luxury Retreat", value: "luxury-retreat" },
  { label: "Spa Weekend", value: "spa-weekend" },
  { label: "Private Island Escape", value: "private-island-escape" },
  { label: "Castle Stay", value: "castle-stay" },
  { label: "Vineyard Stay", value: "vineyard-stay" },
  { label: "Hot Air Balloon Ride", value: "hot-air-balloon-ride" },
  { label: "Gondola Ride", value: "gondola-ride" },
  { label: "Beachfront Dinner", value: "beachfront-dinner" },
]

export type TravelTripType = typeof travelTripTypes
