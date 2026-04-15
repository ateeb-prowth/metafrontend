"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  // const [token, setToken] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const route = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    // route.refresh();
    window.location.reload();
  };
  return (
    <div className="container my-4 d-flex flex-column">
      <h1>Meta ads Performance</h1>
      {token ? (
        <button
          className="btn btn-success w-25"
          onClick={() => route.push("/dashboard")}
        >
          Go to Dashboard
        </button>
      ) : (
        <button
          className="btn btn-primary w-25"
          onClick={() => route.push("/login")}
        >
          Login
        </button>
      )}{" "}
      <button className="btn btn-danger mt-4 w-25" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
