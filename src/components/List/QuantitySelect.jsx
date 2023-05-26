import { useState, useEffect } from 'react';
import { getLocalStorageItemById } from '../../utils';

const QuantitySelect = ({ item, valueIndex, setValue, storageKey, remove }) => {
	const [quantity, setQuantity] = useState(item.quantity);

	// On quantity change, update the form value for a monsters quantity
	useEffect(() => {
		setValue([storageKey, valueIndex, 'quantity'].join('.'), Number(quantity));
	}, [quantity]);

	const data = getLocalStorageItemById(storageKey, item.id);

	const handleChange = (e) => setQuantity(e.target.value);
	const handleRemove = () => remove(valueIndex);

	const styles = {
		li: 'flex gap-2 justify-between items-center',
		section: 'flex gap-1',
		quantity: 'w-12 px-1',
		button: 'text-red-600',
	};

	return (
		<li key={item.id} className={styles.li}>
			{data.name}
			<section className={styles.section}>
				<input className={styles.quantity} type="number" value={quantity} onChange={handleChange} />
				<button type="button" className={styles.button} onClick={handleRemove}>
					&times;
				</button>
			</section>
		</li>
	);
};

export default QuantitySelect;
