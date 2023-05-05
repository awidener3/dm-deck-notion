import { Route, Routes } from 'react-router-dom';
import Characters from './Characters';
import Home from './Home';
import Encounters from './Encounters';
import Monsters from './Monsters';
import Monster from './Monster';
import NotFound from './NotFound';
import Header from './Header';

export default function App() {
	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div className="flex flex-1 flex-col overflow-y-auto min-h-min mx-auto w-3/4 max-w-xl">
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
		</div>
	);
}
