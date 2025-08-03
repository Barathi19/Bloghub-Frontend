import { useNavigate } from "react-router-dom";
import "./Logo.css";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate("/")}>
      <span className="logo-bold">Blog</span>
      <span className="logo-light">Hub</span>
    </div>
  );
}
