"use client"

import { Button } from "@/components/ui/button"
import { FiFilter } from "react-icons/fi"
import TripAside from "./trip-aside"
import { ITripType } from "@/interface"
import { useEffect, useState } from "react"
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

const MobileTripAside = ({ tripTypes }: { tripTypes: ITripType[] }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size={"icon"}
          className="lg:hidden absolute top-20 left-0 z-10 bg-background hover:bg-secondary rounded-l-none shadow-md"
        >
          <FiFilter />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[520px] max-h-full">
        <ScrollArea>
          <TripAside tripTypes={tripTypes} />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
export default MobileTripAside
