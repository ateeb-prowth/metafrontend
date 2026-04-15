"use client";

export default function LoginPage() {
  return (
    <div className="container d-flex flex-column align-items-start justify-content-center text-start w-100 p-5 my-5">
      <h2>Data Deletion Instructions</h2>

      <h5>
        If you want to delete your data from our application, please follow
        these steps:
      </h5>
      <p>1. Send an email to: your@email.com</p>
      <p>2. Use subject: "Delete my data"</p>
      <p>3. Include your registered email ID</p>
      <p>OR</p>
      <p>
        You can disconnect Meta from the dashboard, which will remove your
        stored data.
      </p>
      <p>All user data will be deleted within 24 hours.</p>
    </div>
  );
}
