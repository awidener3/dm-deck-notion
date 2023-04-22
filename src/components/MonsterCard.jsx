import { useState } from 'react';
import Switch from 'react-switch';

function MonsterCard({ monster }) {
	const [checked, setChecked] = useState(false);

	const skills = [
		'acrobatics',
		'animal_handling',
		'arcana',
		'athletics',
		'deception',
		'history',
		'insight',
		'intimidation',
		'investigation',
		'medicine',
		'nature',
		'perception',
		'performance',
		'persuasion',
		'religion',
		'sleight_of_hand',
		'stealth',
		'survival',
	];

	const handleChecked = () => {
		setChecked(!checked);
	};

	function getSkills() {
		const skillsPresent = skills.filter((skill) => skill in monster);

		return skillsPresent
			.map(
				(skill) =>
					`${skill
						.toLowerCase()
						.split('_')
						.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
						.join(' ')} ${monster[skill] >= 0 ? '+' + monster[skill] : '-' + monster[skill]}`
			)
			.join(', ');
	}

	return (
		<div className="flex-col border rounded text-sm">
			<h1 className="bg-white text-black text-2xl">{monster.name}</h1>
			<p className="text-left p-1">
				{monster.size} {monster.type}
				{monster.subtype && ` (${monster.subtype})`}, {monster.alignment}
			</p>

			<ul className="flex justify-between py-1 px-2">
				<li>
					AC <span className="font-light text-white italic">{monster.armor_class}</span>
				</li>
				<li>
					HP{' '}
					<span className="font-light text-white italic">
						{monster.hit_points} ({monster.hit_dice})
					</span>
				</li>
				<li>
					SPD <span className="font-light text-white italic">{monster.speed}</span>
				</li>
			</ul>

			<ul className="flex justify-between p-2 border-b">
				<li className="flex flex-col">
					STR <span>{monster.strength}</span>
				</li>
				<li className="flex flex-col">
					DEX <span>{monster.dexterity}</span>
				</li>
				<li className="flex flex-col">
					CON <span>{monster.constitution}</span>
				</li>
				<li className="flex flex-col">
					INT <span>{monster.intelligence}</span>
				</li>
				<li className="flex flex-col">
					WIS <span>{monster.wisdom}</span>
				</li>
				<li className="flex flex-col">
					CHA <span>{monster.charisma}</span>
				</li>
			</ul>

			<div className="p-2 border-b">
				{getSkills() && (
					<p className="text-left">
						<span className="font-bold">Skills:</span> {getSkills()}
					</p>
				)}

				<p className="text-left">
					<span className="font-bold">Senses:</span> {monster.senses}
				</p>
				<p className="text-left">
					<span className="font-bold">Languages:</span> {monster.languages}
				</p>

				{monster.special_abilities &&
					monster.special_abilities.map((ability) => (
						<p key={ability.name} className="mt-2 text-left">
							<span className="italic">{ability.name}.</span> {ability.desc}
						</p>
					))}
			</div>

			<div className="p-2">
				<div className="flex justify-between">
					<h1 className="text-lg">Actions</h1>
					<div className="flex gap-2 items-center">
						<Switch onChange={handleChecked} checked={checked} uncheckedIcon={false} checkedIcon={false} />
						Show details
					</div>
				</div>

				{monster.actions &&
					monster.actions.map((action) => (
						<p key={action.name} className="text-left mt-2">
							<span className="font-bold italic">{action.name}.</span> {checked ? action.desc : <></>}
						</p>
					))}
			</div>
		</div>
	);
}

export default MonsterCard;
