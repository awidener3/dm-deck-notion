import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';

function Characters() {
	const [formVisible, setFormVisible] = useState(false);
	const [characters, setCharacters] = useState(JSON.parse(localStorage.getItem('characters')) || []);
	const [parties, setParties] = useState(JSON.parse(localStorage.getItem('parties') || []));
	const [editValues, setEditValues] = useState(null);

	const addCharacter = (character) => {
		setCharacters([...characters, character]);
	};

	const removeCharacter = (character) => {
		setCharacters(characters.filter((c) => character !== c));
	};

	const updateCharacter = (character) => {
		setCharacters(characters.map((c) => (c.id === character.id ? character : c)));
		setFormVisible(false);
	};

	const handleEdit = (character) => {
		setFormVisible(true);
		setEditValues(character);
	};

	const showForm = () => {
		setEditValues(null);
		setFormVisible(!formVisible);
	};

	useEffect(() => {
		const characters = JSON.parse(localStorage.getItem('characters'));
		if (characters) {
			setCharacters(characters);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('characters', JSON.stringify(characters));
	});

	return (
		<>
			<h1>Characters</h1>
			<button onClick={showForm} className="flex bg-emerald-600 mt-2 text-sm py-1 px-2">
				{formVisible ? 'Back' : 'Add'}
			</button>

			{formVisible ? (
				<AddCharacterForm addCharacter={addCharacter} updateCharacter={updateCharacter} editValues={editValues} />
			) : (
				<>
					<CharacterList characters={characters} removeCharacter={removeCharacter} handleEdit={handleEdit} />
					<PartyList parties={parties} />
				</>
			)}
		</>
	);
}

function AddCharacterForm({ addCharacter, updateCharacter, editValues }) {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	const onSubmit = (data) => {
		if (editValues) {
			data.id = editValues.id;
			updateCharacter(data);
		} else {
			data.id = uuidv4();
			addCharacter(data);
		}
	};

	const properties = [
		{
			name: 'name',
			placeholder: 'Arkhan',
			type: 'text',
			required: true,
		},
		{
			name: 'class',
			placeholder: 'barbarian',
			type: 'text',
			required: true,
		},
		{
			name: 'level',
			placeholder: 5,
			type: 'number',
			required: true,
		},
		{
			name: 'armor_class',
			placeholder: 14,
			type: 'number',
			required: true,
		},
		{
			name: 'hit_points',
			placeholder: 44,
			type: 'number',
			required: true,
		},
	];

	return (
		<>
			<h2 className="text-lg mt-2 text-emerald-600">New Character</h2>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
				{properties.map((p) => {
					return (
						<input
							className="p-2"
							key={p.name}
							type={p.type}
							placeholder={p.name}
							defaultValue={editValues && editValues[p.name]}
							{...register(p.name, { required: p.required })}
						/>
					);
				})}

				<button type="submit" className="bg-emerald-600 w-max">
					Submit
				</button>
			</form>
		</>
	);
}

function CharacterList({ characters, removeCharacter }) {
	return (
		<>
			<h2 className="text-lg flex mt-2 text-emerald-600 border-b">Your Characters</h2>
			<ul className="flex flex-col gap-2">
				{characters.map((c) => {
					return (
						<li key={c.id} className="flex justify-between items-center border-b border-b-slate-500 py-2">
							<div>
								{c.name} <span className="italic font-light">(level {c.level})</span>
							</div>
							<div className="flex gap-2">
								<button className="text-sm bg-emerald-600 py-2 px-3" onClick={() => handleEdit(c)}>
									<TbEdit />
								</button>
								<button className="text-sm bg-emerald-600 py-2 px-3" onClick={() => removeCharacter(c)}>
									<TbTrash />
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}

function PartyList({ parties, removeParty }) {
	return (
		<>
			<h2 className="text-lg flex mt-2 text-emerald-600 border-b">Your Parties</h2>
			<ul className="flex flex-col gap-2">
				{parties.map((p) => {
					return (
						<li key={p.id} className="flex justify-between items-center border-b border-b-slate-500 py-2">
							<div>
								{p.name} <span className="italic font-light">(level {p.level})</span>
							</div>
							<div className="flex gap-2">
								<button className="text-sm bg-emerald-600 py-2 px-3" onClick={() => removeParty(p)}>
									<TbTrash />
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default Characters;
