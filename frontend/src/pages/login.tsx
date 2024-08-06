import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

function Login() {
  return (
    <div className="w-full h-screen flex">
      <main className="flex justify-center items-center  w-full">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please login using LEB2 credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="items-top flex space-x-2">
                  <Checkbox id="save-login" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="save-login"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Keep me logged in
                    </label>
                    <p className="text-xs text-gray-500">
                      We'll remember you for 7 days unless you sign out.
                    </p>
                  </div>
                </div>
                <div className="items-top flex space-x-2">
                  <div className="grid gap-1.5 leading-none">
                    <p className="text-xs">
                      By clicking the login button, you agree to our{" "}
                      <a href="/t&c" className="text-blue-500">
                        Terms and Conditions
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

export default Login;
