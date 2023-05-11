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
import { characterProps, encounterProps, monsterProps } from './utils/formProperties';
import { Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
							<Route path="new" element={<EncounterForm properties={encounterProps} />} />
							<Route
								path=":id"
								element={
									<CardView storageKey={'encounters'}>
										<h1>Encounter here</h1>
									</CardView>
								}
							/>
							<Route path="edit/:id" element={<EncounterForm />} />
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
		<List storageKey="characters" subtitleKey={'class'} title="Characters" isEditable />
	</>
);

const Monsters = () => (
	<>
		<List storageKey="monsters" subtitleKey={'source'} title="Monsters" />
	</>
);

const Encounters = () => (
	<>
		<List storageKey="encounters" title="Encounters" isEditable />
	</>
);

const SourceUpload = () => {
	const [file, setFile] = useState({});
	const [monsters, setMonsters] = useLocalStorage('monsters', []);
	const [sources, setSources] = useLocalStorage('sources', []);

	const handleUpload = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], 'UTF-8');
		fileReader.onload = (e) => setFile(JSON.parse(e.target.result));
	};

	const handleSubmit = () => {
		const newSource = {
			source: file.source,
			abbr: file.abbr,
			version: file.version,
		};

		const newMonsters = file.monsters;

		setMonsters(() => [...monsters, ...newMonsters]);
		setSources(() => [...sources, newSource]);
	};

	const code = `	// source-file.json

	{
		"source": "your source",
		"version": "0.0.0",
		"monsters": [
			{
				// monster data
			},
		]
	}`;

	return (
		<>
			<h2>Source Upload</h2>
			<div className="flex justify-between">
				<form onSubmit={handleSubmit}>
					<input type="file" className="p-2 border-0" onChange={handleUpload} required={true} />
					<button type="submit">Save</button>
				</form>
			</div>

			<p>
				Sources should be formatted with a <code>source</code> and <code>version</code> property, and a{' '}
				<code>monsters</code> array of objects.
			</p>

			<pre className="mt-5">{code}</pre>
		</>
	);
};
