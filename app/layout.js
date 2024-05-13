import Header from "@/components/header";
import "/styles/globals.css";
import { Grenze, Noto_Sans } from "next/font/google";
import Footer from "@/components/Footer";


const grenze = Grenze({
	subsets: ["latin"],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-grenze',
});

const noto = Noto_Sans ({
	subsets: ["latin"],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-noto',
});

export const metadata = {
	title: "AI Adventure",
	description: "AI adventure website",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${grenze.variable} ${noto.variable} flex flex-col min-h-screen`}>
				<Header />
				<div className="test">
					{children}
				</div>
				<Footer />
			</body>
		</html>
	);
}
