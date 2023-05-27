import { TbHeartFilled, TbShieldFilled } from 'react-icons/tb';

const CharacterCard = ({ item, cardStyles, showActions }) => {
	const styles = {
		card: 'flex flex-col border-8 border-[var(--character-card)] bg-[var(--card-bg)] rounded-lg text-sm my-2 mx-auto overflow-y-auto',
		header: 'text-center py-3',
		level: 'text-center italic bg-[var(--character-card)]',
		statSection: 'flex flex-1 justify-around p-2',
		statDiv: 'flex gap-2 text-2xl items-center',
		statHeader: 'flex items-center text-bold',
		actionsSection: 'p-2 flex flex-1 flex-col gap-2',
		actionsHeader: 'text-lg text-center',
	};

	return (
		<article className={styles.card}>
			<h1 className={styles.header}>{item.name}</h1>
			<p className={styles.level}>
				Level {item.level} {item.class}
			</p>

			<section className={styles.statSection}>
				<div className={styles.statDiv}>
					<h2 className={styles.statHeader}>
						<TbHeartFilled color="#b91c1c" />
						HP
					</h2>
					<p cl>{item.hit_points}</p>
				</div>
				<div className={styles.statDiv}>
					<h2 className={styles.statHeader}>
						<TbShieldFilled color="#0369a1" />
						AC
					</h2>
					<p cl>{item.armor_class}</p>
				</div>
			</section>

			{showActions && (
				<section className={styles.actionsSection}>
					<h2 className={styles.actionsHeader}>Character Actions</h2>
					<button>Add Damage to Monsters</button>
					<button>Add Condition to Monsters</button>
					<button>Roll Monster Saving Throws</button>
				</section>
			)}
		</article>
	);
};

export default CharacterCard;
