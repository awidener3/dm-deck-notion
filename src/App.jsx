import Home from './Home';
import NotFound from './NotFound';
import Header from './Header';
import Form from './components/Form';
import CardView from './CardView';
import CharacterCard from './components/CharacterCard';
import MonsterCard from './components/MonsterCard';
import List from './components/List';
import { characterProps, encounterProps, monsterProps } from './utils/formProperties';
import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

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
							<Route
								path="edit/:id"
								element={
									<Form storageKey={'characters'} title={'Character'} properties={characterProps} existing={true} />
								}
							/>
						</Route>

						{/* Encounter routes */}
						<Route path="/encounters">
							<Route index element={<Encounters />} />
							<Route
								path="new"
								element={<Form storageKey={'encounters'} title={'Encounter'} properties={encounterProps} />}
							/>
							<Route
								path=":id"
								element={
									<CardView storageKey={'encounters'}>
										<h1>Encounter here</h1>
									</CardView>
								}
							/>
							<Route
								path="edit/:id"
								element={<Form storageKey={'encounters'} title={'Encounter'} properties={[]} existing={true} />}
							/>
						</Route>

						{/* Monster routes */}
						<Route path="/monsters">
							<Route index element={<Monsters />} />
							<Route path="new">
								<Route
									index
									element={
										<>
											<Link to={'./source'}>add source?</Link>
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
		<List storageKey="characters" subtitleKey={'class'} title="Characters" isEditable={true} />
	</>
);

const Monsters = () => (
	<>
		<List storageKey="monsters" subtitleKey={'source'} title="Monsters" />
	</>
);

const Encounters = () => (
	<>
		<List storageKey="encounters" title="Encounters" isEditable={true} />
	</>
);

const SourceUpload = () => {
	const [file, setFile] = useState({});
	const [error, setError] = useState(false);

	const [monsters, setMonsters] = useLocalStorage('monsters', []);
	const [sources, setSources] = useLocalStorage('sources', []);

	const handleUpload = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], 'UTF-8');
		fileReader.onload = (e) => setFile(JSON.parse(e.target.result));
	};

	const handleSubmit = () => {
		setError(false);

		const newSource = {
			source: file.source,
			abbr: file.abbr,
			version: file.version,
		};

		const newMonsters = file.monsters;

		setMonsters(() => [...monsters, ...newMonsters]);
		setSources(() => [...sources, newSource]);
	};

	return (
		<>
			<h2>Source Upload</h2>
			<div className="flex justify-between">
				<form onSubmit={handleSubmit}>
					<input type="file" className="p-2 border-0" onChange={handleUpload} required={true} />
					<button type="submit">Save</button>
				</form>
			</div>

			{error && <span className="italic text-red-600">{error}</span>}
		</>
	);
};
