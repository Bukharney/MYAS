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
import { data, ClassData, Assignment } from "@/data/assignment";

import { SearchBarContext } from "@/provider/SearchBarProvider";
import "../index.css";
import { ModeToggle } from "@/components/mode-toggle";

function HomePage() {
  //set assignments
  const [assignments, setAssignments] = useState<ClassData[]>(data);
  const [groupedAssignments, setGroupedAssignments] = useState<Assignment[]>(
    []
  );
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("SearchBar must be used within a SearchBarProvider");
  }
  const { sortBy, sortOrder, groupBy } = context;

  const parseDate = (dateString: string): Date => {
    if (dateString === "No Due Date") {
      return new Date("December 31, 9999 23:59");
    }
    const date = dateString.split(" at ")[0];
    const time = dateString.split(" at ")[1];
    const month = date.split(" ")[0];
    const day = date.split(" ")[1].split(",")[0];
    const year = date.split(" ")[2];
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    return new Date(
      `${month} ${day}, ${year} ${hours}:${
        minutes.length === 1 ? "0" + minutes : minutes
      }`
    );
  };
  const group = (data: ClassData[]): Assignment[] => {
    const groupedData: Assignment[] = [];
    data.map((course) => {
      course.Assignments.map((assignment) => {
        assignment.ClassName = course.ClassName;
        groupedData.push(assignment);
      });
    });
    return groupedData;
  };

  let i = 0;

  useEffect(() => {
    const sortData = (
      data: ClassData[],
      sortBy: string,
      orderBy: string,
      groupBy: string
    ) => {
      if (groupBy === "Class") {
        const c = data.map((course) => {
          const sortedAssignments = [...course.Assignments];
          switch (sortBy) {
            case "Status":
              sortedAssignments.sort((a, b) =>
                a.Submission.localeCompare(b.Submission)
              );
              break;
            case "DueDate":
              sortedAssignments.sort((a, b) => {
                const dateA = parseDate(a.DueDate);
                const dateB = parseDate(b.DueDate);
                return dateA.getTime() - dateB.getTime();
              });
              break;
          }

          if (orderBy === "Descending") {
            sortedAssignments.reverse();
          }

          return {
            ...course,
            Assignments: sortedAssignments,
          };
        });

        setAssignments(c);
      } else {
        const Assignments = group(data);
        switch (sortBy) {
          case "Status":
            Assignments.sort((a, b) =>
              a.Submission.localeCompare(b.Submission)
            );
            break;
          case "DueDate":
            Assignments.sort((a, b) => {
              const dateA = parseDate(a.DueDate);
              const dateB = parseDate(b.DueDate);
              return dateA.getTime() - dateB.getTime();
            });
            break;
        }

        if (orderBy === "Descending") {
          Assignments.reverse();
        }

        setGroupedAssignments(Assignments);
      }
    };

    sortData(data, sortBy, sortOrder, groupBy);
  }, [sortBy, sortOrder, groupBy]);

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
                            <TableCell className="col-span-1">
                              {item.Submission}
                            </TableCell>
                          </TableRow>
                        )
                      )
                    )}
                  </>
                ) : (
                  <>
                    {assignments.map((item) => (
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
                                  <TableCell className="col-span-1 flex items-center ">
                                    <Dot
                                      style={{
                                        filter:
                                          assignment.Submission === "Submitted"
                                            ? "drop-shadow(0 0 0.5rem #00ff00)"
                                            : assignment.Submission ===
                                              "Not Submitted"
                                            ? "drop-shadow(0 0 0.5rem #ff0000)"
                                            : "drop-shadow(0 0 0.5rem #ffff00)",
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
