import useLocalStorage from '../../hooks/useLocalStorage';
import Pagination from './Pagination';
import ListItem from './ListItem';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils';
import { AiOutlineSearch } from 'react-icons/ai';

const List = ({
	title,
	subtitleKeys = [],
	storageKey = null,
	items = [],
	selected = [],
	canAdd = false,
	canRun = false,
	canEdit = false,
	canSelect = false,
	canFilter = true,
	paginate = true,
	onSelect,
}) => {
	const navigate = useNavigate();
	const [listItems, setListItems] = useLocalStorage(storageKey, []);
	const [filterTerm, setFilterTerm] = useState('');
	const [pagination, setPagination] = useState({
		currentPage: 1,
		perPage: 15,
		upperPageBound: 4,
		lowerPageBound: 0,
		pageBound: 4,
		previousBtnActive: false,
		nextBtnActive: true,
	});

	const lastItemIndex = pagination.currentPage * pagination.perPage;
	const firstItemIndex = lastItemIndex - pagination.perPage;

	// If a filter term is in state, use that to filter listItems first
	const currentItems =
		filterTerm !== ''
			? listItems
					// sort alphabetically
					.sort((a, b) => {
						if (a.name > b.name) return 1;
						if (a.name < b.name) return -1;
						return 0;
					})
					// remove items not included in filter
					.filter((item) => item.name.toLowerCase().includes(filterTerm.toLowerCase()))
					// show based on pagination settings
					.slice(firstItemIndex, lastItemIndex)
			: listItems
					.sort((a, b) => {
						if (a.name > b.name) return 1;
						if (a.name < b.name) return -1;
						return 0;
					})
					.slice(firstItemIndex, lastItemIndex);

	// Optional storage key to retrieve all items
	useEffect(() => {
		storageKey ? setListItems(() => getLocalStorageItem(storageKey)) : setListItems(items);
	}, [storageKey]);

	const handleAdd = () => navigate(`/${title.toLowerCase()}/new`);
	const handleFilter = (e) => setFilterTerm(e.target.value);
	const handleRun = (itemId) => navigate(`/${title.toLowerCase()}/run/${itemId}`);
	const viewItem = (itemId) => navigate(`/${title.toLowerCase()}/${itemId}`);
	const editItem = (itemId) => navigate(`/${title.toLowerCase()}/edit/${itemId}`);
	const deleteItem = (itemId) => {
		// Item is not an encounter, safely remove from storage
		if (title.toLowerCase() !== 'encounters') {
			setListItems(listItems.filter((item) => item.id !== itemId));
			return;
		}

		// Item is an encounter, remove all instances from "run list" if exists
		const runs = getLocalStorageItem('runs');
		if (runs && runs.some((run) => run.id === itemId)) {
			const updated = runs.filter((run) => run.id !== itemId);
			setLocalStorageItem('runs', updated);
		}

		// If encounter was the active run, set to {}
		const activeRun = getLocalStorageItem('active_run');
		if (activeRun && activeRun.id === itemId) {
			setLocalStorageItem('active_run', {});
		}

		// Remove as normal
		setListItems(listItems.filter((item) => item.id !== itemId));
	};

	const listItemProps = {
		subtitleKeys,
		canRun,
		onSelect,
		title,
		editable: canEdit,
		selectable: canSelect,
		onView: viewItem,
		onEdit: editItem,
		onDelete: deleteItem,
		onRun: handleRun,
	};

	const renderItems = currentItems
		// Filter out "selected" items
		.filter((item) => !selected.includes(item.id) && !selected.some((i) => i.id === item.id))
		// Sort alphabetically
		.sort((a, b) => {
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		})
		// Map list items
		.map((item) => <ListItem key={item.id} item={item} {...listItemProps} />);

	const styles = {
		instruction: 'italic pt-2',
		noItems: 'text-center p-10 italic',
	};

	return (
		<section className="p-4 flex flex-col flex-1 w-full max-w-2xl bg-[var(--bg-secondary)] text-[color:var(--text-primary)] ">
			<section className="mt-3 flex justify-between">
				<h2 className="text-xl text-[color:var(--text-highlight)]">{title}</h2>
				{canAdd && (
					<button className="" onClick={handleAdd}>
						+ Add
					</button>
				)}
			</section>

			{canFilter && (
				<div className="relative">
					<AiOutlineSearch className="absolute text-gray-600 top-1/2 transform -translate-y-1/2 left-1" />
					<input
						type="text"
						className="w-72 border rounded ps-5 text-sm"
						value={filterTerm}
						onChange={handleFilter}
						placeholder={'Search by name'}
					/>
				</div>
			)}

			{renderItems.length > 0 && (
				<>
					<ul>{renderItems}</ul>

					{paginate && (
						<Pagination
							pagination={pagination}
							setPagination={setPagination}
							listItems={
								filterTerm
									? listItems.filter(({ name }) => name.toLowerCase().includes(filterTerm.toLowerCase())) // filtered list
									: listItems // all monsters
							}
						/>
					)}
				</>
			)}

			{!filterTerm && renderItems.length === 0 && <p className={styles.noItems}>no {storageKey}</p>}
		</section>
	);
};

export default List;
