import { useState } from 'react';

function Encounters() {
	const [formVisible, setFormVisible] = useState(false);
	const [encounters, setEncounters] = useState(
		(localStorage['encounters'] && JSON.parse(localStorage.getItem('encounters'))) || []
	);

	console.log(encounters);

	return <h1>Encounters</h1>;
}

export default Encounters;
