import encounters from '../assets/json/sample_encounters.json';
import characters from '../assets/json/sample_characters.json';
import srdSource from '../assets/json/srd_monsters.json';
import srdSpells from '../assets/json/srd_spells.json';

const Preferences = ({ toggleTheme }) => {
	const clearStorage = () => window.localStorage.clear();

	const seedStorage = () => {
		window.localStorage.clear();

		const sources = [
			{
				source: 'Systems Reference Document',
				abbr: 'srd',
				version: srdSource.version,
			},
		];

		localStorage.setItem('monsters', JSON.stringify(srdSource.monsters));
		localStorage.setItem('sources', JSON.stringify(sources));
		localStorage.setItem('encounters', JSON.stringify(encounters));
		localStorage.setItem('characters', JSON.stringify(characters));
		localStorage.setItem('spells', JSON.stringify(srdSpells.spells));
	};

	return (
		<div className="flex flex-col w-full bg-[var(--bg-secondary)] rounded p-4">
			<div className="pb-1 border-b">
				<h2 className="text-xl text-[color:var(--text-highlight)]">Preferences</h2>
			</div>

			<div className="flex flex-col">
				<button type="button" onClick={clearStorage}>
					Empty local storage
				</button>

				<button type="button" onClick={seedStorage}>
					Seed with defaults
				</button>

				<button type="button" onClick={toggleTheme}>
					Toggle theme
				</button>
			</div>
		</div>
	);
};

export default Preferences;
