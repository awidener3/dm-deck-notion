import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

const Form = ({ storageKey, title, properties, existing = null }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm();

	const [items, setItems] = useLocalStorage(storageKey, []);

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [formState, reset]);

	const addItem = (item) => setItems([...items, item]);
	const updateItems = (updatedItem) => setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));

	const onSubmit = (data) => {
		existing ? updateItems({ ...data, id: existing.id }) : addItem({ ...data, id: crypto.randomUUID() });
	};

	return (
		<>
			<div className="flex justify-between items-center pb-1 border-b">
				<h2 className="text-lg text-[color:var(--text-highlight)]">
					{existing ? 'Edit' : 'New'} {title}
				</h2>
				<Link to={'../'}>Back</Link>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 gap-2">
				{properties.map((property) => (
					<InputWithLabel key={property.name} {...property} register={register} />
				))}

				<button type="submit">{existing ? 'update' : 'save'}</button>
			</form>
		</>
	);
};

const InputWithLabel = ({ name, type = 'text', min = null, max = null, value = '', required = false, register }) => {
	return (
		<div className="flex flex-col">
			<label className="italic">{name.replace('_', ' ')}</label>
			<input
				type={type}
				className="p-2"
				defaultValue={value}
				placeholder={name.replace('_', ' ').toUpperCase()}
				autoComplete="off"
				min={min}
				max={max}
				{...register(name, { required })}
			/>
		</div>
	);
};

export default Form;
