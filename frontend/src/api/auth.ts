const Login = async (username: string, password: string) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });

  return response;
};

const Logout = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response;
  } else {
    if (response.status === 403) {
      await Refresh().then((response) => {
        if (response.ok) {
          return Logout();
        } else {
          throw new Error("Failed to logout");
        }
      });
    } else {
      throw new Error("Failed to logout");
    }
  }
};

const Refresh = async () => {
  const response = await fetch("/api/auth/refresh-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
  });

  return response;
};

export { Login, Logout, Refresh };
