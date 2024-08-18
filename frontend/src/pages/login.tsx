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
import React from "react";
import Login from "@/api/login";
import GetAssignmentsNoLogin from "@/api/assignment";
import { useContext } from "react";
import { AssignmentsContext } from "@/provider/assignmentsProvider";
import "@/index.css";

function LoginPage() {
  const context = useContext(AssignmentsContext);
  if (!context) {
    throw new Error("SearchBar must be used within a SearchBarProvider");
  }

  const { setAssignments } = context;

  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;
    console.log(username, password, checked);

    setLoading(true);
    if (checked) {
      await Login(username, password)
        .then((res) => {
          if (res.ok) {
            console.log("Login successful");
          } else {
            console.log("Login failed");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      GetAssignmentsNoLogin(username, password)
        .then((res) => {
          setAssignments(res);
        })
        .catch((error) => {
          console.error(error);
        });

      setLoading(false);
      window.location.href = "/";
    } else {
      await GetAssignmentsNoLogin(username, password)
        .then((res) => {
          setAssignments(res);
        })
        .catch((error) => {
          console.error(error);
        });

      setLoading(false);
      window.location.href = "/";
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-10 z-50">
          <div className="flex justify-center items-center flex-col">
            <span className="loader"></span>
            <p className="text-l mt-2">Getting your assignments</p>
            <p className="text-s text-gray-400">
              This may take around 1 minute
            </p>
          </div>
        </div>
      )}
      <div className="w-full h-screen flex">
        <main className="flex justify-center items-center  w-full">
          <Card className={`w-96 ${loading ? "opacity-10" : ""}`}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Please login using LEB2 credentials
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
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
                    <Checkbox
                      id="save-login"
                      onCheckedChange={() => setChecked(!checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="savelogin"
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
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </>
  );
}

export default LoginPage;
