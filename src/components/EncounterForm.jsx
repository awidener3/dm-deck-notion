import useLocalStorage from '../hooks/useLocalStorage';
import InputWithLabel from './InputWithLabel';
import FormFooter from './FormFooter';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLocalStorageItemById } from '../utils';
import { encounterProps } from '../utils/formProperties';
import List from './List';

const EncounterForm = ({ properties, existing = null }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [items, setItems] = useLocalStorage('encounters', []);

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm({ values: getLocalStorageItemById('encounters', id) || null });

	const { append: charactersAppend, remove: charactersRemove } = useFieldArray({
		control,
		name: 'characters',
	});
	const { append: monstersAppend, remove: monstersRemove } = useFieldArray({
		control,
		name: 'monsters',
	});

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [formState, reset]);

	const onSubmit = (data) => {
		console.log('data', data);
		existing ? updateItems(data) : addItem({ ...data, id: crypto.randomUUID() });
		navigate(-1);
	};

	const addItem = (item) => setItems([...items, item]);
	const updateItems = (updatedItem) => {
		setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
	};

	return (
		<>
			<div className="flex justify-between items-center pb-1 border-b">
				<h2 className="text-lg text-[color:var(--text-highlight)]">{existing ? 'Edit' : 'New'} Encounter</h2>
				<Link to={-1}>go back</Link>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 gap-2">
				<InputWithLabel {...encounterProps} register={register} />

				{/* {charactersFields.map((item, index) => (
					<input key={item.id} type="hidden" {...register(`characters[${index}].id`)} />
				))} */}
				{/* 
				{monstersFields.map((item, index) => (
					<input key={item.id} type="hidden" {...register(mosnters[index])} />
				))} */}

				<ListPicker charactersAppend={charactersAppend} monstersAppend={monstersAppend} />

				<FormFooter reset={reset} existing={existing} />
			</form>
		</>
	);
};

const sampleLists = ['characters', 'monsters'];

const ListPicker = ({ lists = sampleLists, charactersAppend, monstersAppend }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleClick = (index) => {
		setSelectedIndex(index);
	};

	const handleSelect = (id, quantity) => {
		if (lists[selectedIndex] === 'characters') {
			charactersAppend(id);
		} else {
			monstersAppend({ id, quantity: quantity || 1 });
		}
	};

	return (
		<div>
			<ul className="flex gap-5">
				{lists.map((list, index) => (
					<li key={list}>
						<button type="button" onClick={() => handleClick(index)}>
							select {list}
						</button>
					</li>
				))}
			</ul>

			<List
				title={lists[selectedIndex]}
				storageKey={lists[selectedIndex]}
				isSelectable
				quantitySelect={lists[selectedIndex] === 'monsters'}
				onSelect={handleSelect}
			/>
		</div>
	);
};

export default EncounterForm;
