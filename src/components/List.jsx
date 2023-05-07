import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { getLocalStorageItem } from '../utils';

const List = ({
	title,
	subtitleKey,
	storageKey,
	isEditable = false,
	isSelectable = false,
	quantitySelect,
	onSelect,
}) => {
	const styles = {
		heading: 'mt-3 flex justify-between border-b-2 border-b-slate-500',
		headingTitle: 'text-lg text-[color:var(--text-highlight)]',
		headingAdd: 'text-sm',
	};

	// todo: add pagination to reduce page scroll
	const [listItems, setListItems] = useLocalStorage(storageKey, []);

	useEffect(() => {
		setListItems(() => getLocalStorageItem(storageKey));
	}, [storageKey]);

	const navigate = useNavigate();

	const handleAdd = () => navigate(`/${title}/new`);
	const viewItem = (itemId) => navigate(`/${title}/${itemId}`);
	const editItem = (itemId) => navigate(`/${title}/edit/${itemId}`);
	const deleteItem = (itemId) => setListItems(listItems.filter((item) => item.id !== itemId));

	return (
		<>
			<div className={styles.heading}>
				<h2 className={styles.headingTitle}>{title}</h2>
				<button className={styles.headingAdd} onClick={handleAdd}>
					add
				</button>
			</div>

			<ul>
				{listItems
					.sort((a, b) => {
						if (a.name > b.name) return 1;
						if (a.name < b.name) return -1;
						return 0;
					})
					.map((item) => (
						<ListItem
							key={item.id}
							item={item}
							subtitleKey={subtitleKey}
							editable={isEditable}
							selectable={isSelectable}
							onView={viewItem}
							onEdit={editItem}
							onSelect={onSelect}
							onDelete={deleteItem}
							quantitySelect={quantitySelect}
						/>
					))}
			</ul>
		</>
	);
};

const ListItem = ({ item, subtitleKey, editable, selectable, onView, onEdit, onSelect, onDelete, quantitySelect }) => {
	const styles = {
		listItem: 'flex justify-between items-center border-b border-b-slate-500 py-1',
		selectedListItem: 'flex justify-between items-center border-b border-b-slate-500 py-1 bg-[var(--text-highlight)]',
	};

	const [selected, setSelected] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const handleSelect = (id, quantity) => {
		setSelected(true);
		onSelect(id, quantity);
	};

	return (
		<li className={selected ? styles.selectedListItem : styles.listItem}>
			<div>
				{item.name} {subtitleKey && item[subtitleKey] && <span className="italic">({item[subtitleKey]})</span>}
			</div>

			<div className="text-[color:var(--text-highlight)] text-sm flex gap-2">
				<button type="button" onClick={() => onView(item.id)}>
					view
				</button>
				{editable && (
					<>
						<button type="button" onClick={() => onEdit(item.id)}>
							edit
						</button>
						<button type="button" onClick={() => onDelete(item.id)}>
							delete
						</button>
					</>
				)}
				{selectable && (
					<button type="button" onClick={() => handleSelect(item.id, quantity)}>
						select
					</button>
				)}
				{quantitySelect && (
					<input type="number" onChange={() => setQuantity(quantity + 1)} value={quantity} min={1} max={25} />
				)}
			</div>
		</li>
	);
};

export default List;
