import type { ReactElement } from "react";
import "./MainContent.css";

interface MainContentProps {
  children: ReactElement;
}

function MainContent({ children }: MainContentProps) {
  return <div className="main-content">{children}</div>;
}

export default MainContent;
