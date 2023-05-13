import useLocalStorage from '../hooks/useLocalStorage';
import Pagination from './Pagination';
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
	const [listItems, setListItems] = useLocalStorage(storageKey, []);

	const [pagination, setPagination] = useState({
		currentPage: 1,
		perPage: 15,
		upperPageBound: 3,
		lowerPageBound: 0,
		pageBound: 3,
		previousBtnActive: false,
		nextBtnActive: true,
	});

	const lastItemIndex = pagination.currentPage * pagination.perPage;
	const firstItemIndex = lastItemIndex - pagination.perPage;
	const currentItems = listItems.slice(firstItemIndex, lastItemIndex);

	useEffect(() => {
		console.log(pagination);
	}, [pagination]);

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

	const renderItems = currentItems
		.sort((a, b) => {
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		})
		.filter((item) => !selected.includes(item.id) && !selected.some((i) => i.id === item.id))
		.map((item) => <ListItem key={item.id} item={item} {...listItemProps} />);

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

			{renderItems.length > 0 && <ul>{renderItems}</ul>}

			<Pagination pagination={pagination} setPagination={setPagination} listItems={listItems} />

			{renderItems.length === 0 && <p className="text-center p-10 italic">no {storageKey}</p>}
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
