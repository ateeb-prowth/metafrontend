// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// export default function Dashboard() {
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const [insights, setInsights] = useState(null);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   // Fetch accounts
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       const res = await axios.get("http://localhost:3000/meta/accounts", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setAccounts(res.data);

//       if (res.data.length > 0) {
//         setSelectedAccount(res.data[0].accountId);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   useEffect(() => {
//     if (!selectedAccount) return;

//     const fetchInsights = async () => {
//       const res = await axios.get(
//         `http://localhost:3000/meta/insights?accountId=${selectedAccount}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       setInsights(res.data.data?.[0]);
//     };

//     fetchInsights();
//   }, [selectedAccount]);

//   const handleConnectMeta = () => {
//     const token = localStorage.getItem("token");
//     window.location.href = `http://localhost:3000/meta/connect?token=${token}`;
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row vh-100">
//         {/* LEFT SIDEBAR */}
//         <div className="col-md-3 bg-light border-end p-4">
//           <h4 className="mb-4">Ad Accounts</h4>

//           {accounts.length === 0 && (
//             <div className="d-flex flex-column gap-2">
//               <h5>Account is not connected!</h5>
//               <button
//                 className="btn btn-primary w-100"
//                 onClick={handleConnectMeta}
//               >
//                 <span>Connect Meta Ads </span>
//               </button>
//             </div>
//           )}

//           <div className="list-group">
//             {accounts.map((acc) => (
//               <button
//                 key={acc.accountId}
//                 className={`list-group-item list-group-item-action ${
//                   selectedAccount === acc.accountId ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedAccount(acc.accountId)}
//               >
//                 {acc.accountId}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="col-md-9 p-4">
//           <h3 className="mb-4">Performance Dashboard</h3>

//           {!insights && <p>Loading insights...</p>}

//           {insights && (
//             <div className="row g-3">
//               <Card title="Impressions" value={insights.impressions} />
//               <Card title="Clicks" value={insights.clicks} />
//               <Card title="Spend" value={`₹${insights.spend}`} />
//               <Card title="CTR" value={`${insights.ctr}%`} />
//               <Card title="CPC" value={`₹${insights.cpc}`} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Card({ title, value }) {
//   return (
//     <div className="col-md-4">
//       <div className="card shadow-sm">
//         <div className="card-body">
//           <h6 className="text-muted">{title}</h6>
//           <h4 className="fw-bold">{value}</h4>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  type Account = {
    accountId: string;
  };
  type Insights = {
    impressions: string;
    clicks: string;
    spend: string;
    ctr: string;
    cpc: string;
  };
  // const [accounts, setAccounts] = useState([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  // const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  // const [insights, setInsights] = useState(null);
  const [insights, setInsights] = useState<Insights | null>(null);

  // const [token, setToken] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      setToken(urlToken);

      window.history.replaceState({}, document.title, "/dashboard");
    } else {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  // useEffect(() => {
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchAccounts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/meta/accounts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setAccounts(res.data);

        if (res.data.length > 0) {
          setSelectedAccount(res.data[0].accountId);
        }
      } catch (err) {
        console.error("Error fetching accounts", err);
      }
    };

    fetchAccounts();
  }, [token]);

  useEffect(() => {
    if (!selectedAccount || !token) return;

    const fetchInsights = async () => {
      const res = await axios.get(
        `http://localhost:3000/meta/insights?accountId=${selectedAccount}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setInsights(res.data.data?.[0]);
    };

    fetchInsights();
  }, [selectedAccount, token]);

  const handleConnectMeta = () => {
    const token = localStorage.getItem("token");
    window.location.href = `http://localhost:3000/meta/connect?token=${token}`;
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-3 bg-light border-end p-4">
          <h4 className="mb-4">Ad Accounts</h4>

          {accounts.length === 0 && (
            <div className="d-flex flex-column gap-2">
              <h5>Account is not connected!</h5>
              <button
                className="btn btn-primary w-100"
                onClick={handleConnectMeta}
                disabled={!token}
              >
                Connect Meta Ads
              </button>
            </div>
          )}

          <div className="list-group">
            {accounts.map((acc) => (
              <button
                key={acc.accountId}
                className={`list-group-item list-group-item-action ${
                  selectedAccount === acc.accountId ? "active" : ""
                }`}
                onClick={() => setSelectedAccount(acc.accountId)}
              >
                {acc.accountId}
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-9 p-4">
          <h3 className="mb-4">Performance Dashboard</h3>

          {!insights ? (
            <p>Loading insights...</p>
          ) : (
            <>
              {insights && (
                <div className="row g-3">
                  <Card
                    title="Impressions"
                    value={insights?.impressions ?? 0}
                  />
                  <Card title="Clicks" value={insights?.clicks ?? 0} />
                  <Card title="Spend" value={`₹${insights?.spend ?? 0}`} />
                  <Card title="CTR" value={`${insights?.ctr ?? 0}%`} />
                  <Card title="CPC" value={`₹${insights?.cpc ?? 0}`} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h6 className="text-muted">{title}</h6>
          <h4 className="fw-bold">{value}</h4>
        </div>
      </div>
    </div>
  );
}
