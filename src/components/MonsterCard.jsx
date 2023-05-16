import CardActions from './CardActions';
import CardSection from './CardSection';
import { useState } from 'react';
import { hasSkills, getSkillStr } from '../utils/cardUtils';
import { useNavigate } from 'react-router-dom';

function MonsterCard({ item, cardStyles }) {
	const [checked, setChecked] = useState(false);

	const handleChecked = () => setChecked(!checked);

	const styles = {
		header: 'text-2xl italic p-1',
		statList: 'flex justify-between py-1 px-2',
		abilityList: 'flex justify-between p-2',
		ability: 'flex flex-col',
		sectionTitle: 'text-lg',
		sectionText: 'mt-2',
		sectionSpan: 'font-bold italic',
	};

	return (
		<div className={cardStyles.card}>
			<CardSection noBorder>
				<h1 className={styles.header}>{item.name}</h1>
				<p>
					{item.size} {item.type}
					{item.subtype && ` (${item.subtype})`}, {item.alignment}
				</p>

				<ul className={styles.statList}>
					<li className="flex-1">
						<strong>AC</strong>&nbsp;
						<em>{item.armor_class}</em>
					</li>
					<li className="flex-1">
						<strong>HP</strong>&nbsp;
						<em>
							{item.hit_points} ({item.hit_dice})
						</em>
					</li>
					<li className="flex-1">
						<strong>SPD</strong>&nbsp;
						<em>{item.speed}</em>
					</li>
				</ul>

				<ul className={styles.abilityList}>
					<li className={styles.ability}>
						<strong>STR</strong> {item.strength}
					</li>
					<li className={styles.ability}>
						<strong>DEX</strong> {item.dexterity}
					</li>
					<li className={styles.ability}>
						<strong>CON</strong> {item.constitution}
					</li>
					<li className={styles.ability}>
						<strong>INT</strong> {item.intelligence}
					</li>
					<li className={styles.ability}>
						<strong>WIS</strong> {item.wisdom}
					</li>
					<li className={styles.ability}>
						<strong>CHA</strong> {item.charisma}
					</li>
				</ul>
			</CardSection>

			<CardSection>
				{hasSkills(item) && <Ability title={'Skills:'} description={getSkillStr(item)} />}

				<Ability title={'Senses:'} description={item.senses} />

				<Ability title={'Languages:'} description={item.languages} />
			</CardSection>

			{item.special_abilities && (
				<CardSection>
					{item.special_abilities.map((ability) => (
						<Ability key={ability.name} title={ability.name + '.'} description={ability.desc} />
					))}
				</CardSection>
			)}

			{item.actions && <CardActions handleChecked={handleChecked} checked={checked} actions={item.actions} />}

			{item.reactions && (
				<CardSection>
					<h1 className={styles.sectionTitle}>Reactions</h1>

					{item.reactions.map((reaction) => (
						<p key={reaction.name} className={styles.sectionText}>
							<span className={styles.sectionSpan}>{reaction.name}.</span> {reaction.desc}
						</p>
					))}
				</CardSection>
			)}

			{item.legendary_actions && (
				<CardSection>
					<h1 className={styles.sectionTitle}>Legendary Actions</h1>

					{item.legendary_actions.map((action, index) => (
						<p key={index} className={styles.sectionText}>
							{action.name && <span className={styles.sectionSpan}>{action.name}.</span>}
							{action.desc}
						</p>
					))}
				</CardSection>
			)}
		</div>
	);
}

const Ability = ({ title, description }) => {
	const navigate = useNavigate();

	let spells = [];
	if (description.includes('[spell]')) {
		// look for [spell]spell name[/spell]
		const spellString = description.replace(/(\[spell\](.*?)\[\/spell\])/g, (word) => {
			// remove [spell] and [/spell]
			const spellStr = word.substring(7, word.length - 8);
			spells.push(spellStr);
			return `<span class="cursor-pointer italic text-[color:var(--text-highlight)]" id="${spellStr}">${spellStr}</span>`;
		});
		description = spellString;
	}

	function handleClick(e) {
		if (spells.length > 0 && spells.includes(e.target.id)) {
			const spell = e.target.id;
			navigate(`/spells/${spell}`);
		}
	}

	return (
		<div className="whitespace-pre-wrap">
			<span className="font-bold italic">{title}</span>
			<p onClick={handleClick} dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
};

export default MonsterCard;
