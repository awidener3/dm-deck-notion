import InputWithLabel from './InputWithLabel';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaDiceD20 } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLocalStorageItemById } from '../utils';
import { initiativeProp } from '../utils/formProperties';

const RunForm = ({ run, setRun, setEdit }) => {
	const { register, handleSubmit, reset, setValue } = useForm({
		defaultValues: {
			characters: {},
			monsters: {},
		},
	});

	const { id } = useParams();
	const [runs, setRuns] = useLocalStorage('runs', []);
	const [characters, setCharacters] = useState([]);
	const [monsters, setMonsters] = useState([]);
	const encounter = getLocalStorageItemById('encounters', id);

	useEffect(() => reset(getStartingValues()), [run, monsters]);

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

	function getStartingValues() {
		if (!run) return;

		const activeCharacters = run.initiative_order.filter((item) => item.creature_type === 'character');
		const charArr = encounter.characters.reduce(
			(o, key) => ({ ...o, [key]: activeCharacters.find((character) => character.id === key).initiative }),
			{}
		);

		let monArr = {};
		if (monsters.length > 0) {
			const activeMonsters = run.initiative_order.filter((item) => item.creature_type === 'monster');
			monArr = activeMonsters.reduce((o, key) => {
				const data = monsters.find((monster) => monster.id === key.id);
				return {
					...o,
					[key.suffix ? `${data.name} ${key.suffix}` : data.name]: key.initiative,
				};
			}, {});
		}

		return {
			characters: charArr,
			monsters: monArr,
		};
	}

	const onSubmit = (data) => {
		// setup initiative values
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

		// Create an active_run object
		const runObject = {
			id: encounter.id,
			run_id: crypto.randomUUID(),
			start_timestamp: Date.now(),
			completed: false,
			duration: 0,
			round: 1,
			initiative_position: 0,
			initiative_order: initiative.sort((a, b) => {
				return b.initiative - a.initiative;
			}),
		};

		setRuns([...runs, runObject]);
		setRun(runObject);
		setEdit(false);
	};

	return (
		<>
			<header className="flex justify-between items-center pb-1 border-b">
				<h2 className="text-lg text-[color:var(--text-highlight)]"> Setup for "{encounter.name}"</h2>
				<Link to={'/encounters'}>go back</Link>
			</header>
			<p>
				Please set the initiative for each character and monster. You can manually enter them, or randomize them using
				the <FaDiceD20 className="inline-block" /> button.
			</p>

			<hr className="my-2" />

			<form onSubmit={handleSubmit(onSubmit)}>
				<section className="flex gap-4">
					<InitiativeList items={characters} title={'characters'} setValue={setValue} register={register} useId />
					<InitiativeList items={monsters} title={'monsters'} setValue={setValue} register={register} />
				</section>

				<footer className="text-right mt-4 border-t">
					<button type="submit">set initiative and run &rarr;</button>
				</footer>
			</form>
		</>
	);
};

const InitiativeList = ({ items, title, setValue, register, useId }) => {
	const getPath = (item) => {
		if (useId) {
			return title + '.' + item.id;
		} else if (item.suffix) {
			return title + '.' + item.name + ' ' + item.suffix;
		} else {
			return title + '.' + item.name;
		}
	};

	return (
		<div className="flex-1">
			<h2 className="text-[color:var(--text-highlight)]">{title}</h2>
			<ul className="flex flex-col gap-2">
				{items &&
					items.map((item) => (
						<InitiativeInput
							key={item.suffix ? item.id + item.suffix : item.id}
							name={item.suffix ? `${item.name} ${item.suffix}` : item.name}
							path={getPath(item)}
							setValue={setValue}
							register={register}
						/>
					))}
			</ul>
		</div>
	);
};

const InitiativeInput = ({ path, name, register, setValue }) => {
	const handleRoll = () => {
		const roll = Math.floor(Math.random() * 25 + 1);
		setValue(path, roll);
	};

	return (
		<li className="flex gap-2">
			<InputWithLabel path={path} name={name} register={register} row {...initiativeProp} />
			<button type="button" onClick={handleRoll}>
				<FaDiceD20 />
			</button>
		</li>
	);
};

export default RunForm;
