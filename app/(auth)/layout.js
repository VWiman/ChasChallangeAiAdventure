import { ApiProvider } from "@/context/ApiContext";
import { LoreProvider } from "@/context/LoreContext";

export default function AuthLayout({ children }) {
  return (
    <ApiProvider>
      <LoreProvider>
        <main className="mycontainer">{children}</main>
      </LoreProvider>
    </ApiProvider>
  );
}
