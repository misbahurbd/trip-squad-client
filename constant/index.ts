import {
  HiOutlineCog6Tooth,
  HiOutlineMap,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
} from "react-icons/hi2"
import {
  PiBackpack,
  PiFacebookLogo,
  PiGithubLogo,
  PiHandshake,
  PiInstagramLogo,
  PiLinkedinLogo,
} from "react-icons/pi"

export const getDashboardNav = (pathname: string, role: string) => {
  const navs = [
    {
      label: "My Trips",
      href: "/dashboard/trips",
      icon: HiOutlineMap,
      active: pathname.includes("/trips"),
      userRole: ["User", "Admin"],
    },
    {
      label: "Buddy Requests",
      href: "/dashboard/buddy-requests",
      icon: HiOutlineUserPlus,
      active: pathname.includes("/buddy-requests"),
      userRole: ["User", "Admin"],
    },
    {
      label: "User Management",
      href: "/dashboard/users",
      icon: HiOutlineUserGroup,
      active: pathname.includes("/users"),
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

export const getRootNavlinks = (pathname: string) => [
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

export const howItWorksData = [
  {
    title: "Create an Account",
    subtitle:
      "Sign up with your email and create your profile to join the Trip Squad community.",
    icon: HiOutlineUserPlus,
  },
  {
    title: "Post Your Trip",
    subtitle:
      "Share your trip details including destination, dates, and budget to invite buddies.",
    icon: PiBackpack,
  },
  {
    title: "Find a Buddy",
    subtitle:
      "Browse trips posted by others or wait for requests from potential trip buddies.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Connect & Travel",
    subtitle:
      "Accept requests, chat with your new buddies, and enjoy your adventure together.",
    icon: PiHandshake,
  },
]

export const footerNavs = [
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "Trips",
    href: "/trips",
  },
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

export const footerSocialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/misbahurbd/",
    icon: PiInstagramLogo,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/misbahurbd/",
    icon: PiFacebookLogo,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/misbahurbd/",
    icon: PiLinkedinLogo,
  },
  {
    label: "GitHub",
    href: "https://www.github.com/misbahurbd/",
    icon: PiGithubLogo,
  },
]

export const whyTravelWithUsContent = [
  {
    title: "Explore Endless Possibilities",
    description:
      "Connect with a diverse community of travelers, offering endless opportunities to discover new destinations and experiences.",
  },
  {
    title: "Connect with Like-minded Travelers",
    description:
      "Join a vibrant community of fellow explorers who share your passion for travel. Forge meaningful connections and build lasting friendships.",
  },
  {
    title: "Safety and Security First",
    description:
      "Your safety is our priority. With verified user profiles and secure payment options, explore with peace of mind.",
  },
  {
    title: "Personalized Travel Experiences",
    description:
      "Tailor your travel experiences to suit your unique preferences. With customizable trip options, every journey reflects your style.",
  },
  {
    title: "Access Insider Knowledge",
    description:
      "Gain access to insider tips from experienced travelers. Discover hidden gems and off-the-beaten-path destinations.",
  },
  {
    title: "24/7 Support",
    description:
      "We're here for you every step of the way. Our support team is available 24/7 to assist with trip planning and inquiries.",
  },
]

export type TravelTripType = typeof travelTripTypes
