import MonsterCard from './components/MonsterCard';
import NotFound from './NotFound';
import { Link, useParams } from 'react-router-dom';
import { getLocalStorageItemById } from './utils';

function Monster() {
	const { id } = useParams();
	const monster = getLocalStorageItemById('monsters', id);

	return (
		<>
			<Link to="../">Back</Link>

			{monster ? <MonsterCard monster={monster} /> : <NotFound />}
		</>
	);
}

export default Monster;
