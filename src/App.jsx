import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Encounters from './Encounters';
import NotFound from './NotFound';
import Header from './Header';
import { characterProps } from './utils/formProperties';
import Form from './components/Form';
import CardView from './CardView';
import CharacterCard from './components/CharacterCard';
import MonsterCard from './components/MonsterCard';
import List from './components/List';

export default function App() {
	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div className="flex flex-1 flex-col overflow-y-auto min-h-min">
				<div className="text-left flex flex-1 flex-col mx-auto w-3/4 max-w-xl">
					<Routes>
						<Route path="/" element={<Home />} />

						<Route path="/characters">
							<Route index element={<Characters />} />
							<Route
								path=":id"
								element={
									<CardView storageKey={'characters'}>
										<CharacterCard />
									</CardView>
								}
							/>
							<Route
								path="new"
								element={<Form storageKey={'characters'} title={'Character'} properties={characterProps} />}
							/>
						</Route>

						<Route path="/encounters" element={<Encounters />} />

						<Route path="/monsters">
							<Route index element={<Monsters />} />
							<Route
								path=":id"
								element={
									<CardView storageKey={'monsters'}>
										<MonsterCard />
									</CardView>
								}
							/>
						</Route>

						<Route path="*" element={<NotFound />}></Route>
					</Routes>
				</div>
			</div>
		</div>
	);
}

const Characters = () => (
	<>
		<List storageKey="characters" title="Characters" isEditable={true} />
	</>
);

const Monsters = () => (
	<>
		<List storageKey="monsters" title="Monsters" />
	</>
);
