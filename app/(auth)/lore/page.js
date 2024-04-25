// "use client";
// import { useState, useContext } from 'react';
// import { LoreContext } from '@/context/LoreContext';

// export default function LorePage() {
//     const { setLore } = useContext(LoreContext);
//     const [name, setName] = useState("");
//     const [characterClass, setCharacterClass] = useState("");
//     const [race, setRace] = useState("");
//     const [hometown, setHometown] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setLore({ name, characterClass, race, hometown });
//         // Additional actions after form submission can be handled here
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 placeholder="Name"
//             />
//             <select
//                 value={characterClass}
//                 onChange={e => setCharacterClass(e.target.value)}
//             >
//                 <option value="">Select Class</option>
//                 <option value="warrior">Warrior</option>
//                 <option value="mage">Mage</option>
//                 <option value="ranger">Ranger</option>
//             </select>
//             <input
//                 type="text"
//                 value={race}
//                 onChange={e => setRace(e.target.value)}
//                 placeholder="Race"
//             />
//             <input
//                 type="text"
//                 value={hometown}
//                 onChange={e => setHometown(e.target.value)}
//                 placeholder="Hometown"
//             />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }
