import QuantitySelect from './QuantitySelect';
import { getLocalStorageItemById } from '../utils';

const SelectedList = ({ name, remove, getValues, setValue }) => {
	const items = getValues(name);

	return (
		<div className="flex-1">
			<h2 className="border-b mb-1">selected {name}</h2>
			<ul className="flex flex-col gap-2">
				{items &&
					items.map((item, index) =>
						item.quantity ? (
							<QuantitySelect
								key={item.id}
								valueIndex={index}
								item={item}
								remove={remove}
								setValue={setValue}
								storageKey={name}
							/>
						) : (
							<SelectedItem key={item} storageKey={name} id={item} remove={remove} valueIndex={index} />
						)
					)}
			</ul>
		</div>
	);
};

const SelectedItem = ({ storageKey, id, remove, valueIndex }) => {
	const data = getLocalStorageItemById(storageKey, id);

	return (
		<li key={id} className="flex justify-between">
			{data.name}{' '}
			<button type="button" className="text-red-600" onClick={() => remove(valueIndex)}>
				&times;
			</button>
		</li>
	);
};

export default SelectedList;
