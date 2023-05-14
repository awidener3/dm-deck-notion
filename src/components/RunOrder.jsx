import MonsterCard from './MonsterCard';
import CharacterCard from './CharacterCard';
import { Link } from 'react-router-dom';
import { getLocalStorageItemById } from '../utils';
import { FaPencilAlt } from 'react-icons/fa';

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
		if (run.initiative_position === order.length - 1 && run.round >= 1) {
			setRun({ ...run, initiative_position: 0, round: run.round + 1 });
		} else {
			setRun({ ...run, initiative_position: run.initiative_position + 1 });
		}
	};

	const handleDecrement = () => {
		if (run.initiative_position === 0 && run.round === 1) return;

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

			<div className="flex justify-between">
				<span>
					<p>Round {run.round}</p>
					<p>
						Initiative {run.initiative_position + 1} / {run.initiative_order.length}
					</p>
				</span>

				{getOnDeckMessage()}
			</div>

			<button type="button" className="text-left italic flex items-center gap-2" onClick={handleEdit}>
				<FaPencilAlt /> edit initiative
			</button>

			<hr className="my-3" />

			<div className="flex justify-between">
				<button type="button" onClick={handleDecrement}>
					&larr; previous
				</button>
				<button type="button" onClick={handleIncrement}>
					next &rarr;
				</button>
			</div>

			{order[run.initiative_position].element}
		</>
	);
};

export default RunOrder;
