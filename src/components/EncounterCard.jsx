import { Link } from 'react-router-dom';
import { getLocalStorageItemById } from '../utils';
import List from './List';

const EncounterCard = ({ item }) => {
	const characters = item.characters.map((id) => getLocalStorageItemById('characters', id));
	const monsters = item.monsters.map((monster) => {
		const data = getLocalStorageItemById('monsters', monster.id);
		return {
			id: monster.id,
			name: `${monster.quantity}x ${data.name}`,
			quantity: monster.quantity,
			challenge_rating: data.challenge_rating,
		};
	});

	return (
		<div className="flex-col border-2 border-[var(--bg-secondary)] bg-[var(--card-bg)] rounded-lg text-sm my-2 p-2">
			<h1 className="text-2xl text-left italic p-1">{item.name}</h1>

			<div>
				<h2>Stats</h2>
				<p># of characters: {characters.length}</p>
				<p># of monsters: {monsters.map((item) => item.quantity).reduce((prev, next) => prev + next)}</p>
			</div>

			<List title={'characters'} subtitleKey={'level'} items={characters} canFilter={false} paginate={false} />

			<List title={'monsters'} items={monsters} canFilter={false} paginate={false} />

			<div className="mt-3 flex gap-2">
				<Link to={`/encounters/edit/${item.id}`}>edit</Link>
				<Link to={`/encounters/run/${item.id}`}>run</Link>
			</div>
		</div>
	);
};

export default EncounterCard;
