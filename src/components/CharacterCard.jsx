const CharacterCard = ({ item, cardStyles }) => {
	const styles = {
		headerContainer: 'flex justify-between items-center',
		header: 'text-2xl text-left italic p-1',
	};

	return (
		<article className={cardStyles.card}>
			<section className={styles.headerContainer}>
				<h1 className={styles.header}>{item.name}</h1>
				<p>Lvl {item.level}</p>
			</section>

			<ul>
				<li>
					<strong>AC</strong>&nbsp;
					<em>{item.armor_class}</em>
				</li>
				<li>
					<strong>HP</strong>&nbsp;
					<em>{item.hit_points}</em>
				</li>
				<li>
					<strong>class:</strong> {item.class}
				</li>
			</ul>
		</article>
	);
};

export default CharacterCard;
