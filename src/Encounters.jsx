import List from './components/List';

const Encounters = () => {
	const config = {
		storageKey: 'encounters',
		title: 'Encounters',
		canAdd: true,
		canRun: true,
		isEditable: true,
	};

	return <List {...config} />;
};

export default Encounters;
