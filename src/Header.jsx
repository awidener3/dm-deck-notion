import { NavLink } from 'react-router-dom';
import monsters from './assets/json/srd_monsters.json';
import encounters from './assets/json/sample_encounters.json';
import characters from './assets/json/sample_characters.json';
import parties from './assets/json/sample_parties.json';

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

	localStorage.setItem('monsters', JSON.stringify([monsters]));
	localStorage.setItem('encounters', JSON.stringify(encounters));
	localStorage.setItem('characters', JSON.stringify(characters));
	localStorage.setItem('parties', JSON.stringify(parties));
};

const Header = () => (
	<nav className="p-2 w-screen flex justify-between">
		<ul className="flex gap-3">
			{routes.map((route) => (
				<NavLink
					key={route.name}
					to={route.path}
					className={({ isActive }) =>
						isActive ? 'text-[color:var(--text-highlight)] font-bold underline' : undefined
					}
				>
					{route.name}
				</NavLink>
			))}
		</ul>

		<div className="flex flex-row w-max gap-3">
			<a onClick={clearStorage}>empty</a>
			<a onClick={seedStorage}>seed</a>
		</div>
	</nav>
);

export default Header;
