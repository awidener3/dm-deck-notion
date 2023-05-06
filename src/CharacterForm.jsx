import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getLocalStorageItem } from './utils';
import { v4 as uuidv4 } from 'uuid';

const CharacterForm = ({ editValues = null }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm();

	const [characters, setCharacters] = useState(getLocalStorageItem('characters'));

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [formState, reset]);

	useEffect(() => {
		localStorage.setItem('characters', JSON.stringify(characters));
	}, [characters]);

	const addCharacter = (character) => {
		setCharacters([...characters, character]);
	};

	function updateCharacter(character) {
		setCharacters(characters.map((c) => (c.id === character.id ? character : c)));
		setFormVisible(false);
	}

	function onSubmit(data) {
		// Create character
		if (editValues) {
			data.id = editValues.id;
			updateCharacter(data);
		} else {
			data.id = uuidv4();
			addCharacter(data);
		}
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
			<h2 className="text-lg flex mt-2 text-[color:var(--text-highlight)] pb-1 border-b">
				{editValues ? 'Edit' : 'New'} Character
			</h2>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 gap-2">
				<div className="grid grid-cols-2 gap-2">
					{properties.map((p) => {
						return (
							<div key={p.name} className="flex flex-col">
								<label className="self-start italic">{p.name.replace('_', ' ')}</label>
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
				</div>

				<div className="flex justify-center gap-2">
					<button type="submit" className="text-[color:var(--text-highlight)] mt-2 text-sm py-1 px-2">
						{editValues ? 'Update' : 'Save'}
					</button>
				</div>
			</form>
		</>
	);
};

export default CharacterForm;
