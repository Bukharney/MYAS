import "../index.css";
import { Dot, Home, LogInIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SearchBar from "./searchBar";
import { useEffect, useContext, useState } from "react";
import { ClassData } from "@/data/assignment";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchBarContext } from "@/provider/searchBarProvider";
import { AssignmentsContext } from "@/provider/assignmentsProvider";
import { FilterData } from "@/lib/fillterBy";
import { GroupByAssignment, GroupByClass } from "@/lib/sortBy";
import { Assignment } from "@/data/assignment";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GetAssignments } from "@/api/assignment";
function HomePage() {
  const contextAssignments = useContext(AssignmentsContext);
  if (!contextAssignments) {
    throw new Error("Assignments must be used within a AssignmentsProvider");
  }
  const { assignments, setAssignments } = contextAssignments;

  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("SearchBar must be used within a SearchBarProvider");
  }
  const { sortBy, sortOrder, groupBy, filter } = context;

  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<ClassData[]>([]);
  const [groupedAssignments, setGroupedAssignments] = useState<Assignment[]>(
    []
  );
  const [displayAssignments, setDisplayAssignments] =
    useState<ClassData[]>(assignments);

  useEffect(() => {
    const GetAss = async () => {
      try {
        setLoading(true);
        const ass = await GetAssignments();
        setAssignments(ass);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    GetAss();
  }, [setAssignments]);

  useEffect(() => {
    const filteredData = FilterData(assignments, filter);
    setFilteredData(filteredData);
  }, [assignments, filter]);

  useEffect(() => {
    if (groupBy === "Class") {
      const a = GroupByClass(filteredData, sortOrder, sortBy);
      setDisplayAssignments(a);
    } else {
      const a = GroupByAssignment(filteredData, sortOrder, sortBy);
      setGroupedAssignments(a);
    }
  }, [sortBy, sortOrder, groupBy, filteredData]);

  let i = 0;
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
      <div
        className={`flex min-h-screen w-full flex-col ${
          loading ? "opacity-10" : ""
        }`}
      >
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 justify-between h-full">
            <a
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Home className="h-4 w-4 transition-all group-hover:scale-110" />
            </a>
            <div>
              <div className="py-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {" "}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          window.location.href = "/login";
                        }}
                      >
                        <LogInIcon className="h-6 w-6" />
                        <span className="sr-only">Login</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Login</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ModeToggle />
            </div>
          </nav>
        </aside>
        <div className="sm:pl-14">
          <Card className="p-4 m-4">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Welcome to the dashboard. Here you can view all your
                assignments.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        {assignments.length === 0 ? (
          <div className="flex min-h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-4xl font-semibold">No Assignments Found</h1>
              <p className="text-lg text-center">
                Please try to login again or refresh the page.
              </p>
              <Button onClick={() => (window.location.href = "/login")}>
                Login
              </Button>
            </div>
          </div>
        ) : (
          <div className="sm:pl-14">
            <Card className="m-4">
              <CardContent className="p-0">
                <SearchBar />
                <Table>
                  <TableHeader>
                    <TableRow className="grid grid-cols-6 text-center">
                      <TableHead className="col-span-1 items-center flex">
                        Class
                      </TableHead>
                      <TableHead className="col-span-2 items-center flex">
                        Assignment
                      </TableHead>
                      <TableHead className="col-span-2 items-center flex">
                        DueData
                      </TableHead>
                      <TableHead className="col-span-1 items-center flex">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupBy === "Assignment" ? (
                      <>
                        {groupedAssignments.length === 0 && (
                          <TableRow className="grid grid-cols-6">
                            <TableCell className="col-span-6 text-center">
                              No Assignments
                            </TableCell>
                          </TableRow>
                        )}
                        {groupedAssignments.map(
                          (item, id) => (
                            i++,
                            (
                              <TableRow
                                key={id}
                                className={`grid grid-cols-6 ${
                                  i % 2 === 0 ? " bg-muted" : ""
                                }`}
                              >
                                <TableCell className="col-span-1">
                                  {item.ClassName}
                                </TableCell>
                                <TableCell className="col-span-2">
                                  {item.Name.split("_").join(" ")}
                                </TableCell>
                                <TableCell className="col-span-2">
                                  {item.DueDate}
                                </TableCell>
                                <TableCell className="col-span-1 flex items-center">
                                  <Dot
                                    style={{
                                      filter:
                                        item.Submission === "Submitted"
                                          ? "drop-shadow(0 0 0.2rem #00ff00)"
                                          : item.Submission === "Not Submitted"
                                          ? "drop-shadow(0 0 0.2rem #ff0000)"
                                          : "drop-shadow(0 0 0.2rem #ffff00)",
                                    }}
                                    color={`
                                      ${
                                        item.Submission === "Submitted"
                                          ? "#00ff00"
                                          : item.Submission === "Not Submitted"
                                          ? "#ff0000"
                                          : "#ffff00"
                                      }
                                      `}
                                    size={48}
                                  />
                                  {item.Submission}
                                </TableCell>
                              </TableRow>
                            )
                          )
                        )}
                      </>
                    ) : (
                      <>
                        {displayAssignments.length === 0 && (
                          <TableRow className="grid grid-cols-6">
                            <TableCell className="col-span-6 text-center">
                              No Assignments
                            </TableCell>
                          </TableRow>
                        )}
                        {displayAssignments.map((item) => (
                          <TableRow
                            key={item.ClassName}
                            className="grid grid-cols-6"
                          >
                            <TableCell className="col-span-1 border-r">
                              {item.ClassName}
                            </TableCell>
                            <div className="col-span-5 text-wrap">
                              {item.Assignments.reverse().map(
                                (assignment, id) => (
                                  i++,
                                  (
                                    <TableRow
                                      key={id}
                                      className={`grid grid-cols-5 ${
                                        i % 2 === 0 ? "bg-muted" : ""
                                      }`}
                                    >
                                      <TableCell className="col-span-2">
                                        <span className="text-wrap">
                                          {assignment.Name.split("_").join(" ")}
                                        </span>
                                      </TableCell>
                                      <TableCell className="col-span-2">
                                        {assignment.DueDate}
                                      </TableCell>
                                      <TableCell className="col-span-1 flex items-center">
                                        <Dot
                                          style={{
                                            filter:
                                              assignment.Submission ===
                                              "Submitted"
                                                ? "drop-shadow(0 0 0.2rem #00ff00)"
                                                : assignment.Submission ===
                                                  "Not Submitted"
                                                ? "drop-shadow(0 0 0.2rem #ff0000)"
                                                : "drop-shadow(0 0 0.2rem #ffff00)",
                                          }}
                                          color={`
                                      ${
                                        assignment.Submission === "Submitted"
                                          ? "#00ff00"
                                          : assignment.Submission ===
                                            "Not Submitted"
                                          ? "#ff0000"
                                          : "#ffff00"
                                      }
                                      `}
                                          size={48}
                                        />
                                        {assignment.Submission}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )
                              )}
                            </div>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
