import List from './List';

const Spells = () => {
	return (
		<>
			<List title={'spells'} storageKey={'spells'} canFilter paginate />
		</>
	);
};

export default Spells;
