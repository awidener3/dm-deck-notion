import { NavLink } from 'react-router-dom';

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
	{
		name: 'preferences',
		path: '/preferences',
	},
];

const Header = () => (
	<nav className="p-2 w-screen">
		<ul className="flex gap-3 flex-wrap">
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
	</nav>
);

export default Header;
