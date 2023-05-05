import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMonsterArray } from './utils';

function Monsters() {
	const [monsters, setMonsters] = useState(getMonsterArray());
	const [searched, setSearched] = useState([]);
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => setMonsters(getMonsterArray()), []);

	function handleInput(e) {
		// Stop query unless user has typed 3 or more characters
		if (e.target.value < 3) return setSearched([]);

		const match = monsters
			.filter((m) => m.name && m.name.toLowerCase().includes(e.target.value.toLowerCase()))
			.sort(function (a, b) {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});

		setSearched(match);
	}

	function handleSave() {
		setError(null);

		if (!file) return setError('No source selected! Try choosing a file and try again.');

		const existingSources = JSON.parse(localStorage.getItem('monsters'));
		const newSource = JSON.parse(file);

		// Update monsters with source
		newSource.monsters.forEach((monster) => (monster.source = newSource.source));

		// No existing sources, create first source in array
		if (!existingSources) {
			localStorage.setItem('monsters', JSON.stringify([newSource]));
			return setMonsters(monsters.concat(newSource.monsters));
		}

		// Sources exist, check if this is a duplicate
		if (existingSources.filter((source) => source.source === newSource.source).length > 0) {
			return setError('Source already exists!');
		}

		// Confirmed new source, update localstorage and state
		existingSources.push(newSource);
		localStorage.setItem('monsters', JSON.stringify(existingSources));
		setMonsters(getMonsterArray());
	}

	function handleUpload(e) {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], 'UTF-8');
		fileReader.onload = (e) => setFile(e.target.result);
	}

	return (
		<div className="flex flex-col">
			<span className="italic">{monsters.length} Monsters Saved</span>

			<div className="flex justify-between">
				<input type="file" className="flex" onChange={handleUpload} />
				<button onClick={handleSave} disabled={!file}>
					Save
				</button>
			</div>

			{error && <span className="italic text-red-600">{error}</span>}

			<input className="mt-2 flex-1 p-2" type="text" placeholder="Search monsters" onInput={handleInput} />

			<ul className="flex-1 mt-3">
				{searched.length > 0
					? searched.map((monster, i) => <MonsterListItem key={i} monster={monster} />)
					: monsters.map((monster, i) => <MonsterListItem key={i} monster={monster} index={i} />)}
			</ul>
		</div>
	);
}

function MonsterListItem({ monster }) {
	return (
		<li className="py-1 flex justify-between border-b border-b-slate-500">
			<div>
				{monster.name} <span className="font-light italic">({monster.source.match(/\((.*)\)/).pop()})</span>{' '}
			</div>
			<Link to={monster.name.replaceAll(' ', '_').toLowerCase()}>
				<span className="text-[color:var(--text-highlight)]">View</span>
			</Link>
		</li>
	);
}

export default Monsters;
