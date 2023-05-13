import List from './List';
import { useState } from 'react';

const ListPicker = ({ lists = ['characters', 'monsters'], appendCharacter, appendMonster, getValues }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleClick = (index) => setSelectedIndex(index);

	const handleSelect = (id) =>
		lists[selectedIndex] === 'characters' ? appendCharacter(id) : appendMonster({ id, quantity: 1 });

	return (
		<>
			<ul className="flex gap-5">
				{lists.map((list, index) => (
					<li key={list}>
						<button type="button" onClick={() => handleClick(index)}>
							select {list}
						</button>
					</li>
				))}
			</ul>

			<List
				title={lists[selectedIndex]}
				storageKey={lists[selectedIndex]}
				selected={getValues(lists[selectedIndex])}
				canSelect
				onSelect={handleSelect}
			/>
		</>
	);
};

export default ListPicker;
