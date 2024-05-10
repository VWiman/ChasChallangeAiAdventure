import Link from "next/link";


export default function Footer() {
	return (
		<footer className="py-5 mt-8 items-center bg-bgheader text-textcolor font-normal text-sm">
			<div className="mycontainer flex justify-between">
				<div className="items-center">
					<p> 2024 - &copy; AI Adventure</p>
				</div>
				<div className="flex gap-2">
					<Link className="hover:text-primary" href="/">Home</Link>
					<Link className="hover:text-primary" href="/validate">Start Game</Link>
					<Link className="hover:text-primary" href="/">Help</Link>
					<Link className="hover:text-primary" href="/">About</Link>
				</div>
			</div>
		</footer>
	);
}