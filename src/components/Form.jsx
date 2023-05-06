import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputWithLabel from './InputWithLabel';
import { actionDefaults } from '../utils/formProperties';
import { getLocalStorageItemById } from '../utils';

const Form = ({ storageKey, title, properties, existing = null }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [items, setItems] = useLocalStorage(storageKey, []);

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm({ values: getLocalStorageItemById(storageKey, id) || null });

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [formState, reset]);

	const onSubmit = (data) => {
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
				<h2 className="text-lg text-[color:var(--text-highlight)]">
					{existing ? 'Edit' : 'New'} {title}
				</h2>
				<Link to={'../'}>go back</Link>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 gap-2">
				<div className="grid grid-cols-2 gap-2">
					{properties.map((property) =>
						property.type === 'nested' ? (
							<NestedFieldArray key={property.name} {...property} {...{ control, register }} />
						) : (
							<InputWithLabel key={property.name} {...property} register={register} />
						)
					)}
				</div>

				<FormFooter reset={reset} existing={existing} />
			</form>
		</>
	);
};

const NestedFieldArray = ({ name, fullWidth = false, properties, control, register }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: name, // 'actions', 'special_abilities, etc.
	});

	const handleAdd = () => append(actionDefaults);

	return (
		<span className={fullWidth ? 'flex flex-col col-span-2' : 'flex flex-col'}>
			<div className="flex justify-between border-b">
				<h2>{name.replace('_', ' ')}</h2>
				<button type="button" onClick={handleAdd}>
					add
				</button>
			</div>

			{fields.map((field, index) => (
				<div key={field.name}>
					{properties.map((property) => (
						<span key={name + '_' + property.name} className={fullWidth ? 'flex flex-col col-span-2' : 'flex flex-col'}>
							<label className="italic">{property.name}</label>
							{
								<input
									type={property.type}
									className="p-2 font-thin"
									defaultValue={field[property.name]}
									placeholder={property.placeholder}
									autoComplete="off"
									min={property.min}
									max={property.max}
									minLength={property.minLength}
									maxLength={property.maxLength}
									{...register(`${name}.${index}.${property.name}`)}
								/>
							}
						</span>
					))}

					{fields.length > 0 && (
						<button className="mr10" onClick={() => remove(index)}>
							Remove
						</button>
					)}
				</div>
			))}
		</span>
	);
};

const FormFooter = ({ reset, existing }) => (
	<span className="flex justify-around">
		<button type="button" onClick={() => reset()}>
			reset
		</button>
		<button type="submit">{existing ? 'update' : 'save'}</button>
	</span>
);

export default Form;
