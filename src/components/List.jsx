import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const List = ({ title, subtitleKey, storageKey, isEditable = false }) => {
	const styles = {
		heading: 'mt-3 flex justify-between border-b-2 border-b-slate-500',
		headingTitle: 'text-lg text-[color:var(--text-highlight)]',
		headingAdd: 'text-sm',
	};

	// todo: add pagination to reduce page scroll
	const [listItems, setListItems] = useLocalStorage(storageKey, []);

	const navigate = useNavigate();

	const handleAdd = () => navigate('./new');
	const viewItem = (itemId) => navigate(`./${itemId}`);
	const editItem = (itemId) => navigate(`./edit/${itemId}`);
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
							onView={viewItem}
							onEdit={editItem}
							onDelete={deleteItem}
						/>
					))}
			</ul>
		</>
	);
};

const ListItem = ({ item, subtitleKey, editable, onView, onEdit, onDelete }) => {
	const styles = {
		listItem: 'flex justify-between items-center border-b border-b-slate-500 py-1',
	};

	return (
		<li className={styles.listItem}>
			<div>
				{item.name} {subtitleKey && item[subtitleKey] && <span className="italic">({item[subtitleKey]})</span>}
			</div>

			<div className="text-[color:var(--text-highlight)] text-sm flex gap-2">
				<button onClick={() => onView(item.id)}>view</button>
				{editable && (
					<>
						<button onClick={() => onEdit(item.id)}>edit</button>
						<button onClick={() => onDelete(item.id)}>delete</button>
					</>
				)}
			</div>
		</li>
	);
};

export default List;
