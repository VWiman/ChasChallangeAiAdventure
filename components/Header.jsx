import Link from "next/link";
import NavBar from "./NavBar";

export default function Header() {
	return (
		<header className=" bg-bgheader text-white py-3">
			<div className="mycontainer flex gap-8 items-center justify-between">
				<Link href="/">AI Adventure</Link>
				<NavBar />
			</div>
			
		</header>
	);
}