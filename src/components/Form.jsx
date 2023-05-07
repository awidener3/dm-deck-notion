import useLocalStorage from '../hooks/useLocalStorage';
import FormFooter from './FormFooter';
import InputWithLabel from './InputWithLabel';
import NestedFieldArray from './NestedFieldArray';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
				<Link to={-1}>go back</Link>
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

export default Form;
