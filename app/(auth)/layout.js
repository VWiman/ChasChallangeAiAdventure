import { ApiProvider } from "@/context/ApiContext";

export default function AuthLayout({ children }) {
	return (
		<ApiProvider>
			<main>{children}</main>
		</ApiProvider>
	);
}
