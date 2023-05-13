import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLocalStorageItem } from '../utils';

const List = ({
	title,
	subtitleKeys = [],
	storageKey = '',
	items = [],
	selected = [],
	canAdd = false,
	canRun = false,
	canEdit = false,
	canSelect = false,
	onSelect,
}) => {
	const styles = {
		heading: 'mt-3 flex justify-between border-b-2 border-b-slate-500',
		headingTitle: 'text-lg text-[color:var(--text-highlight)]',
		headingAdd: 'text-sm',
	};

	// todo: add pagination to reduce page scroll
	const [listItems, setListItems] = useLocalStorage(storageKey, []);

	// Optional storage key to retrieve all items
	useEffect(() => {
		storageKey ? setListItems(() => getLocalStorageItem(storageKey)) : setListItems(items);
	}, [storageKey]);

	const navigate = useNavigate();

	const handleAdd = () => navigate(`/${title.toLowerCase()}/new`);

	const handleRun = (itemId) => navigate(`/${title.toLowerCase()}/run/${itemId}`);

	const viewItem = (itemId) => navigate(`/${title.toLowerCase()}/${itemId}`);

	const editItem = (itemId) => navigate(`/${title.toLowerCase()}/edit/${itemId}`);

	const deleteItem = (itemId) => setListItems(listItems.filter((item) => item.id !== itemId));

	const listItemProps = {
		subtitleKeys,
		canRun,
		onSelect,
		editable: canEdit,
		selectable: canSelect,
		onView: viewItem,
		onEdit: editItem,
		onDelete: deleteItem,
		onRun: handleRun,
	};

	return (
		<>
			<div className={styles.heading}>
				<h2 className={styles.headingTitle}>{title}</h2>
				{canAdd && (
					<button className={styles.headingAdd} onClick={handleAdd}>
						add
					</button>
				)}
			</div>

			<ul>
				{listItems
					.sort((a, b) => {
						if (a.name > b.name) return 1;
						if (a.name < b.name) return -1;
						return 0;
					})
					.map(
						(item) =>
							!selected.includes(item.id) &&
							!selected.some((i) => i.id === item.id) && <ListItem key={item.id} item={item} {...listItemProps} />
					)}
			</ul>
		</>
	);
};

const ListItem = (props) => {
	const [selected, setSelected] = useState(false);

	const styles = {
		listItem: 'flex justify-between items-center border-b border-b-slate-500 py-1',
		selectedListItem: 'flex justify-between items-center border-b border-b-slate-500 py-1 bg-[var(--text-highlight)]',
	};

	const handleSelect = () => {
		setSelected(true);
		props.onSelect(props.item.id);
	};

	const handleRun = () => props.onRun(props.item.id);
	const handleView = () => props.onView(props.item.id);
	const handleEdit = () => props.onEdit(props.item.id);
	const handleDelete = () => props.onDelete(props.item.id);

	const subtitle = false || <span className="italic">({props.item[props.subtitleKeys]})</span>;

	return (
		<li className={selected ? styles.selectedListItem : styles.listItem}>
			<div className="flex gap-2">
				{props.canRun && <ListButton text={'run'} handler={handleRun} />}
				{props.item.name}
			</div>

			<div className="flex gap-2">
				<ListButton text={'view'} handler={handleView} />

				{props.editable && (
					<>
						<ListButton text={'edit'} handler={handleEdit} />
						<ListButton text={'delete'} handler={handleDelete} />
					</>
				)}

				{props.selectable && <ListButton text={'select'} handler={handleSelect} />}
			</div>
		</li>
	);
};

const ListButton = ({ handler, text }) => (
	<button className="text-[color:var(--text-highlight)] text-sm" type="button" onClick={handler}>
		{text}
	</button>
);

export default List;
