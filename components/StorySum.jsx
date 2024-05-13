
const stories = [
  {
    name: "Kjell",
    race: "Human",
    class: "Ranger",
    town: "Marinport",
    story: "As dawn broke over Marinport, Kjell, the human ranger, inhaled the briny air that heralded the start of a day ripe with potential. The bustling harbor town, with its symphony of seagulls and clanging ship bells, was a cradle of adventure, and today it whispered promises of a defining quest for Kjell."
  },
    {
    name: "Jorgen",
    race: "Elf",
    class: "Warrior",
    town: "Stoneholm",
    story: "In the high mountain town of Stoneholm, where the air whispered of ancient secrets and untold adventures, there lived an elf warrior named Jorgen. His heart was as steadfast as the towering peaks that cradled his home, and his sword had sung through the air in many a practice fight, eager for a true test of its mettle."
  },
  {
    name: "Haldor",
    race: "Half-elf",
    class: "Mage",
    town: "Pineview",
    story: "In the high mountain town of Stoneholm, where the air whispered of ancient secrets and untold adventures, there lived an elf warrior named Jorgen. His heart was as steadfast as the towering peaks that cradled his home, and his sword had sung through the air in many a practice fight, eager for a true test of its mettle."
  },
  {
    name: "Ivarr",
    race: "Dwarf",
    class: "Druid",
    town: "Eldorvik",
    story: "In the mist-shrouded town of Eldorvik, nestled among the ancient fjords, Ivarr the Dwarf Druid awoke to a day unlike any other. The scent of pine and the distant sound of waves stirred a deep yearning within him—a call to the wild that could not be ignored. As the first light of dawn kissed the dewy rooftops of his hometown, Ivarr knew that the sacred grove, the Whispering Thicket, beckoned to him."
  },
];

const StorySum = () => {
  return (
    <div className="mycontainer">
      
      <div className="cards grid gap-4 sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-1">
        {stories.map((story, index) => (
              
                <div key={index} className="hcard bg-cardbg">
                <h4 className="font-bold text-2xl text-primary">{story.name}'s Adventure</h4>
                <div className="flex py-2">Race: {story.race} | Class: {story.class} | Town: {story.town}</div>
                    <p>{story.story}...</p>
                </div>
            ))}
      </div>

      </div>
    );
}

export default StorySum;