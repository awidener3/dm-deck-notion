import List from './components/List';

const Monsters = () => {
	const config = {
		storageKey: 'monsters',
		title: 'Monsters',
		subtitleKeys: ['source'],
		canAdd: true,
		isEditable: true,
	};

	return <List {...config} />;
};

export default Monsters;
