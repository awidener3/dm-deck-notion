import CardActions from '../Card/CardActions';
import { useState } from 'react';
import { hasSkills, getSkillStr } from '../../utils/cardUtils';
import { useNavigate } from 'react-router-dom';
import { TbHeartFilled, TbShieldFilled } from 'react-icons/tb';

function MonsterCard({ item }) {
	const [checked, setChecked] = useState(false);

	const handleChecked = () => setChecked(!checked);

	const calcModifier = (score) => {
		const modifier = Math.floor((score - 10) / 2);
		return (modifier < 0 ? '' : '+') + modifier;
	};

	const styles = {
		card: 'flex flex-col border-8 border-[var(--monster-card)] bg-[var(--card-bg)] rounded-lg text-sm my-2 mx-auto overflow-y-auto',
		header: 'text-center py-3',
		subHeader: 'text-center italic text-white bg-[var(--monster-card)] sticky',
		basicStatSection: 'flex gap-5 p-2',
		abilityScoreSection: 'flex justify-evenly p-2 border-b-2 border-[var(--monster-card)]',
		abilityScore: 'flex flex-col text-center',
		skillsSection: 'p-2',
		specialAbilitiesSection: 'p-2 flex flex-col gap-2',
		actionSection: 'border-t-2 border-[var(--monster-card)] p-2',
		ability: 'flex flex-col',
		sectionTitle: 'text-lg',
		sectionText: 'mt-2',
		sectionSpan: 'font-bold italic',
	};

	return (
		<article className={styles.card}>
			<section className="sticky top-0 bg-[var(--card-bg)]">
				<h1 className={styles.header}>{item.name}</h1>

				<p className={styles.subHeader}>
					{item.size} {item.type}
					{item.subtype && ` (${item.subtype})`}, {item.alignment}
				</p>
			</section>

			<section className={styles.basicStatSection}>
				<span>
					<strong>AC</strong>&nbsp;
					<em>{item.armor_class}</em>
				</span>
				<span>
					<strong>HP</strong>&nbsp;
					<em>
						{item.hit_points} ({item.hit_dice})
					</em>
				</span>
				<span>
					<strong>SPD</strong>&nbsp;
					<em>{item.speed}</em>
				</span>
			</section>

			<section className={styles.abilityScoreSection}>
				<span className={styles.abilityScore}>
					<strong>STR</strong> {item.strength} ({calcModifier(item.strength)})
				</span>
				<span className={styles.abilityScore}>
					<strong>DEX</strong> {item.dexterity} ({calcModifier(item.dexterity)})
				</span>
				<span className={styles.abilityScore}>
					<strong>CON</strong> {item.constitution} ({calcModifier(item.constitution)})
				</span>
				<span className={styles.abilityScore}>
					<strong>INT</strong> {item.intelligence} ({calcModifier(item.intelligence)})
				</span>
				<span className={styles.abilityScore}>
					<strong>WIS</strong> {item.wisdom} ({calcModifier(item.wisdom)})
				</span>
				<span className={styles.abilityScore}>
					<strong>CHA</strong> {item.charisma} ({calcModifier(item.charisma)})
				</span>
			</section>

			<section className={styles.skillsSection}>
				{hasSkills(item) && <Ability title={'Skills:'} description={getSkillStr(item)} />}

				<Ability title={'Senses:'} description={item.senses} />

				<Ability title={'Languages:'} description={item.languages} />
			</section>

			{item.special_abilities && (
				<section className={styles.specialAbilitiesSection}>
					{item.special_abilities.map((ability) => (
						<Ability key={ability.name} title={ability.name + '.'} description={ability.desc} />
					))}
				</section>
			)}

			{item.actions && <CardActions handleChecked={handleChecked} checked={checked} actions={item.actions} />}

			{item.reactions && (
				<section className={styles.actionSection}>
					<h1 className={styles.sectionTitle}>Reactions</h1>

					{item.reactions.map((reaction) => (
						<p key={reaction.name} className={styles.sectionText}>
							<span className={styles.sectionSpan}>{reaction.name}.</span> {reaction.desc}
						</p>
					))}
				</section>
			)}

			{item.legendary_actions && (
				<section className={styles.actionSection}>
					<h1 className={styles.sectionTitle}>Legendary Actions</h1>

					{item.legendary_actions.map((action, index) => (
						<p key={index} className={styles.sectionText}>
							{action.name && <span className={styles.sectionSpan}>{action.name}.</span>}
							{action.desc}
						</p>
					))}
				</section>
			)}
		</article>
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
			return `<span class="cursor-pointer italic text-[color:var(--text-highlight)] hover:font-bold" id="${spellStr}">${spellStr}</span>`;
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
			<span className="font-bold italic">{title} </span>
			<span onClick={handleClick} dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
};

export default MonsterCard;
