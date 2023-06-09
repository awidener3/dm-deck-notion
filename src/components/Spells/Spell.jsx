import CardView from '../Card/CardView';
import SpellCard from './SpellCard';

const Spell = () => {
	return (
		<CardView storageKey={'spells'}>
			<SpellCard />
		</CardView>
	);
};

export default Spell;
