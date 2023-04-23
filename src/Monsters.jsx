import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbZoomFilled } from 'react-icons/tb';

function Monsters() {
	const [monsters, setMonsters] = useState(() => {
		const stored = JSON.parse(localStorage.getItem('monsters'));

		if (stored) {
			const monsterArr = [];
			stored.forEach((source) => {
				source.monsters.forEach((monster) => monsterArr.push({ ...monster, source: source.source }));
			});
			return monsterArr;
		} else {
			return [];
		}
	});
	const [searched, setSearched] = useState([]);
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('monsters'));

		if (stored) {
			const monsterArr = [];
			stored.forEach((source) => {
				source.monsters.forEach((monster) => monsterArr.push({ ...monster, source: source.source }));
			});
			setMonsters(monsterArr);
		} else {
			setMonsters([]);
		}
	}, []);

	const handleInput = (e) => {
		if (e.target.value.length >= 3) {
			const match = monsters
				.filter((m) => m.name && m.name.toLowerCase().includes(e.target.value.toLowerCase()))
				.sort(function (a, b) {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
					return 0;
				});

			setSearched(match.sort((a, b) => a.name - b.name));
		} else {
			setSearched([]);
		}
	};

	const handleSave = () => {
		setError(null);

		if (!file) {
			setError('No source selected! Try choosing a file and try again.');
			return;
		}

		const updatedSources = JSON.parse(localStorage.getItem('monsters'));
		const parsedFile = JSON.parse(file);

		// Update monsters with source
		parsedFile.monsters = parsedFile.monsters.map((monster) => ({ ...monster, source: parsedFile.source }));

		if (updatedSources) {
			// Sources exist, check if this is a duplicate
			if (updatedSources.filter((source) => source.source === parsedFile.source).length > 0) {
				console.log('Source already exists!');
				setError('Source already exists!');
				return;
			}

			updatedSources.push(parsedFile);
			localStorage.setItem('monsters', JSON.stringify(updatedSources));
		} else {
			// No sources, create first source in array
			localStorage.setItem('monsters', JSON.stringify([parsedFile]));
		}

		setMonsters(monsters.concat(parsedFile.monsters));
	};

	const handleUpload = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], 'UTF-8');
		fileReader.onload = (e) => {
			setFile(e.target.result);
		};
	};

	return (
		<>
			<h1>Monsters</h1>

			<div className="flex flex-col">
				<span className="italic">{monsters.length} Monsters Saved</span>

				<div className="flex justify-between">
					<input type="file" className="flex" onChange={handleUpload} />
					<button className="bg-emerald-600 text-sm py-1 px-2" onClick={handleSave}>
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
		</>
	);
}

function MonsterListItem({ monster }) {
	return (
		<li className="py-1 flex justify-between border-b border-b-slate-500">
			<div>
				{monster.name} <span className="font-light italic">({monster.source.match(/\((.*)\)/).pop()})</span>{' '}
			</div>
			<Link to={monster.name.replaceAll(' ', '_').toLowerCase()}>
				<span className="text-emerald-600">View</span>
			</Link>
		</li>
	);
}

export default Monsters;
