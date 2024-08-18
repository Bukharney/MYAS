import { Assignment, ClassData } from "@/data/assignment";
import { ParseDate } from "@/lib/utils";

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

export const GroupByClass = (
  data: ClassData[],
  orderBy: string,
  sortBy: string
): ClassData[] => {
  return data.map((course) => {
    const sortedAssignments = [...course.Assignments];
    switch (sortBy) {
      case "Status":
        sortedAssignments.sort((a, b) =>
          a.Submission.localeCompare(b.Submission)
        );
        break;
      case "DueDate":
        sortedAssignments.sort((a, b) => {
          const dateA = ParseDate(a.DueDate);
          const dateB = ParseDate(b.DueDate);
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
};

export const GroupByAssignment = (
  data: ClassData[],
  orderBy: string,
  sortBy: string
): Assignment[] => {
  const Assignments = group(data);
  switch (sortBy) {
    case "Status":
      Assignments.sort((a, b) => a.Submission.localeCompare(b.Submission));
      break;
    case "DueDate":
      Assignments.sort((a, b) => {
        const dateA = ParseDate(a.DueDate);
        const dateB = ParseDate(b.DueDate);
        return dateA.getTime() - dateB.getTime();
      });
      break;
  }

  console.log(orderBy);
  if (orderBy === "Descending") {
    Assignments.reverse();
  }

  return Assignments;
};
