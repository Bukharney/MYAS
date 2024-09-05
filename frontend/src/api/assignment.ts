import { Refresh } from "./auth";

const GetAssignmentsNoLogin = async (username: string, password: string) => {
  const response = await fetch("/api/v1/assignment/no-login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to get assignments");
  }
};

const GetAssignments = async () => {
  const response = await fetch("/api/v1/assignment/", {
    method: "GET",
  });

  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 403) {
      await Refresh().then((response) => {
        if (response.ok) {
          return GetAssignments();
        } else {
          return false;
        }
      });
    } else {
      throw new Error("Failed to get assignments");
    }
  }
};

export { GetAssignments, GetAssignmentsNoLogin };
