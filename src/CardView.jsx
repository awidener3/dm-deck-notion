import { Link, useParams } from 'react-router-dom';
import { getLocalStorageItemById } from './utils';
import { cloneElement } from 'react';
import NotFound from './NotFound';

const CardView = ({ storageKey, children }) => {
	const { id } = useParams();
	const item = getLocalStorageItemById(storageKey, id);

	return (
		<>
			<Link to="../">Back</Link>

			{item ? cloneElement(children, { item }) : <NotFound />}
		</>
	);
};

export default CardView;