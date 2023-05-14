import CardAction from './CardAction';
import CardSection from './CardSection';

const CardActions = ({ checked, handleChecked, actions }) => {
	const styles = {
		header: 'flex justify-between',
		heading: 'text-lg self-center',
		label: 'flex gap-2 items-center',
		action: 'mt-2 gap-2 flex',
		actionChecked: 'mt-2 inline-block',
	};
	return (
		<CardSection>
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
		</CardSection>
	);
};

export default CardActions;
