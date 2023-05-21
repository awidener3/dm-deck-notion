import { useState } from 'react';

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
			<div className="flex gap-2">{props.item.name}</div>

			<div className="flex gap-2">
				<ListButton text={'view'} handler={handleView} />

				{props.canRun && <ListButton text={'run'} handler={handleRun} />}

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

export default ListItem;
