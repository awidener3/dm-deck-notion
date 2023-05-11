import Home from './Home';
import NotFound from './NotFound';
import Header from './Header';
import Form from './components/Form';
import EncounterForm from './components/EncounterForm';
import CardView from './CardView';
import CharacterCard from './components/CharacterCard';
import MonsterCard from './components/MonsterCard';
import List from './components/List';
import useLocalStorage from './hooks/useLocalStorage';
import Preferences from './Preferences';
import SourceUpload from './SourceUpload';
import { characterProps, encounterProps, monsterProps } from './utils/formProperties';
import { Link, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import EncounterCard from './components/EncounterCard';

export default function App() {
	const [theme, setTheme] = useLocalStorage(
		'theme',
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	);

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div className="flex flex-1 flex-col overflow-y-auto min-h-min">
				<div className="text-left flex flex-1 flex-col mx-auto w-3/4 max-w-xl">
					<Routes>
						{/* Home */}
						<Route path="/" element={<Home />} />

						{/* Characters */}
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
							<Route
								path="edit/:id"
								element={<Form storageKey={'characters'} title={'Character'} properties={characterProps} isEditing />}
							/>
						</Route>

						{/* Encounters */}
						<Route path="/encounters">
							<Route index element={<Encounters />} />
							<Route path="new" element={<EncounterForm />} />
							<Route
								path=":id"
								element={
									<CardView storageKey={'encounters'}>
										<EncounterCard storageKey={'encounters'} />
									</CardView>
								}
							/>
							<Route path="edit/:id" element={<EncounterForm />} />
							<Route path="run/:id" element={<RunEncounter />} />
						</Route>

						{/* Monsters */}
						<Route path="/monsters">
							<Route index element={<Monsters />} />
							<Route path="new">
								<Route
									index
									element={
										<>
											<Link className="text-right" to={'./source'}>
												add source?
											</Link>
											<Form storageKey={'monsters'} title={'Monster'} properties={monsterProps} />
										</>
									}
								/>
								<Route path="source" element={<SourceUpload />} />
							</Route>
							<Route
								path=":id"
								element={
									<CardView storageKey={'monsters'}>
										<MonsterCard />
									</CardView>
								}
							/>
						</Route>

						<Route path="/preferences" element={<Preferences toggleTheme={toggleTheme} />}></Route>

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
		<List storageKey="characters" subtitleKey={'class'} title="Characters" canAdd isEditable />
	</>
);

const Monsters = () => (
	<>
		<List storageKey="monsters" subtitleKey={'source'} title="Monsters" canAdd />
	</>
);

const Encounters = () => (
	<>
		<List storageKey="encounters" title="Encounters" canAdd canRun isEditable />
	</>
);

const RunEncounter = () => (
	<>
		<h1>Run Encounter</h1>
	</>
);
