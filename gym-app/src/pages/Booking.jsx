import { useState } from "react";

export default function Booking() {
  const [formData, setFormData] = useState({ name: "", phone: "", date: "" });
  const [loading, setLoading] = useState(false);

  // Update form data on input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Appointment successfully booked!");
        setFormData({ name: "", phone: "", date: "" });
      } else {
        alert("❌ Booking failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("❌ Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue text-white font-sans">
      <main className="px-6 py-10 md:py-16 max-w-3xl mx-auto space-y-10">
        <section className="rounded-2xl shadow-xl border border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-8">
          <h2 className="text-4xl font-extrabold mb-8 text-center tracking-wide">
            Book Your Appointment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full rounded-md border border-gray-700 bg-gray-800 bg-opacity-70 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                required
                className="w-full rounded-md border border-gray-700 bg-gray-800 bg-opacity-70 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold" htmlFor="date">
                Preferred Date
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-700 bg-gray-800 bg-opacity-70 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-400 hover:bg-blue-500 transition-colors duration-300 rounded-md py-3 font-bold text-white"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
