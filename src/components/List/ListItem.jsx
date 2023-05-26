const ListItem = (props) => {
	const styles = {
		listItem: 'flex justify-between items-center border-b border-b-slate-500 py-1',
		itemTitle: 'flex gap-2 text-white',
		itemActions: 'flex gap-2',
	};

	const handleSelect = () => {
		setSelected(true);
		props.onSelect(props.item.id);
	};

	const handleRun = () => props.onRun(props.item.id);
	const handleView = () => props.onView(props.item.id);
	const handleEdit = () => props.onEdit(props.item.id);
	const handleDelete = () => props.onDelete(props.item.id);

	// span to display after list item name (if array of subtitleKeys)
	const subtitle =
		props.subtitleKeys.length > 0 ? <span className="font-thin italic">({props.item[props.subtitleKeys]})</span> : null;

	return (
		<li className={styles.listItem}>
			<a className={styles.itemTitle} onClick={handleView}>
				{props.item.name}
				{subtitle}
			</a>

			<section className={styles.itemActions}>
				{props.canRun && <ListButton text={'run'} handler={handleRun} />}

				{props.editable && (
					<>
						<ListButton text={'edit'} handler={handleEdit} />
						<ListButton text={'delete'} handler={handleDelete} />
					</>
				)}

				{props.selectable && <ListButton text={'select'} handler={handleSelect} />}
			</section>
		</li>
	);
};

const ListButton = ({ handler, text }) => (
	<button className="text-[color:var(--text-highlight)] text-sm" type="button" onClick={handler}>
		{text}
	</button>
);

export default ListItem;
