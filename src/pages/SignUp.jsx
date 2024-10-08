import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  //Reset error sebelum submit
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json(); 
      } catch (jsonError) {
        setLoading(false);
        setError("Terjadi kesalahan saat parsing respons dari server.");
        return;
      }

      console.log(data);

      if (!res.ok) {
        setLoading(false);
        setError(data.message || "Terjadi kesalahan.");
        return;
      }

      setLoading(false);
      setError(null); // Bersihkan error jika signup berhasil
      navigate("/sign-in")
    } catch (error) {
      setLoading(false);
      setError("Terjadi kesalahan: " + error.message);
    }
};


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          type="text"
          className="border p-3 rounded-lg"
          placeholder="Username"
          id="username"
        />
        <input
          onChange={handleChange}
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
          id="email"
        />
        <input
          onChange={handleChange}
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {/* Error display */}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
