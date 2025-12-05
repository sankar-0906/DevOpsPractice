import { Link } from "react-router-dom";
import "../style.css";

export default function Landing() {
  return (
    <div className="center">
      <h2>Welcome</h2>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
}
