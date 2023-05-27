import Form from '../Form/Form';
import { Link } from 'react-router-dom';
import { monsterProps } from '../../utils/formProperties';

const MonsterForm = () => {
	return (
		<div className="py-4">
			<Form storageKey={'monsters'} title={'Monster'} properties={monsterProps} />

			<p className="text-center">
				Do you have a pre-made JSON source? <Link to={'./source'}>add source here</Link>
			</p>
		</div>
	);
};

export default MonsterForm;
