import { useParams } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import { getLocalStorageItemById } from './utils';
import { useEffect } from 'react';
import RunForm from './components/RunForm';
import MonsterCard from './components/MonsterCard';
import CharacterCard from './components/CharacterCard';

const Run = () => {
	const { id } = useParams();
	const [runs, setRuns] = useLocalStorage('runs', []);
	const [run, setRun] = useLocalStorage('active_run', null);

	useEffect(() => {
		if (run.id !== id) {
			runs.some((run) => run.id === id) ? setRun(runs.find((run) => run.id === id)) : setRun(null);
		}
	}, [runs]);

	return <>{run ? <RunOrder run={run} setRun={setRun} /> : <RunForm setRun={setRun} />}</>;
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
			? setRun({ ...run, initiative_position: 0 })
			: setRun({ ...run, initiative_position: run.initiative_position + 1 });
	};

	const handleDecrement = () => {
		run.initiative_position === 0
			? setRun({ ...run, initiative_position: order.length - 1 })
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
			<h1>{encounter.name}</h1>

			<p>Initiative position {run.initiative_position + 1}</p>
			{getOnDeckMessage()}

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
