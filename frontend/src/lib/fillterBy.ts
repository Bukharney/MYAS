import { ClassData } from "@/data/assignment";
import { CheckedList } from "@/provider/searchBarProvider";

export const FilterData = (data: ClassData[], filter: CheckedList) => {
  const filteredData = data.map((course) => {
    if (filter[course.ClassName] === false) {
      return {
        ...course,
        Assignments: [],
      };
    }

    const filteredAssignments = course.Assignments.filter((assignment) => {
      if (
        filter[
          assignment.Submission == "Late Submitted"
            ? "Late"
            : assignment.Submission == "Submitted"
            ? "Done"
            : "Not"
        ] === false
      ) {
        return false;
      }
      return true;
    });

    const filteredDueDate = filteredAssignments.filter((assignment) => {
      if (filter[assignment.DueDate == "No Due Date" ? "No" : ""] === false) {
        return false;
      }
      return true;
    });

    if (course.Assignments.length === 0) {
      course.Assignments.push({
        Name: "No Assignments",
        DueDate: "No Due Date",
        Submission: "Not Submitted",
      });
    }

    return {
      ...course,
      Assignments: filteredDueDate,
    };
  });

  for (let i = 0; i < filteredData.length; i++) {
    if (filteredData[i].Assignments.length === 0) {
      filteredData.splice(i, 1);
      i--;
    }
  }

  return filteredData;
};
