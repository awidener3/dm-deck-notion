const CharacterCard = ({ item }) => (
	<div className="flex-col border-2 border-[var(--bg-secondary)] rounded-lg text-sm my-2 p-2">
		<div className="flex justify-between items-center">
			<h1 className="text-2xl text-left italic p-1">{item.name}</h1>
			<p>Lvl {item.level}</p>
		</div>

		<ul className="text-left">
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
	</div>
);

export default CharacterCard;
