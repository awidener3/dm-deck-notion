import List from './List';
import { useState } from 'react';

const ListPicker = ({ lists = ['characters', 'monsters'], appendCharacter, appendMonster, getValues }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleClick = (index) => setSelectedIndex(index);

	const handleSelect = (id) =>
		lists[selectedIndex] === 'characters' ? appendCharacter(id) : appendMonster({ id, quantity: 1 });

	return (
		<>
			<ul className="flex justify-around">
				{lists.map((list, index) => (
					<li key={list}>
						<button
							className={index === selectedIndex ? 'text-[color:var(--text-highlight)]' : null}
							type="button"
							onClick={() => handleClick(index)}
						>
							select {list}
						</button>
					</li>
				))}
			</ul>

			{lists.map(
				(list) =>
					lists[selectedIndex] === list && (
						<List
							key={list}
							title={list}
							storageKey={list}
							selected={getValues(list)}
							canSelect
							onSelect={handleSelect}
						/>
					)
			)}
		</>
	);
};

export default ListPicker;
