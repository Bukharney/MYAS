import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassData } from "@/data/assignment";
import { CheckedList } from "@/provider/searchBarProvider";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ParseDate = (dateString: string): Date => {
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

export const FilterData = (data: ClassData[], filter: CheckedList) => {
  const filteredData = data.map((course) => {
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

    return {
      ...course,
      Assignments: filteredDueDate,
    };
  });

  filteredData.map((course) => {
    if (course.Assignments.length === 0) {
      course.Assignments.push({
        Name: "No Assignments",
        DueDate: "No Due Date",
        Submission: "Not Submitted",
      });
    }
  });

  return filteredData;
};

export function GetCookie(name: string): string | null {
  console.log(document.cookie);
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
}
