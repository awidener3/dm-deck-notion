import { Route, Routes, Link, NavLink } from 'react-router-dom';
import { TbHome, TbUsers, TbSkull, TbSword } from 'react-icons/tb';
import Characters from './Characters';
import Home from './Home';
import Encounters from './Encounters';
import Monsters from './Monsters';
import Monster from './Monster';
import NotFound from './NotFound';

export default function App() {
	return (
		<>
			<nav className="p-2 w-screen bg-zinc-900">
				<ul className="flex flex-row justify-between gap-2 text-white max-w-sm mx-auto">
					<li>
						<NavLink to="/" className={({ isActive }) => (isActive ? 'text-emerald-600' : 'text-white')}>
							<TbHome size={20} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/characters" className={({ isActive }) => (isActive ? 'text-emerald-600' : 'text-white')}>
							<TbUsers size={20} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/monsters" className={({ isActive }) => (isActive ? 'text-emerald-600' : 'text-white')}>
							<TbSkull size={20} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/encounters" className={({ isActive }) => (isActive ? 'text-emerald-600' : 'text-white')}>
							<TbSword size={20} />
						</NavLink>
					</li>
				</ul>
			</nav>

			<div className="px-4 max-w-lg mx-auto">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/characters" element={<Characters />} />
					<Route path="/encounters" element={<Encounters />} />
					<Route path="/monsters">
						<Route index element={<Monsters />} />
						<Route path=":name" element={<Monster />} />
					</Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</div>
		</>
	);
}
