import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MonsterCard from './components/MonsterCard';
import NotFound from './NotFound';

function Monster() {
	const { name } = useParams();

	const [monster, setMonster] = useState({});

	useEffect(() => {
		const monsters = JSON.parse(localStorage.getItem('monsters'));

		const monster = monsters.find((monster) => {
			if (monster.name) {
				return monster.name.replaceAll(' ', '_').toLowerCase() === name;
			} else {
				return false;
			}
		});

		console.log(monster);

		setMonster(monster);
	}, [name]);
	return (
		<>
			<Link to="../">Back</Link>

			{monster ? <MonsterCard monster={monster} /> : <NotFound />}
		</>
	);
}

export default Monster;
