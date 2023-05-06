import useLocalStorage from '../hooks/useLocalStorage';
import InputWithLabel from './InputWithLabel';
import FormFooter from './FormFooter';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLocalStorageItemById } from '../utils';
import { encounterProps } from '../utils/formProperties';

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
				<h2 className="text-lg text-[color:var(--text-highlight)]">{existing ? 'Edit' : 'New'} Encounter</h2>
				<Link to={'../'}>go back</Link>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 gap-2">
				<div className="grid grid-cols-2 gap-2">
					<InputWithLabel {...encounterProps} register={register} />

					<ListPicker />
				</div>

				<FormFooter reset={reset} existing={existing} />
			</form>
		</>
	);
};

const ListPicker = () => {
	return <h1>list picker</h1>;
};

export default EncounterForm;
