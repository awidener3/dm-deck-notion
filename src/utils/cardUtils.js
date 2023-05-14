import { skillList } from './formProperties';

export const hasSkills = (item) => {
	return skillList.some((skill) => skill in item);
};

export const getSkillStr = (item) => {
	return skillList
		.filter((skill) => skill in item)
		.map((skill) => formatSkillName(skill) + ' ' + getSkillModifier(item, skill))
		.join(', ');
};

export const formatSkillName = (str) => {
	return str
		.toLowerCase()
		.split('_')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ');
};

export const getSkillModifier = (item, skill) => {
	return item[skill] >= 0 ? '+' + item[skill] : '-' + item[skill];
};
