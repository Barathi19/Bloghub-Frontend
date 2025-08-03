import type { ReactElement } from "react";
import Header from "./header/Header";
import MainContent from "./mainContent/MainContent";

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <MainContent children={children} />
    </div>
  );
}
