const SpellCard = ({ item, cardStyles }) => {
	const styles = {
		headerContainer: 'flex justify-between items-center',
		header: 'text-2xl text-left italic p-1',
		listItem: 'font-bold italic',
		hr: 'my-2',
	};

	return (
		<article className={cardStyles.card}>
			<section className={styles.headerContainer}>
				<h1 className={styles.header}>{item.name}</h1>
			</section>

			<hr className={styles.hr} />

			<ul>
				<li>
					<span className={styles.listItem}>Level.</span> {item.level}
				</li>
				<li>
					<span className={styles.listItem}>Casting Time.</span> {item.casting_time}
				</li>
				<li>
					<span className={styles.listItem}>Duration.</span> {item.duration}
				</li>
				<li>
					<span className={styles.listItem}>Range.</span> {item.range}
				</li>
				<li>
					<span className={styles.listItem}>School.</span> {item.school}
				</li>
			</ul>

			<hr className={styles.hr} />

			<p className="whitespace-pre-wrap">{item.description}</p>
		</article>
	);
};

export default SpellCard;
