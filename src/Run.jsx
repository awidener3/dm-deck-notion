import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import { getLocalStorageItem, getLocalStorageItemById } from './utils';
import { useEffect, useState } from 'react';

const Run = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [run, setRun] = useLocalStorage('active_run', {});
	const [data, setData] = useState(null);

	useEffect(() => (!run || run.id !== id) && navigate('./setup'), [id]);

	useEffect(() => {
		if (!run) return;
		const encounter = getLocalStorageItemById('encounters', run.id);

		const runData = {
			encounter: encounter,
			characters: encounter.characters.map((characterId) => getLocalStorageItemById('characters', characterId)),
			monsters: encounter.monsters.map((monster) => getLocalStorageItemById('monsters', monster.id)),
		};

		setData(runData);
	}, [run]);

	console.log('run', run);
	console.log('run data', data);

	return <h1>Run Encounter</h1>;
};

export default Run;
