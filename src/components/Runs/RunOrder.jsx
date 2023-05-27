import MonsterCard from '../Monsters/MonsterCard';
import CharacterCard from '../Characters/CharacterCard';
import { getLocalStorageItemById } from '../../utils';
import RunTracker from './RunTracker';

const RunOrder = ({ run, setRun, setEdit }) => {
	const order = run.initiative_order.map((item) => {
		if (item.creature_type === 'monster') {
			const data = getLocalStorageItemById('monsters', item.id);

			if (item.suffix) {
				data.name += ` ${item.suffix}`;
			}

			return data;
		} else {
			const data = getLocalStorageItemById('characters', item.id);
			return data;
		}
	});

	const handleIncrement = () => {
		if (run.initiative_position === run.initiative_order.length - 1 && run.round >= 1) {
			setRun({ ...run, initiative_position: 0, round: run.round + 1 });
		} else {
			setRun({ ...run, initiative_position: run.initiative_position + 1 });
		}
	};

	const handleDecrement = () => {
		if (run.initiative_position === 0 && run.round === 1) return;

		run.initiative_position === 0
			? setRun({ ...run, initiative_position: run.initiative_order.length - 1, round: run.round - 1 })
			: setRun({ ...run, initiative_position: run.initiative_position - 1 });
	};

	const handleHpChange = () => {
		console.log('hp change...');

		// ...
	};

	const handleInitiativeChange = () => {
		console.log('initiative change...');

		// ...
	};

	const handleEdit = () => {
		setEdit(true);
	};

	const getCurrentCard = (index) => {
		const item = run.initiative_order[index];

		if (item.creature_type === 'monster') {
			const data = getLocalStorageItemById('monsters', item.id);

			if (item.suffix) {
				data.name += ` ${item.suffix}`;
			}

			return <MonsterCard key={item.initiative} item={data} />;
		} else {
			const data = getLocalStorageItemById('characters', item.id);

			return <CharacterCard key={item.initiative} item={data} showActions />;
		}
	};

	return (
		<>
			<section className="flex flex-col sm:flex-row gap-2">
				{/* Order and details */}
				<section className="flex-1 p-4">
					<RunTracker run={run} order={order} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
				</section>

				{/* Card screen */}
				<section className="flex-1 p-4">{getCurrentCard(run.initiative_position)}</section>
			</section>
		</>
	);
};

export default RunOrder;
