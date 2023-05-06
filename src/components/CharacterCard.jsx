const CharacterCard = ({ character }) => (
	<div className="flex-col border-2 border-[var(--bg-secondary)] rounded-lg text-sm my-2 p-2">
		<div className="flex justify-between items-center">
			<h1 className="text-2xl text-left italic p-1">{character.name}</h1>
			<p>Lvl {character.level}</p>
		</div>

		<ul className="text-left">
			<li>
				<strong>AC</strong>&nbsp;
				<em>{character.armor_class}</em>
			</li>
			<li>
				<strong>HP</strong>&nbsp;
				<em>{character.hit_points}</em>
			</li>
			<li>
				<strong>class:</strong> {character.class}
			</li>
		</ul>
	</div>
);

export default CharacterCard;
