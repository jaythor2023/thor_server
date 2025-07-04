import { useState, useEffect } from "react";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";  // change as you like

export default function AdminAppointments() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === ADMIN_USERNAME && form.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      fetchBookings();
    } else {
      setError("Invalid username or password");
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    // Login form
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          {error && (
            <p className="text-red-500 text-center font-semibold">{error}</p>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded font-bold"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // After login, show bookings table
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Current Bookings</h1>
      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-700 rounded-lg">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 border border-gray-700">Name</th>
                <th className="p-3 border border-gray-700">Phone</th>
                <th className="p-3 border border-gray-700">Preferred Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(({ id, name, phone, date }) => (
                <tr
                  key={id}
                  className="even:bg-gray-700 odd:bg-gray-800 hover:bg-gray-600"
                >
                  <td className="p-3 border border-gray-700">{name}</td>
                  <td className="p-3 border border-gray-700">{phone}</td>
                  <td className="p-3 border border-gray-700">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
