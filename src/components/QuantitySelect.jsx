import { useState, useEffect } from 'react';
import { getLocalStorageItemById } from '../utils';

const QuantitySelect = ({ item, valueIndex, setValue, storageKey, remove }) => {
	const [quantity, setQuantity] = useState(item.quantity);

	// On quantity change, update the form value for a monsters quantity
	useEffect(() => {
		setValue([storageKey, valueIndex, 'quantity'].join('.'), Number(quantity));
	}, [quantity]);

	const data = getLocalStorageItemById(storageKey, item.id);

	const handleChange = (e) => setQuantity(e.target.value);

	const handleRemove = () => remove(valueIndex);

	return (
		<li key={item.id} className="flex gap-2 justify-between items-center">
			{data.name}
			<div className="flex gap-1">
				<input className="w-12 px-1" type="number" value={quantity} onChange={handleChange} />
				<button type="button" className="text-red-600" onClick={handleRemove}>
					&times;
				</button>
			</div>
		</li>
	);
};

export default QuantitySelect;
