import { Link, useParams } from 'react-router-dom';
import { getLocalStorageItemById } from '../utils';
import { cloneElement } from 'react';
import NotFound from './NotFound';

const CardView = ({ storageKey, children }) => {
	const { id } = useParams();
	const item = getLocalStorageItemById(storageKey, id);

	const cardStyles = {
		card: 'flex-col border-2 border-[var(--bg-secondary)] bg-[var(--card-bg)] rounded-lg text-sm my-2 p-2 min-h-[750px]',
	};

	return (
		<>
			<Link className="text-right" to={-1}>
				go back
			</Link>

			{item ? cloneElement(children, { item, cardStyles }) : <NotFound />}
		</>
	);
};

export default CardView;
