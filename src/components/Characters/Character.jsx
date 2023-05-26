import CardView from '../Card/CardView';
import CharacterCard from './CharacterCard';

const Character = () => (
	<CardView storageKey={'characters'}>
		<CharacterCard />
	</CardView>
);

export default Character;
