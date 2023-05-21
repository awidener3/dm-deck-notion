import List from '../List/List';

const Encounters = () => {
	const config = {
		storageKey: 'encounters',
		title: 'Encounters',
		canAdd: true,
		canRun: true,
		canEdit: true,
	};

	return <List {...config} />;
};

export default Encounters;
