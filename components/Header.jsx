import NavBar from "./NavBar";

export default function Header() {
	return (
		<header class="flex gap-8 py-2 px-5 items-center justify-between bg-gray-200">
			<div class="flex gap-8 items-center ">
				<button>Logo</button>
			</div>
			<NavBar />
		</header>
	);
}
