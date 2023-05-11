import { Link } from 'react-router-dom';
import encounters from './assets/json/sample_encounters.json';
import characters from './assets/json/sample_characters.json';
import srdSource from './assets/json/srd_monsters.json';

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
	};

	return (
		<>
			<div className="flex justify-between items-center pb-1 border-b">
				<h2 className="text-lg text-[color:var(--text-highlight)]">preferences</h2>
				<Link to={-1}>go back</Link>
			</div>

			<h3 className="mt-4">available preferences</h3>
			<ul>
				<li>
					<button type="button" onClick={clearStorage}>
						empty local storage
					</button>
				</li>
				<li>
					<button type="button" onClick={seedStorage}>
						seed with defaults
					</button>
				</li>
				<li>
					<button type="button" onClick={toggleTheme}>
						toggle theme
					</button>
				</li>
			</ul>

			<h3 className="mt-4">things i want to add...</h3>
			<ul>
				<li>font options to match Notion</li>
				<li>change theme color (default is emerald green)</li>
			</ul>
		</>
	);
};

export default Preferences;
