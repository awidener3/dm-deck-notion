import Loading from '../Loading';
import { Link, useParams } from 'react-router-dom';
import { getLocalStorageItemById, getLocalStorageItemByName } from '../../utils';
import { cloneElement, useEffect, useState } from 'react';

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

	if (status === 'loading') {
		return <Loading />;
	}

	return (
		<div className="flex flex-col flex-1 w-full max-w-2xl max-h-screen">
			<Link className="text-right" to={-1}>
				go back
			</Link>

			{item && cloneElement(children, { item })}
		</div>
	);
};

export default CardView;
