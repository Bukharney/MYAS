const Login = async (username: string, password: string) => {
  console.log(username, password);
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });

  return response;
};

export default Login;
