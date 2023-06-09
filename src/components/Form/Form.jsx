import useLocalStorage from '../../hooks/useLocalStorage';
import FormFooter from './FormFooter';
import InputWithLabel from './InputWithLabel';
import NestedFieldArray from './NestedFieldArray';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLocalStorageItemById } from '../../utils';

const Form = ({ storageKey, title, properties, isEditing = null }) => {
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

	const cleanObject = (object) => {
		Object.entries(object).forEach(([k, v]) => {
			if (v && typeof v === 'object') cleanObject(v);
			if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined || v.length === 0) {
				if (Array.isArray(object)) object.splice(k, 1);
				else if (!(v instanceof Date)) delete object[k];
			}
		});
		return object;
	};

	const onSubmit = (data) => {
		cleanObject(data);
		isEditing ? updateItems(data) : addItem({ ...data, id: crypto.randomUUID() });

		navigate(-1);
	};

	const addItem = (item) => setItems([...items, item]);
	const updateItems = (updatedItem) => setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));

	const styles = {
		header: 'flex justify-between items-center pb-1 border-b',
		h2: 'text-lg text-[color:var(--text-highlight)]',
		form: 'flex flex-col mt-2 gap-2',
		formContent: 'grid grid-cols-2 gap-2',
	};

	return (
		<>
			<section className={styles.header}>
				<h2 className={styles.h2}>
					{isEditing ? 'Edit' : 'New'} {title}
				</h2>
				<Link to={-1}>go back</Link>
			</section>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<section className={styles.formContent}>
					{properties.map((property) =>
						property.type === 'nested' ? (
							<NestedFieldArray key={property.name} {...property} {...{ control, register }} />
						) : (
							<InputWithLabel key={property.name} {...property} register={register} />
						)
					)}
				</section>

				<FormFooter reset={reset} isEditing={isEditing} />
			</form>
		</>
	);
};

export default Form;
