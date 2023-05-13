import MonsterCard from './MonsterCard';
import CharacterCard from './CharacterCard';
import { Link } from 'react-router-dom';
import { getLocalStorageItemById } from '../utils';

const RunOrder = ({ run, setRun, setEdit }) => {
	const encounter = getLocalStorageItemById('encounters', run.id);
	const order = run.initiative_order.map((item) => {
		if (item.creature_type === 'monster') {
			const data = getLocalStorageItemById('monsters', item.id);

			if (item.suffix) {
				data.name += ` ${item.suffix}`;
			}

			return { data, element: <MonsterCard key={item.initiative} item={data} /> };
		} else {
			const data = getLocalStorageItemById('characters', item.id);
			return { data, element: <CharacterCard key={item.initiative} item={data} /> };
		}
	});

	const handleIncrement = () => {
		run.initiative_position === order.length - 1
			? setRun({ ...run, initiative_position: 0, round: run.round + 1 })
			: setRun({ ...run, initiative_position: run.initiative_position + 1 });
	};

	const handleDecrement = () => {
		run.initiative_position === 0
			? setRun({ ...run, initiative_position: order.length - 1, round: run.round - 1 })
			: setRun({ ...run, initiative_position: run.initiative_position - 1 });
	};

	const handleEdit = () => {
		setEdit(true);
	};

	const getOnDeckMessage = () => {
		if (run.initiative_position + 1 === order.length) {
			return (
				<p>
					<strong className="text-[color:var(--text-highlight)]">{order[0].data.name}</strong> on deck, start of a new
					round
				</p>
			);
		} else {
			return (
				<p>
					<strong className="text-[color:var(--text-highlight)]">{order[run.initiative_position + 1].data.name}</strong>{' '}
					on deck
				</p>
			);
		}
	};

	return (
		<>
			<div className="flex justify-between items-center pb-1">
				<h1>{encounter.name}</h1>
				<Link to={-1}>go back</Link>
			</div>

			<p>Round {run.round}</p>

			<p>
				Initiative position {run.initiative_position + 1} / {run.initiative_order.length}
			</p>
			{getOnDeckMessage()}

			<button type="button" className="text-left" onClick={handleEdit}>
				edit initiative
			</button>

			<hr className="my-3" />

			<div className="flex justify-between">
				<button type="button" onClick={handleDecrement}>
					previous
				</button>
				<button type="button" onClick={handleIncrement}>
					next
				</button>
			</div>

			{order[run.initiative_position].element}
		</>
	);
};

export default RunOrder;
