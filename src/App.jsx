import { Route, Routes, Link } from 'react-router-dom';
import Characters from './Characters';
import Home from './Home';
import Encounters from './Encounters';
import './App.css';

export default function App() {
	return (
		<>
			<nav>
				<ul className="flex flex-row justify-center gap-2">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/characters">Characters</Link>
					</li>
					<li>
						<Link to="/encounters">Encounters</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/characters" element={<Characters />} />
				<Route path="/encounters" element={<Encounters />} />
			</Routes>
		</>
	);
}
