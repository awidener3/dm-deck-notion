import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import CharacterCard from './components/CharacterCard';

const Character = () => {
	const { id } = useParams();
	const [character, setCharacter] = useState({});

	useEffect(() => {
		const characters = JSON.parse(localStorage.getItem('characters'));
		const character = characters.find((character) => character.id == id);

		setCharacter(character);
	}, [id]);
	return (
		<>
			<Link className="self-start" to="../">
				Back
			</Link>

			{character ? <CharacterCard character={character} /> : <NotFound />}
		</>
	);
};

export default Character;
