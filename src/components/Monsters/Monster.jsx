import CardView from '../Card/CardView';
import MonsterCard from './MonsterCard';

const Monster = () => {
	return (
		<CardView storageKey={'monsters'}>
			<MonsterCard />
		</CardView>
	);
};

export default Monster;
