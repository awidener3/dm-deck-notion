import QuantitySelect from './QuantitySelect';
import { getLocalStorageItemById } from '../../utils';

const SelectedList = ({ name, remove, getValues, setValue }) => {
	const items = getValues(name);

	const styles = {
		container: 'flex-1',
		title: 'border-b mb-1',
		list: 'flex flex-col gap-2',
		message: 'text-sm italic py-5',
	};

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>selected {name}</h2>

			{items && (
				<ul className={styles.list}>
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
				<p className={styles.message}>
					No {name} yet, use the lists below to select some {name}
				</p>
			)}
		</section>
	);
};

const SelectedItem = ({ storageKey, id, remove, valueIndex }) => {
	const data = getLocalStorageItemById(storageKey, id);

	const styles = {
		li: 'flex justify-between',
		button: 'text-red-600 text-lg',
	};

	return (
		<li key={id} className={styles.li}>
			{data.name}{' '}
			<button type="button" className={styles.button} onClick={() => remove(valueIndex)}>
				&times;
			</button>
		</li>
	);
};

export default SelectedList;
