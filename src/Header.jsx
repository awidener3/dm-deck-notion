import { NavLink } from 'react-router-dom';
import srdSource from './assets/json/srd_monsters.json';
import encounters from './assets/json/sample_encounters.json';
import characters from './assets/json/sample_characters.json';

const routes = [
	{ name: 'home', path: '/' },
	{
		name: 'characters',
		path: '/characters',
	},
	{
		name: 'monsters',
		path: '/monsters',
	},
	{
		name: 'encounters',
		path: '/encounters',
	},
];

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

const idMonsters = () => {
	const sources = JSON.parse(localStorage.getItem('monsters'));

	sources.forEach((source) => {
		source.monsters.forEach((monster) => {
			monster.id = crypto.randomUUID();
			monster.source = 'mm';
		});
	});

	console.log(sources);
};

const Header = () => (
	<nav className="p-2 w-screen flex justify-between">
		<ul className="flex gap-3">
			{routes.map((route) => (
				<NavLink
					key={route.name}
					to={route.path}
					className={({ isActive }) =>
						isActive ? 'text-[color:var(--text-highlight)] font-bold' : 'text-[color:var(--text-primary)]'
					}
				>
					{route.name}
				</NavLink>
			))}
		</ul>

		<div className="flex flex-row w-max gap-3">
			<a className="text-[color:var(--text-primary)]" onClick={clearStorage}>
				empty
			</a>
			<a className="text-[color:var(--text-primary)]" onClick={seedStorage}>
				seed
			</a>
			<a className="text-[color:var(--text-primary)]" onClick={idMonsters}>
				add id
			</a>
		</div>
	</nav>
);

export default Header;
