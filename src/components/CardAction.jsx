import { TbRulerMeasure } from 'react-icons/tb';
import { GiArrowDunk } from 'react-icons/gi';

const CardAction = ({ action, checked }) => {
	const getActionRange = (action) => {
		const arr = action.desc.split(' ');
		const description = action.desc.toLowerCase();
		const prefixes = ['melee weapon attack', 'ranged weapon attack', 'melee or ranged weapon attack'];

		if (description.startsWith(prefixes[0])) {
			// melee
			const index = arr.findIndex((item) => item === 'reach');

			return (
				<>
					<TbRulerMeasure /> {arr[index + 1]} ft.
				</>
			);
		} else if (description.startsWith(prefixes[1])) {
			// ranged
			const index = arr.findIndex((item) => item === 'range');
			const ranges = arr[index + 1].split('/');

			return (
				<>
					<GiArrowDunk /> {ranges[0]} ({ranges[1]})
				</>
			);
		} else if (description.startsWith(prefixes[2])) {
			// both
			const index = arr.findIndex((item) => item === 'reach');

			let str = '';
			for (let i = index + 1; i <= index + 6; i++) {
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
			}`;
		} else {
			// No damage bonus results in following format: 3 (1d6)
			return `${arr[hitIndex + 1]} ${arr[hitIndex + 2]} ${arr[damageTypeIndex - 1]}`;
		}
	};

	if (checked) {
		// Descriptive actions; Multiattack, Change Shape, etc.
		return action.desc;
	} else if (!action.damage_dice) {
		return action.desc.length > 75 ? 'Show details to view' : action.desc;
	} else {
		// Actionable actions; Bite, Longsword, Longbow, etc
		return (
			<>
				{action.attack_bonus && '+' + action.attack_bonus}, {getDamage()} {getActionRange(action)}
			</>
		);
	}
};

export default CardAction;
