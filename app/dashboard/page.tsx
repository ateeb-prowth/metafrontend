"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchWithAuth } from "../lib/api";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [accounts, setAccounts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
      );
      setUser(data);
    };

    getProfile();
  }, []);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.replace("/dashboard"); // clean URL
    }
  }, []);

  const handleConnectMeta = async () => {
    const token = localStorage.getItem("token");

    window.location.href = `http://localhost:3000/meta/connect?token=${token}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/meta/ad-accounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API RESPONSE:", res.data);

        if (res.data?.data) {
          console.log(res.data.data);
          setAccounts(res.data.data);
        } else {
          setAccounts([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setAccounts([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="p-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {user && (
          <div className="mt-4">
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
          </div>
        )}
      </div>

      <button className="btn" onClick={handleConnectMeta}>Connect Meta Ads</button>

      <div>
        <h1>Ad Accounts</h1>

        {accounts.length === 0 ? (
          <p>No ad accounts found</p>
        ) : (
          accounts.map((acc) => (
            <div key={acc.id}>
              <p>Accoutn id-: {acc.account_id}</p>
              <p>id-: {acc.id}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
