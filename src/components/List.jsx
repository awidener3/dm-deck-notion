import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const List = ({ title, storageKey, isEditable = false }) => {
	const styles = {
		heading: 'mt-3 flex justify-between border-b-2 border-b-slate-500',
		headingTitle: 'text-lg text-[color:var(--text-highlight)]',
		headingAdd: 'text-sm',
	};

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
				{listItems.map((item) => (
					<ListItem
						key={item.id}
						item={item}
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

const ListItem = ({ item, editable, onView, onEdit, onDelete }) => {
	const styles = {
		listItem: 'flex justify-between items-center border-b border-b-slate-500 py-1',
	};

	return (
		<li className={styles.listItem}>
			<div>{item.name}</div>

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
