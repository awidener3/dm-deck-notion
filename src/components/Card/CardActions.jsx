import CardAction from './CardAction';

const CardActions = ({ checked, handleChecked, actions }) => {
	const styles = {
		section: 'border-t-2 border-[var(--monster-card)] p-2',
		header: 'flex justify-between',
		heading: 'text-lg self-center',
		label: 'flex gap-2 items-center',
		action: 'mt-2 gap-2 flex',
		actionChecked: 'mt-2 inline-block whitespace-pre-wrap',
	};
	return (
		<section className={styles.section}>
			<section className={styles.header}>
				<h1 className={styles.heading}>Actions</h1>

				<label className={styles.label}>
					<input type="checkbox" onChange={handleChecked} checked={checked} />
					Show details
				</label>
			</section>

			{actions.map((action) => (
				<p key={action.name} className={checked ? styles.actionChecked : styles.action}>
					<strong>
						<em>{action.name}.</em>
					</strong>
					<CardAction checked={checked} action={action} />
				</p>
			))}
		</section>
	);
};

export default CardActions;
