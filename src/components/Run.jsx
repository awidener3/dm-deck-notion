import { Link, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { getLocalStorageItem, getLocalStorageItemById } from '../utils';
import { useEffect, useState } from 'react';
import RunForm from './RunForm';
import MonsterCard from './MonsterCard';
import CharacterCard from './CharacterCard';

const Run = () => {
	const { id } = useParams();
	const [run, setRun] = useLocalStorage('active_run', null);
	const [edit, setEdit] = useState(true);
	const runs = getLocalStorageItem('runs');

	useEffect(() => {
		// There is no active run
		if (!run) {
			setEdit(true);
			return;
		}

		// The active run is different than the URL, overwrite
		console.log(run.id !== id);
		if (run.id !== id) {
			setEdit(true);
			setRun(runs.find((run) => run.id === id));
			return;
		}

		setEdit(false);
	}, []);

	return edit ? <RunForm setRun={setRun} setEdit={setEdit} /> : <RunOrder run={run} setRun={setRun} />;
};

const RunOrder = ({ run, setRun }) => {
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

			<button type="button">edit initative</button>

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

export default Run;
