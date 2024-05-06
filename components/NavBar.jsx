const NavBar = () => {
  return (
    <nav class="flex gap-8 py-2 px-5 items-center justify-between bg-gray-200 ">
      <div class="flex gap-8 items-center ">
        <button>Logo</button>
      </div>

      <div class="flex  space-x-4">
        <button class=" hover:text-gray-500">Link</button>
        <button class=" hover:text-gray-500">Link</button>
        <button class="bg-black text-white px-5 py-2 hover:bg-text-gray-500">
          Play
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
