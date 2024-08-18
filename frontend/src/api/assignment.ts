const GetAssignmentsNoLogin = async (username: string, password: string) => {
  const response = await fetch("/api/assignment/no-login", {
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

export default GetAssignmentsNoLogin;
