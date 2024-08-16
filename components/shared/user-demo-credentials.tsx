"use client"

import { UseFormReturn } from "react-hook-form"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ScrollArea } from "../ui/scroll-area"

const userCredentials = [
  {
    role: "user",
    username: "misbahurbd",
    password: "Pass@000",
  },
  {
    role: "user",
    username: "emon000",
    password: "Emon@123",
  },
  {
    role: "user",
    username: "joynalabedin",
    password: "Aaaa@1122",
  },
  {
    role: "user",
    username: "mizanur_r",
    password: "Mizanur@2425",
  },
  {
    role: "user",
    username: "rakibul",
    password: "Rakibul@2021",
  },
  {
    role: "admin",
    username: "pxlhut",
    password: "Admin@000",
  },
  {
    role: "admin",
    username: "sumon43",
    password: "Pass@123",
  },
]

const UserDemoAccountCredentials = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="w-full space-y-3">
      <h4 className="font-bold text-center text-foreground">Demo Account</h4>
      <Tabs defaultValue="user">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-32">
          {userCredentials.map((data, idx) => (
            <TabsContent
              value={data.role}
              key={"data" + idx}
              className="px-2 py-1.5 rounded-md bg-secondary"
            >
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <p className="flex items-center gap-2 text-sm">
                    <span>Username:</span>
                    <span>{data.username}</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <span>Password:</span>
                    <span>{data.password}</span>
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => {
                    form.setValue("username", data.username)
                    form.setValue("password", data.password)
                  }}
                >
                  USE
                </Button>
              </div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  )
}
export default UserDemoAccountCredentials
