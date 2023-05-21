import CardView from '../CardView';
import EncounterCard from './EncounterCard';

const Encounter = () => {
	return (
		<CardView storageKey={'encounters'}>
			<EncounterCard storageKey={'encounters'} />
		</CardView>
	);
};

export default Encounter;
