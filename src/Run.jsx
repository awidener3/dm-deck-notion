import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import { getLocalStorageItem, getLocalStorageItemById } from './utils';
import { useEffect, useState } from 'react';
import RunForm from './components/RunForm';
import MonsterCard from './components/MonsterCard';
import CharacterCard from './components/CharacterCard';

const Run = () => {
	const { id } = useParams();
	const [runs, setRuns] = useLocalStorage('runs', []);
	const [run, setRun] = useLocalStorage('active_run', null);

	useEffect(
		() => (runs.some((run) => run.id === id) ? setRun(runs.find((run) => run.id === id)) : setRun(null)),
		[runs]
	);

	console.log(run);

	// useEffect(() => (!run || run.id !== id) && navigate('./setup'), [id]);

	return <>{run ? <RunOrder run={run} /> : <RunForm setRun={setRun} />}</>;
};

const RunOrder = ({ run }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const encounter = getLocalStorageItemById('encounters', run.id);

	const order = run.initiative_order.map((item) => {
		if (item.creature_type === 'monster') {
			const data = getLocalStorageItemById('monsters', item.id);

			console.log(item);

			if (item.suffix) {
				data.name += ` ${item.suffix}`;
			}

			return <MonsterCard key={item.initiative} item={data} />;
		} else {
			const data = getLocalStorageItemById('characters', item.id);
			return <CharacterCard key={item.initiative} item={data} />;
		}
	});

	console.log(order);

	return (
		<>
			<h1>{encounter.name}</h1>

			{order[currentIndex]}
		</>
	);
};

export default Run;
