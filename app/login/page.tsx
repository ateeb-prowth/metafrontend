"use client";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth/google`;
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Continue with Google
      </button>
    </div>
  );
}