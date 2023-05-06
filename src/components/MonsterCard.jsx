import { useState } from 'react';

function MonsterCard({ item }) {
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

	const handleChecked = () => setChecked(!checked);
	function getSkills() {
		const skillsPresent = skills.filter((skill) => skill in item);

		return skillsPresent
			.map(
				(skill) =>
					`${skill
						.toLowerCase()
						.split('_')
						.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
						.join(' ')} ${item[skill] >= 0 ? '+' + item[skill] : '-' + item[skill]}`
			)
			.join(', ');
	}

	return (
		<div className="flex-col border-2 border-[var(--bg-secondary)] rounded-lg text-sm my-2 p-2">
			<h1 className="text-2xl italic p-1">{item.name}</h1>
			<p className="p-1">
				{item.size} {item.type}
				{item.subtype && ` (${item.subtype})`}, {item.alignment}
			</p>

			<ul className="flex justify-between py-1 px-2">
				<li>
					<strong>AC</strong>&nbsp;
					<em>{item.armor_class}</em>
				</li>
				<li>
					<strong>HP</strong>&nbsp;
					<em>
						{item.hit_points} ({item.hit_dice})
					</em>
				</li>
				<li>
					<strong>SPD</strong>&nbsp;
					<em>{item.speed}</em>
				</li>
			</ul>

			<ul className="flex justify-between p-2">
				<li className="flex flex-col">
					<strong>STR</strong> {item.strength}
				</li>
				<li className="flex flex-col">
					<strong>DEX</strong> {item.dexterity}
				</li>
				<li className="flex flex-col">
					<strong>CON</strong> {item.constitution}
				</li>
				<li className="flex flex-col">
					<strong>INT</strong> {item.intelligence}
				</li>
				<li className="flex flex-col">
					<strong>WIS</strong> {item.wisdom}
				</li>
				<li className="flex flex-col">
					<strong>CHA</strong> {item.charisma}
				</li>
			</ul>

			<Section>
				{getSkills() && <Ability title={'Skills:'} description={getSkills()} />}

				<Ability title={'Senses:'} description={item.senses} />

				<Ability title={'Languages:'} description={item.languages} />
			</Section>

			{item.special_abilities && (
				<Section>
					{item.special_abilities.map((ability) => (
						<Ability key={ability.name} title={ability.name + '.'} description={ability.desc} />
					))}
				</Section>
			)}

			<Section>
				<div className="flex justify-between">
					<h1 className="text-lg">Actions</h1>
					<div className="flex gap-2 items-center">
						<input type="checkbox" onChange={handleChecked} checked={checked} />
						Show details
					</div>
				</div>

				{item.actions.map((action) => (
					<p key={action.name} className="mt-2">
						<span className="font-bold italic">{action.name}.</span> <Action checked={checked} action={action} />
					</p>
				))}
			</Section>

			{item.reactions && (
				<Section>
					<h1 className="text-lg">Reactions</h1>

					{item.reactions.map((reaction) => (
						<p key={reaction.name} className="mt-2">
							<span className="font-bold italic">{reaction.name}.</span> {reaction.desc}
						</p>
					))}
				</Section>
			)}

			{item.legendary_actions && (
				<Section>
					<h1 className="text-lg">Legendary Actions</h1>

					{item.legendary_actions.map((action, index) => (
						<p key={index} className="mt-2">
							{action.name && <span className="font-bold italic">{action.name}.</span>}
							{action.desc}
						</p>
					))}
				</Section>
			)}
		</div>
	);
}

const Section = ({ children }) => <div className="p-2 border-t border-[var(--bg-secondary)]">{children}</div>;

const Ability = ({ title, description }) => (
	<p>
		<span className="font-bold italic">{title}</span> {description}
	</p>
);

const Action = ({ action, checked }) => {
	const getRange = () => {
		const arr = action.desc.split(' ');
		if (action.desc.startsWith('Melee Weapon Attack:')) {
			const reachIndex = arr.findIndex((item) => item === 'reach');
			return `${arr[reachIndex + 1]} ${arr[reachIndex + 2]}`;
		} else if (action.desc.startsWith('Ranged Weapon Attack:')) {
			const rangeIndex = arr.findIndex((item) => item === 'range');
			return `${arr[rangeIndex]} ${arr[rangeIndex + 1]} ${arr[rangeIndex + 2]}`;
		} else if (action.desc.startsWith('Melee or Ranged Weapon Attack:')) {
			const reachIndex = arr.findIndex((item) => item === 'reach');

			let str = '';
			for (let i = reachIndex + 1; i <= reachIndex + 6; i++) {
				str += `${arr[i]} `;
			}
			return str;
		}
	};

	const getDamage = () => {
		const arr = action.desc.split(' ');
		const hitIndex = arr.findIndex((item) => item === 'Hit:');
		const damageTypeIndex = arr.findIndex((item) => item.includes('damage'));

		if (action.damage_bonus) {
			// Damage bonus results in following format: 5 (1d6 + 2)
			return `${arr[hitIndex + 1]} ${arr[hitIndex + 2]} ${arr[hitIndex + 3]} ${arr[hitIndex + 4]} ${
				arr[damageTypeIndex - 1]
			}.`;
		} else {
			// No damage bonus results in following format: 3 (1d6)
			return `${arr[hitIndex + 1]} ${arr[hitIndex + 2]} ${arr[damageTypeIndex - 1]}.`;
		}
	};

	if (checked || !action.damage_dice) {
		// Descriptive actions; Multiattack, Change Shape, etc.
		return <>{action.desc}</>;
	} else {
		// Actionable actions; Bite, Longsword, Longbow, etc
		return (
			<>
				+{action.attack_bonus}, {getRange()} {getDamage()}
			</>
		);
	}
};

export default MonsterCard;
