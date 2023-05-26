import Form from '../Form/Form';
import { Link } from 'react-router-dom';
import { monsterProps } from '../../utils/formProperties';

const MonsterForm = () => {
	return (
		<>
			<p className="flex gap-2">
				Do you have a pre-made JSON source?
				<Link className="text-right" to={'./source'}>
					add source here
				</Link>
			</p>
			<Form storageKey={'monsters'} title={'Monster'} properties={monsterProps} />
		</>
	);
};

export default MonsterForm;
