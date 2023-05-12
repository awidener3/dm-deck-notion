import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import InputWithLabel from './InputWithLabel';
import { useEffect, useState } from 'react';
import { getLocalStorageItemById } from '../utils';
import { initiativeProp } from '../utils/formProperties';
import useLocalStorage from '../hooks/useLocalStorage';

const RunForm = () => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm();

	const { id } = useParams();
	const [runs, setRuns] = useLocalStorage('runs', []);

	const encounter = getLocalStorageItemById('encounters', id);
	const [characters, setCharacters] = useState([]);
	const [monsters, setMonsters] = useState([]);

	useEffect(() => {
		const characterData = encounter.characters.map((id) => getLocalStorageItemById('characters', id));
		setCharacters(characterData);

		const monsterArray = [];
		encounter.monsters.forEach((monster) => {
			if (monster.quantity > 1) {
				const data = getLocalStorageItemById('monsters', monster.id);
				for (let i = 0; i < monster.quantity; i++) {
					monsterArray.push({ ...data, suffix: `${i + 1}` });
				}
			} else {
				monsterArray.push(getLocalStorageItemById('monsters', monster.id));
			}
		});
		setMonsters(monsterArray);
	}, [id]);

	const onSubmit = (data) => {
		const initiative = [];

		for (const [key, value] of Object.entries(data.characters)) {
			const character = characters.find((character) => character.id === key);
			initiative.push({
				id: character.id,
				creature_type: 'character',
				initiative: Number(value),
			});
		}

		for (const [key, value] of Object.entries(data.monsters)) {
			const monster = monsters.find((monster) => {
				const monsterName = monster.suffix ? monster.name + ' ' + monster.suffix : monster.name;
				return monsterName === key;
			});

			const object = {
				id: monster.id,
				creature_type: 'monster',
				initiative: Number(value),
			};

			if (monster.suffix) {
				object.suffix = monster.suffix;
			}

			initiative.push(object);
		}

		const runObject = {
			id: encounter.id,
			run_id: crypto.randomUUID(),
			start_timestamp: Date.now(),
			completed: false,
			duration: 0,
			initiative_order: initiative.sort((a, b) => {
				return b.initiative - a.initiative;
			}),
		};

		setRuns([...runs, runObject]);
	};

	return (
		<>
			<header className="flex justify-between items-center pb-1 border-b">
				<h2 className="text-lg text-[color:var(--text-highlight)]"> Setup for "{encounter.name}"</h2>
				<Link to={'/encounters'}>go back</Link>
			</header>
			<p>
				Please set the initiative for each character and monster. You can manually enter them, or randomize them using
				the "random" button.
			</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<h2>Character Initiatives</h2>
					{characters &&
						characters.map((character) => (
							<InputWithLabel
								key={character.id}
								path={`characters.${character.id}`}
								name={character.name}
								register={register}
								{...initiativeProp}
							/>
						))}
				</div>

				<div>
					<h2>Monsters Initiatives</h2>
					{monsters &&
						monsters.map((monster) => (
							<InputWithLabel
								key={monster.suffix ? monster.id + monster.suffix : monster.id}
								name={monster.suffix ? `${monster.name} ${monster.suffix}` : monster.name}
								path={`monsters.${monster.suffix ? `${monster.name} ${monster.suffix}` : monster.name}`}
								register={register}
								{...initiativeProp}
							/>
						))}
				</div>

				<button type="submit">complete</button>
			</form>
		</>
	);
};

export default RunForm;
