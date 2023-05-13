import useLocalStorage from '../hooks/useLocalStorage';
import InputWithLabel from './InputWithLabel';
import FormFooter from './FormFooter';
import ListPicker from './ListPicker';
import SelectedList from './SelectedList';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLocalStorageItemById } from '../utils';
import { encounterProps } from '../utils/formProperties';

const EncounterForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [items, setItems] = useLocalStorage('encounters', []);

	const {
		control,
		register,
		handleSubmit,
		reset,
		getValues,
		setValue,
		formState,
		formState: { isSubmitSuccessful },
	} = useForm({ values: getLocalStorageItemById('encounters', id) || null });

	// characters: ['id-1', 'id-2']
	const { append: appendCharacter, remove: removeCharacter } = useFieldArray({
		control,
		name: 'characters',
	});

	// monsters:[{ id: 1, quantity: 1}, ...]
	const { append: appendMonster, remove: removeMonster } = useFieldArray({
		control,
		name: 'monsters',
	});

	// Reset field on successful submit
	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [formState, reset]);

	const onSubmit = (data) => {
		id ? updateItems(data) : addItem({ ...data, id: crypto.randomUUID() });
		navigate(-1);
	};

	const addItem = (item) => setItems([...items, item]);
	const updateItems = (updatedItem) => {
		setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
	};

	return (
		<>
			<div className="flex justify-between items-center pb-1 border-b">
				<h2 className="text-lg text-[color:var(--text-highlight)]">{id ? 'Edit' : 'New'} Encounter</h2>
				<Link to={-1}>go back</Link>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 gap-2">
				<InputWithLabel {...encounterProps} register={register} />

				<div className="flex">
					<SelectedList name={'characters'} remove={removeCharacter} getValues={getValues} />
					<SelectedList name={'monsters'} remove={removeMonster} getValues={getValues} setValue={setValue} />
				</div>

				<FormFooter reset={reset} existing={id} />
			</form>

			<hr className="my-2" />

			<ListPicker appendCharacter={appendCharacter} appendMonster={appendMonster} getValues={getValues} />
		</>
	);
};

export default EncounterForm;
