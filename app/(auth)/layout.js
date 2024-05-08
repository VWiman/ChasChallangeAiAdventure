import { ApiProvider } from "@/context/ApiContext";
import { LoreProvider } from "@/context/LoreContext";

export default function AuthLayout({ children }) {
  return (
    <ApiProvider>
      <LoreProvider>
        <main className="container mx-auto max-w-[1440px] px-3">{children}</main>
      </LoreProvider>
    </ApiProvider>
  );
}
