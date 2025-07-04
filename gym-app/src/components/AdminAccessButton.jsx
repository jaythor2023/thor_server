import { Link } from "react-router-dom";

export default function AdminAccessButton() {
  return (
    <div className="flex justify-center my-8">
      <Link
        to="/admin"
        className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition"
        title="Admin Login"
      >
        Admin Access
      </Link>
    </div>
  );
}
