import { Route, Routes } from 'react-router-dom';
import Home from './Home';
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
						{/* Home route */}
						<Route path="/" element={<Home />} />

						{/* Character routes */}
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

						{/* Encounter routes */}
						<Route path="/encounters">
							<Route index element={<Encounters />} />
							<Route path="new" element={<Form storageKey={'encounters'} title={'Encounter'} properties={[]} />} />
							<Route
								path=":id"
								element={
									<CardView storageKey={'encounters'}>
										<h1>Encounter here</h1>
									</CardView>
								}
							/>
						</Route>

						{/* Monster routes */}
						<Route path="/monsters">
							<Route index element={<Monsters />} />
							<Route path="new" element={<Form storageKey={'monsters'} title={'Monster'} properties={[]} />} />
							<Route
								path=":id"
								element={
									<CardView storageKey={'monsters'}>
										<MonsterCard />
									</CardView>
								}
							/>
						</Route>

						{/* Error routes */}
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

const Encounters = () => (
	<>
		<List storageKey="encounters" title="Encounters" />
	</>
);
