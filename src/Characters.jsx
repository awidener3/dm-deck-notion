import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbEdit, TbTrash, TbArrowBigLeftFilled } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';

function Characters() {
	const [formVisible, setFormVisible] = useState(false);
	const [characters, setCharacters] = useState(JSON.parse(localStorage.getItem('characters')) || []);
	const [parties, setParties] = useState(JSON.parse(localStorage.getItem('parties') || []));
	const [editValues, setEditValues] = useState(null);

	const addCharacter = (character) => setCharacters([...characters, character]);

	const removeCharacter = (character) => {
		// Remove character
		setCharacters(characters.filter((c) => character !== c));

		// Update party to remove character ID
		const charactersParty = parties.find((party) => party.character_ids.includes(character.id));

		charactersParty.character_ids = charactersParty.character_ids.filter((id) => id !== character.id);

		setParties(parties);
	};

	const updateCharacter = (character) => {
		setCharacters(characters.map((c) => (c.id === character.id ? character : c)));
		setFormVisible(false);
	};

	const addParty = (party) => setParties([...parties, party]);

	const removeParty = (party) => setParties(parties.filter((p) => party !== p));

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

		const parties = JSON.parse(localStorage.getItem('parties'));
		if (parties) {
			setParties(parties);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('characters', JSON.stringify(characters));
	}, [characters]);

	useEffect(() => {
		localStorage.setItem('parties', JSON.stringify(parties), [parties]);
	});

	return (
		<>
			<h1>Characters</h1>
			<div className="flex gap-2">
				<button onClick={showForm} className="flex bg-emerald-600 mt-2 text-sm py-1 px-2">
					{formVisible ? (
						<div className="flex items-center gap-1">
							<TbArrowBigLeftFilled /> Back
						</div>
					) : (
						'Create Character'
					)}
				</button>
			</div>

			{formVisible ? (
				<AddCharacterForm
					addCharacter={addCharacter}
					updateCharacter={updateCharacter}
					editValues={editValues}
					parties={parties}
					setParties={setParties}
				/>
			) : (
				<>
					<CharacterList characters={characters} removeCharacter={removeCharacter} handleEdit={handleEdit} />
					<PartyList parties={parties} addParty={addParty} removeParty={removeParty} />
				</>
			)}
		</>
	);
}

function AddCharacterForm({ addCharacter, updateCharacter, editValues, parties, setParties }) {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm();

	const [partyValue, setPartyValue] = useState('none');

	useEffect(() => {
		setPartyValue(getPartyValue());
	}, []);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	function onSubmit(data) {
		// Create character
		if (editValues) {
			data.id = editValues.id;
			updateCharacter(data);
		} else {
			data.id = uuidv4();
			addCharacter(data);
		}

		// Add character ID to selected party
		if (partyValue !== 'none') {
			const partyToJoin = parties.find((party) => party.name === partyValue);

			if (!partyToJoin.character_ids.includes(data.id)) {
				partyToJoin.character_ids.push(data.id);
			}

			setParties(parties);
		}
	}

	function getPartyValue() {
		// No party if a new character
		if (!editValues) return 'none';

		// Find associated party
		const characterParty = parties.find((party) => party.character_ids.includes(editValues.id));
		return characterParty?.name || 'none';
	}

	function handlePartyChange(e) {
		// Update parties if editing a character
		if (editValues) {
			parties.forEach((party) => {
				if (party.name === partyValue) {
					party.character_ids = party.character_ids.filter((id) => id !== editValues.id);
				} else if (party.name === e.target.value) {
					party.character_ids.push(editValues.id);
				}
			});

			setParties(parties);
		}

		setPartyValue(e.target.value);
	}

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
			min: 1,
			max: 20,
		},
		{
			name: 'armor_class',
			placeholder: 14,
			type: 'number',
			required: true,
			min: 1,
			max: 25,
		},
		{
			name: 'hit_points',
			placeholder: 44,
			type: 'number',
			required: true,
			min: 1,
			max: 560,
		},
	];

	return (
		<>
			<h2 className="text-lg flex mt-2 text-emerald-600 border-b">New Character</h2>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 gap-2">
				<div className="grid grid-cols-2 gap-2">
					{properties.map((p) => {
						return (
							<div key={p.name} className="flex flex-col">
								<label className="self-start text-zinc-400 italic">{p.name.replace('_', ' ').toUpperCase()}</label>
								<input
									className="p-2"
									type={p.type}
									placeholder={p.name.replace('_', ' ').toUpperCase()}
									autoComplete="off"
									defaultValue={editValues && editValues[p.name]}
									min={p.min}
									max={p.max}
									{...register(p.name, { required: p.required })}
								/>
							</div>
						);
					})}

					<div className="flex flex-col">
						<label className="self-start text-zinc-400 italic">PARTY</label>
						<select className="p-2 h-10" value={partyValue} onChange={handlePartyChange}>
							<option value="none">No party</option>
							{parties.map((p) => (
								<option key={p.id} value={p.name}>
									{p.name}
								</option>
							))}
						</select>
					</div>
				</div>

				<button type="submit" className="bg-emerald-600 w-max">
					Submit
				</button>
			</form>
		</>
	);
}

function CharacterList({ characters, removeCharacter, handleEdit }) {
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

function PartyList({ parties, addParty, removeParty }) {
	const [partyName, setPartyName] = useState('');

	const handlePartyNameUpdate = (e) => setPartyName(e.target.value);

	const handleCreateParty = () => {
		// Create party object and add to state
		const party = {
			id: uuidv4(),
			name: partyName,
			character_ids: [],
		};

		addParty(party);

		// Reset form
		setPartyName('');
	};

	return (
		<>
			<h2 className="text-lg flex mt-2 text-emerald-600 border-b">Your Parties</h2>

			<div className="flex justify-end mt-3 gap-2">
				<input
					className="px-2 flex-1"
					value={partyName}
					placeholder="New Party Name"
					onChange={handlePartyNameUpdate}
				/>
				<button className=" bg-emerald-600 text-sm py-1 px-2" onClick={handleCreateParty}>
					Create Party
				</button>
			</div>

			<ul className="flex flex-col gap-2">
				{parties.map((p) => {
					return (
						<li key={p.id} className="flex justify-between items-center border-b border-b-slate-500 py-2">
							<div>
								{p.name} <span className="italic font-light">({p.character_ids.length} Members)</span>
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
