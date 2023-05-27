import { TbHexagonLetterR } from 'react-icons/tb';

const SpellCard = ({ item }) => {
	const styles = {
		card: 'flex flex-col border-8 border-[var(--spell-card)] bg-[var(--card-bg)] rounded-lg text-sm my-2 mx-auto overflow-y-auto',
	};
	return (
		<article className={styles.card}>
			<h1 className="flex justify-center items-center gap-2 py-3 border-b-8 border-[var(--spell-card)]">
				{item.name} {item.ritual && <TbHexagonLetterR size={25} title="Can be cast as a ritual" />}
			</h1>

			<section className="grid grid-cols-2 border-b-8 border-[var(--spell-card)]">
				<div className="flex flex-col border border-[var(--spell-card)] p-1">
					<h3>
						<strong>Casting Time</strong>
					</h3>
					<p>{item.casting_time}</p>
				</div>

				<div className="flex flex-col border border-[var(--spell-card)] p-1">
					<h3>
						<strong>Range</strong>
					</h3>
					<p>{item.range}</p>
				</div>

				<div className="flex flex-col border border-[var(--spell-card)] p-1">
					<h3>
						<strong>Components</strong>
					</h3>
					<p>{item.components.raw}</p>
				</div>

				<div className="flex flex-col border border-[var(--spell-card)] p-1">
					<h3>
						<strong>Duration</strong>
					</h3>
					<p>{item.duration}</p>
				</div>
			</section>

			<section className="flex flex-col p-2 gap-2">
				{item.components.material && <p>Materials: {item.components.materials_needed.join(', ')}</p>}
				<p className="whitespace-pre-wrap">{item.description}</p>
			</section>

			<section className="mt-auto bg-[var(--spell-card)]">
				<h2 className="text-lg text-center">{item.type}</h2>
			</section>
		</article>
	);
};

export default SpellCard;
