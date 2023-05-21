import { useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getLocalStorageItem } from '../../utils';
import { useEffect, useState } from 'react';
import RunForm from './RunForm';
import RunOrder from './RunOrder';

const Run = () => {
	const { id } = useParams();
	const [run, setRun] = useLocalStorage('active_run', {});
	const [edit, setEdit] = useState(true);
	const runs = getLocalStorageItem('runs');

	useEffect(() => {
		// There is no active run
		if (!run) {
			setEdit(true);
			return;
		}

		// The active run is different than the URL, overwrite
		if (run.id !== id) {
			setEdit(true);
			setRun(runs.find((run) => run.id === id));
			return;
		}

		setEdit(false);
	}, []);

	return edit ? (
		<RunForm run={run} setRun={setRun} setEdit={setEdit} />
	) : (
		<RunOrder run={run} setRun={setRun} setEdit={setEdit} />
	);
};

export default Run;
