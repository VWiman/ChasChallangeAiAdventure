import Link from "next/link";


const NavBar = () => {
  return (
		<nav>
			<div className="flex gap-5 items-center">
				<Link className=" hover:text-primary hidden sm:inline-flex" href="/">Home</Link>
				<Link className="button base primary rsm" href="/validate">Start Game</Link>
			</div>
		</nav>
	);
};

export default NavBar;
