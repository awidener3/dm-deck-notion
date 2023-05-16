import { Link, useParams } from 'react-router-dom';
import { getLocalStorageItemById, getLocalStorageItemByName } from '../utils';
import { cloneElement, useEffect, useState } from 'react';
import NotFound from './NotFound';
import Loading from './Loading';

const CardView = ({ storageKey, children }) => {
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const [status, setStatus] = useState(null);

	useEffect(() => {
		setStatus('loading');
		const itemById = getLocalStorageItemById(storageKey, id);

		if (itemById) {
			setItem(itemById);
			setStatus('success');
			return;
		}

		const itemByName = getLocalStorageItemByName(storageKey, id);

		if (itemByName) {
			setItem(itemByName);
			setStatus('success');
			return;
		}
	}, [id]);

	const cardStyles = {
		card: 'flex-col border-2 border-[var(--bg-secondary)] bg-[var(--card-bg)] rounded-lg text-sm my-2 p-2 min-h-[750px]',
	};

	if (status === 'loading') {
		return <Loading />;
	}

	return (
		<>
			<Link className="text-right" to={-1}>
				go back
			</Link>

			{item && cloneElement(children, { item, cardStyles })}
		</>
	);
};

export default CardView;
