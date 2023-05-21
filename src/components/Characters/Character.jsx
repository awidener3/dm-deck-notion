import CardView from '../CardView';
import CharacterCard from './CharacterCard';

const Character = () => (
	<CardView storageKey={'characters'}>
		<CharacterCard />
	</CardView>
);

export default Character;
