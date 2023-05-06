import { useState } from 'react';
import List from './components/List';

function Encounters() {
	const [formVisible, setFormVisible] = useState(false);
	const [encounters, setEncounters] = useState(
		(localStorage['encounters'] && JSON.parse(localStorage.getItem('encounters'))) || []
	);

	console.log(encounters);

	const handleEdit = () => {
		console.log('edit!');
	};

	const handleView = () => {
		console.log('view!');
	};

	const handleRun = () => {
		console.log('run!');
	};

	return (
		<>
			<List title={'Encounters'} items={encounters}>
				<button onClick={handleEdit}>edit</button>
				<button onClick={handleView}>view</button>
				<button onClick={handleRun}>run {'>>'} </button>
			</List>
		</>
	);
}

export default Encounters;
