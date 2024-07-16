"use client"

import { LuCopy } from "react-icons/lu"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const userCredentials = [
  {
    role: "user",
    username: "misbahurbd",
    password: "Pass@000",
  },
  {
    role: "admin",
    username: "pxlhut",
    password: "Admin@000",
  },
]

const UserDemoAccountCredentials = () => {
  return (
    <div className="w-full space-y-3">
      <h4 className="font-bold text-center">Demo Account</h4>
      <Tabs defaultValue="user">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        {userCredentials.map((data, idx) => (
          <TabsContent
            value={data.role}
            key={"data" + idx}
            className="p-3 rounded-md bg-secondary"
          >
            <p className="flex items-center gap-2 text-sm">
              <span>Username:</span>
              <span>{data.username}</span>
              <Button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(data.username)
                  }
                }}
                size="icon"
                variant="secondary"
                className="size-5"
              >
                <LuCopy />
              </Button>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <span>Password:</span>
              <span>{data.password}</span>
              <Button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(data.password)
                  }
                }}
                size="icon"
                variant="secondary"
                className="size-5"
              >
                <LuCopy />
              </Button>
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
export default UserDemoAccountCredentials
