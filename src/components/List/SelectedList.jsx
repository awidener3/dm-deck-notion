import QuantitySelect from './QuantitySelect';
import { getLocalStorageItemById } from '../../utils';

const SelectedList = ({ name, remove, getValues, setValue }) => {
	const items = getValues(name);

	return (
		<div className="flex-1">
			<h2 className="border-b mb-1">selected {name}</h2>

			{items && (
				<ul className="flex flex-col gap-2">
					{items.map((item, index) =>
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
			)}

			{(!items || items.length === 0) && (
				<p className="text-sm italic py-5">
					No {name} yet, use the lists below to select some {name}
				</p>
			)}
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
