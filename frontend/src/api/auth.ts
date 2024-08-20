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

  return response;
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
