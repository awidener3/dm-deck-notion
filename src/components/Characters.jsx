import List from './List';

const Characters = () => {
	const config = {
		storageKey: 'characters',
		title: 'Characters',
		subtitleKeys: ['class'],
		canAdd: true,
		canEdit: true,
	};

	return <List {...config} />;
};

export default Characters;
