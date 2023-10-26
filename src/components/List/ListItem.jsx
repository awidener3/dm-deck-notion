import { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { FaRunning } from 'react-icons/fa';

const ListItem = (props) => {
	const [expanded, setExpanded] = useState(false);

	const handleSelect = () => {
		setSelected(true);
		props.onSelect(props.item.id);
	};

	const handleRun = () => props.onRun(props.item.id);
	const handleView = () => props.onView(props.item.id);
	const handleEdit = () => props.onEdit(props.item.id);
	const handleDelete = () => props.onDelete(props.item.id);

	const getExpandedInfo = () => {
		if (props.title.toLowerCase() === 'encounters') {
			return <EncounterInfo props={props} handleRun={handleRun} handleView={handleView} />;
		}

		if (props.title.toLowerCase() === 'monsters') {
			return <MonsterInfo handleView={handleView} />;
		}

		if (props.title.toLowerCase() === 'characters') {
			return <CharacterInfo handleView={handleView} />;
		}

		if (props.title.toLowerCase() === 'spells') {
			return <SpellInfo handleView={handleView} />;
		}
	};

	// span to display after list item name (if array of subtitleKeys)
	const subtitle =
		props.subtitleKeys.length > 0 ? <span className="font-thin italic">({props.item[props.subtitleKeys]})</span> : null;

	return (
		<li className="border-b py-1">
			<div className="flex justify-between">
				<h2 className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => setExpanded(!expanded)}>
					{expanded ? <AiOutlineUp /> : <AiOutlineDown />}
					{props.item.name}
					{subtitle}
				</h2>

				<section className="flex gap-2">
					{props.canRun && (
						<ListButton handler={handleRun}>
							<FaRunning />
						</ListButton>
					)}

					{props.editable && (
						<>
							<ListButton handler={handleEdit}>
								<AiOutlineEdit />
							</ListButton>
							<ListButton handler={handleDelete}>
								<AiOutlineDelete />
							</ListButton>
						</>
					)}

					{props.selectable && <ListButton text={'select'} handler={handleSelect} />}
				</section>
			</div>

			{expanded && getExpandedInfo()}
		</li>
	);
};

const ListButton = ({ handler, children }) => (
	<button className="hover:text-[color:var(--text-highlight)] text-sm" type="button" onClick={handler}>
		{children}
	</button>
);

const EncounterInfo = ({ props, handleRun, handleView }) => {
	return (
		<div className="p-2 ml-3 flex gap-2 text-sm border-t">
			{props.canRun && (
				<button className="border rounded px-2 py-1 mt-2 text-sm w-max hover:bg-gray-100" onClick={handleRun}>
					Run
				</button>
			)}
			<button className="border rounded px-2 py-1 mt-2 text-sm w-max hover:bg-gray-100" onClick={handleView}>
				View
			</button>
		</div>
	);
};

const MonsterInfo = ({ handleView }) => {
	return (
		<div className="p-2 ml-3 flex gap-2 text-sm border-t">
			<button className="border rounded px-2 py-1 mt-2 text-sm w-max hover:bg-gray-100" onClick={handleView}>
				View
			</button>
		</div>
	);
};

const CharacterInfo = ({ handleView }) => {
	return (
		<div className="p-2 ml-3 flex gap-2 text-sm border-t">
			<button className="border rounded px-2 py-1 mt-2 text-sm w-max hover:bg-gray-100" onClick={handleView}>
				View
			</button>
		</div>
	);
};

const SpellInfo = ({ handleView }) => {
	return (
		<div className="p-2 ml-3 flex gap-2 text-sm border-t">
			<button className="border rounded px-2 py-1 mt-2 text-sm w-max hover:bg-gray-100" onClick={handleView}>
				View
			</button>
		</div>
	);
};

export default ListItem;
