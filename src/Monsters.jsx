import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
		if (file) {
			const updatedSources = JSON.parse(localStorage.getItem('monsters'));

			const parsedFile = JSON.parse(file);

			if (updatedSources) {
				updatedSources.push(parsedFile);
				localStorage.setItem('monsters', JSON.stringify(updatedSources));
			} else {
				localStorage.setItem('monsters', JSON.stringify([parsedFile]));
			}

			setMonsters(monsters.concat(parsedFile.monsters));
		}
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

				<input className="mt-2 flex-1 p-2" type="text" placeholder="Search monsters" onInput={handleInput} />

				<ul className="bg-neutral-700 flex-1 mt-3">
					{searched &&
						searched.map((s, i) => (
							<li key={i}>
								{s.name} <span className="font-light italic">({s.source.match(/\((.*)\)/).pop()})</span>{' '}
								<Link to={s.name.replaceAll(' ', '_').toLowerCase()}>View</Link>
							</li>
						))}
				</ul>
			</div>
		</>
	);
}

export default Monsters;
