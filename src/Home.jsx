import monsters from './assets/json/srd_monsters.json';
import encounters from './assets/json/sample_encounters.json';
import characters from './assets/json/sample_characters.json';
import parties from './assets/json/sample_parties.json';

function Home() {
	const clearStorage = () => window.localStorage.clear();

	const seedStorage = () => {
		window.localStorage.clear();

		localStorage.setItem('monsters', JSON.stringify(monsters));
		localStorage.setItem('encounters', JSON.stringify(encounters));
		localStorage.setItem('characters', JSON.stringify(characters));
		localStorage.setItem('parties', JSON.stringify(parties));
	};

	return (
		<>
			<h1>Home</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure provident perspiciatis accusamus sunt maxime
				repellat iste nemo, aliquid neque commodi facere magni voluptate. Sequi, neque?
			</p>

			<div className="flex flex-row w-max gap-2">
				<button onClick={clearStorage}>Clear Local Storage</button>
				<button onClick={seedStorage}>Seed</button>
			</div>
		</>
	);
}

export default Home;
