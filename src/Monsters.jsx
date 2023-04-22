import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Monsters() {
	const [monsters, setMonsters] = useState(JSON.parse(localStorage.getItem('monsters')) || []);
	const [searched, setSearched] = useState([]);

	const handleInput = (e) => {
		if (e.target.value.length >= 3) {
			const match = monsters.filter((m) => m.name && m.name.toLowerCase().includes(e.target.value.toLowerCase()));

			setSearched(match);
		} else {
			setSearched([]);
		}
	};

	const handleUpload = () => {
		console.log('upload JSON!');
	};

	useEffect(() => {
		const monsters = JSON.parse(localStorage.getItem('monsters'));
		if (monsters) {
			setMonsters(monsters);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('monsters', JSON.stringify(monsters));
	});

	return (
		<>
			<h1>Monsters</h1>

			<div className="flex flex-col">
				<span className="italic">{monsters.length} Monsters Saved</span>
				<div className="flex items-center w-full gap-2">
					<input className="flex-1 p-2" type="text" placeholder="Search monsters" onInput={handleInput} />
					<button className="flex bg-emerald-600 text-sm py-1 px-2" onClick={handleUpload}>
						Upload JSON
					</button>
				</div>

				<ul className="bg-neutral-700 flex-1 mt-3">
					{searched &&
						searched.map((s) => (
							<li key={s.name}>
								{s.name} <Link to={s.name.replaceAll(' ', '_').toLowerCase()}>View</Link>
							</li>
						))}
				</ul>
			</div>
		</>
	);
}

export default Monsters;
