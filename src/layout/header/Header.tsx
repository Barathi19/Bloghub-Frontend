import Logo from "../../components/logo/Logo";
import Menu from "../../components/menu/Menu";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <Logo />
      <Menu />
    </div>
  );
}
