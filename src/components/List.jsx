const List = ({ title, items, onAdd, children }) => {
	const styles = {
		heading: 'mt-3 flex justify-between border-b-2 border-b-slate-500',
		headingTitle: 'text-lg text-[color:var(--text-highlight)]',
		headingAdd: 'text-sm',
	};
	return (
		<>
			<div className={styles.heading}>
				<h2 className={styles.headingTitle}>{title}</h2>
				<button className={styles.headingAdd} onClick={onAdd}>
					add
				</button>
			</div>

			<ul>
				{items.map((item) => (
					<ListItem key={item.id} item={item} actions={children} />
				))}
			</ul>
		</>
	);
};

const ListItem = ({ item, actions }) => {
	const styles = {
		listItem: 'flex justify-between items-center border-b border-b-slate-500 py-1',
	};

	return (
		<li className={styles.listItem}>
			<div>{item.name}</div>
			<div className="flex gap-2">{actions}</div>
		</li>
	);
};

export default List;
