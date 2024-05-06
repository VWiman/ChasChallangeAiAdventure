"use client";

import NavBar from "@/components/NavBar";

export default function CharacterSelect() {
  return (
    <>
      <NavBar />
      <div>
        <h1 className=" text-center font-medium pt-16">Choose your home</h1>

        <div className="  flex gap-4 pt-10 pb-4">
          <div className="bg-gray-100 w-[500px] h-[160px] py-5 text-2xl flex">
            <img
              src="https://garden.spoonflower.com/c/13102732/p/f/l/P9866QbjUtNyuiRFcNc1MUGiWPma_LbN5OFaB2OK9GsDqlAr5eZRvlA/gray%20checkerboard.jpg"
              className=" py-2 px-4 rounded-full"
            ></img>
            <div className="px-4 ">
              <p>Stoneholm</p>
              <p className="text-sm my-2 w-[250px]">
                The crisp mountain air of Stoneholm whispers secrets of
                adventure.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 w-[500px] h-[160px] py-5 text-2xl flex">
            <img
              src="https://garden.spoonflower.com/c/13102732/p/f/l/P9866QbjUtNyuiRFcNc1MUGiWPma_LbN5OFaB2OK9GsDqlAr5eZRvlA/gray%20checkerboard.jpg"
              className="py-2 px-3 rounded-full"
            ></img>
            <div className="px-4 ">
              <p>Pineview</p>
              <p className="text-sm my-2 w-[250px]">
                A tranquil sanctuary nestled within ancient forests.
              </p>
            </div>
          </div>
        </div>
        <div className="  flex gap-4">
          <div className="bg-gray-100 w-[500px] h-[160px] py-5 text-2xl flex">
            <img
              src="https://garden.spoonflower.com/c/13102732/p/f/l/P9866QbjUtNyuiRFcNc1MUGiWPma_LbN5OFaB2OK9GsDqlAr5eZRvlA/gray%20checkerboard.jpg"
              className="py-2 px-3 rounded-full"
            ></img>
            <div className="px-4 ">
              <p>Marinport</p>
              <p className="text-sm my-2 w-[250px]">
                A small harbor perfect for seafaring quests and trading riches.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 w-[500px] h-[160px] py-5 text-2xl flex">
            <img
              src="https://garden.spoonflower.com/c/13102732/p/f/l/P9866QbjUtNyuiRFcNc1MUGiWPma_LbN5OFaB2OK9GsDqlAr5eZRvlA/gray%20checkerboard.jpg"
              className="py-2 px-3 rounded-full"
            ></img>
            <div className="px-4 ">
              <p>Eldorvik</p>
              <p className="text-sm my-2 w-[250px]">
                Nestled amidst mist-shrouded fjords, is a haven where ancient
                magic intertwines with rugged beauty.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center">
        <button class="bg-black text-white px-5 py-2 my-12 hover:bg-text-gray-500">
          Continue
        </button>
      </div>
    </>
  );
}
