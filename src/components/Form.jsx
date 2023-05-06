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
				<Link to={'../'}>back</Link>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 gap-2">
				<div className="grid grid-cols-2 gap-2">
					{properties.map((property) => (
						<InputWithLabel key={property.name} {...property} register={register} />
					))}
				</div>

				<button type="submit" className="text-right">
					{existing ? 'update' : 'save'}
				</button>
			</form>
		</>
	);
};

const InputWithLabel = ({
	name,
	type = 'text',
	placeholder,
	min,
	max,
	minLength,
	maxLength,
	value,
	options = [],
	fullWidth = false,
	required = false,
	register,
}) => {
	return (
		<span className={fullWidth ? 'flex flex-col col-span-2' : 'flex flex-col'}>
			<label className="italic">{name.replace('_', ' ')}</label>
			{type === 'select' ? (
				<select defaultValue={'DEFAULT'}>
					<option value="DEFAULT" disabled>
						select
					</option>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			) : (
				<input
					type={type}
					className="p-2 font-thin"
					defaultValue={value}
					placeholder={placeholder}
					autoComplete="off"
					min={min}
					max={max}
					minLength={minLength}
					maxLength={maxLength}
					{...register(name, { required })}
				/>
			)}
		</span>
	);
};

export default Form;
