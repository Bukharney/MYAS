import "../index.css";
import { Dot, Home } from "lucide-react";
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
import { ClassData, data } from "@/data/assignment";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchBarContext } from "@/provider/searchBarProvider";
import { AssignmentsContext } from "@/provider/assignmentsProvider";
import { FilterData } from "@/lib/fillterBy";
import { GroupByAssignment, GroupByClass } from "@/lib/sortBy";

function HomePage() {
  const contextAssignments = useContext(AssignmentsContext);
  if (!contextAssignments) {
    throw new Error("Assignments must be used within a AssignmentsProvider");
  }

  const {
    assignments,
    setAssignments,
    groupedAssignments,
    setGroupedAssignments,
  } = contextAssignments;

  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("SearchBar must be used within a SearchBarProvider");
  }

  const { sortBy, sortOrder, groupBy, filter } = context;

  setAssignments(data);

  const [displayAssignments, setDisplayAssignments] =
    useState<ClassData[]>(assignments);

  useEffect(() => {
    const filteredData = FilterData(assignments, filter);
    setDisplayAssignments(filteredData);
  }, [assignments, filter]);

  useEffect(() => {
    if (groupBy === "Class") {
      const a = GroupByClass(displayAssignments, sortOrder, sortBy);
      setDisplayAssignments(a);
    } else {
      const a = GroupByAssignment(displayAssignments, sortOrder, sortBy);
      setGroupedAssignments(a);
    }
  }, [sortBy, sortOrder, groupBy]);

  let i = 0;
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 justify-between h-full">
          <a
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Home className="h-4 w-4 transition-all group-hover:scale-110" />
          </a>
          <ModeToggle />
        </nav>
      </aside>
      <div className="flex-1 sm:pl-14">
        <Card className="p-4 m-4">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Welcome to the dashboard. Here you can view all your assignments.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
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
                                          assignment.Submission === "Submitted"
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
    </div>
  );
}

export default HomePage;
