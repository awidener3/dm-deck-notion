import List from '../List';

const Monsters = () => {
	const config = {
		storageKey: 'monsters',
		title: 'Monsters',
		subtitleKeys: ['source'],
		canAdd: true,
		canEdit: true,
	};

	return <List {...config} />;
};

export default Monsters;
