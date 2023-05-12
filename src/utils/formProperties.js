export const characterProps = [
	{
		name: 'name',
		placeholder: 'character name',
		minLength: 0,
		maxLength: 128,
		required: true,
		fullWidth: true,
	},
	{
		name: 'class',
		type: 'select',
		options: [
			'barbarian',
			'bard',
			'cleric',
			'druid',
			'fighter',
			'monk',
			'paladin',
			'ranger',
			'rogue',
			'sorcerer',
			'warlock',
			'wizard',
			'artificer',
			'blood hunter',
		],
		required: true,
	},
	{
		name: 'level',
		placeholder: '#',
		type: 'number',
		min: 1,
		max: 20,
		required: true,
	},
	{
		name: 'armor_class',
		placeholder: '#',
		type: 'number',
		min: 1,
		max: 25,
		required: true,
	},
	{
		name: 'hit_points',
		placeholder: '#',
		type: 'number',
		min: 1,
		max: 560,
		required: true,
	},
];

export const actionProps = [
	{
		name: 'name',
		placeholder: 'name',
		minLength: 1,
		maxLength: 128,
		required: true,
	},
	{
		name: 'damage_dice',
		placeholder: '#d#',
		minLength: 3,
		maxLength: 5,
	},
	{
		name: 'desc',
		placeholder: 'description',
		fullWidth: true,
		minLength: 1,
		required: true,
	},
	{
		name: 'attack_bonus',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 50,
	},
	{
		name: 'damage_bonus',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 50,
	},
];

export const actionDefaults = {
	name: '',
	desc: '',
	attack_bonus: null,
	damage_dice: '',
	damage_bonus: null,
};

export const monsterProps = [
	{
		name: 'name',
		placeholder: 'monster name',
		required: true,
		fullWidth: true,
		minLength: 1,
		maxLength: 128,
	},
	{
		name: 'size',
		type: 'select',
		options: ['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'],
		required: true,
	},
	{
		name: 'type',
		type: 'select',
		options: [
			'aberration',
			'beast',
			'celestial',
			'construct',
			'dragon',
			'elemental',
			'fey',
			'fiend',
			'giant',
			'humanoid',
			'monstrosity',
			'ooze',
			'plant',
			'swarm of tiny beasts',
			'undead',
		],
		required: true,
	},
	{
		name: 'subtype',
		type: 'select',
		options: [
			'any race',
			'bullywug',
			'demon',
			'demon, shapechanger',
			'devil',
			'devil, shapechanger',
			'dwarf',
			'elf',
			'gith',
			'gnoll',
			'gnome',
			'goblinoid',
			'grimlock',
			'human',
			'human, shapechanger',
			'kenku',
			'kobold',
			'kuo-toa',
			'lizardfolk',
			'merfolk',
			'orc',
			'sahuagin',
			'shapechanger',
			'titan',
		],
	},
	{
		name: 'alignment',
		type: 'select',
		options: [
			'lawful good',
			'neutral good',
			'chaotic good',
			'lawful neutral',
			'neutral',
			'chaotic neutral',
			'lawful evil',
			'neutral evil',
			'chaotic evil',
			'unaligned',
			'any alignment',
			'any non-good alignment',
			'any evil alignment',
			'any chaotic alignment',
			'any non-lawful alignment',
			'neutral good (50%) or neutral evil (50%)',
			'chaotic good (75%) or neutral evil (25%)',
		],
		required: true,
	},
	{
		name: 'armor_class',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 31,
		required: true,
	},
	{
		name: 'hit_points',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 999,
		required: true,
	},
	{
		name: 'hit_dice',
		placeholder: '#d#',
		required: true,
	},
	{
		name: 'speed',
		placeholder: '## ft., (type) ## ft.',
		required: true,
	},
	{
		name: 'strength',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 30,
		required: true,
	},
	{
		name: 'strength_save',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'dexterity',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 30,
		required: true,
	},
	{
		name: 'dexterity_save',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'constitution',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 30,
		required: true,
	},
	{
		name: 'constitution_save',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'intelligence',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 30,
		required: true,
	},
	{
		name: 'intelligence_save',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'wisdom',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 30,
		required: true,
	},
	{
		name: 'wisdom_save',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'charisma',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 30,
		required: true,
	},
	{
		name: 'charisma_save',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'acrobatics',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'animal_handling',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'arcana',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'athletics',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'deception',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'history',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'insight',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'intimidation',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'investigation',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'medicine',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'nature',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'perception',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'performance',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'persuasion',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'religion',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'sleight_of_hand',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'stealth',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'survival',
		type: 'number',
		placeholder: '#',
		min: 0,
		max: 10,
	},
	{
		name: 'damage_vulnerabilities',
		placeholder: 'poison, stun, ...',
	},
	{
		name: 'damage_resistances',
		placeholder: 'fire, lightning, ...',
	},
	{
		name: 'damage_immunities',
		placeholder: 'cold, ...',
	},
	{
		name: 'condition_immunities',
		placeholder: 'poison, stun, ...',
	},
	{
		name: 'senses',
		placeholder: 'darkvision 60 ft., passive Perception 10, etc.',
	},
	{
		name: 'languages',
		placeholder: 'Common, ...',
		required: true,
	},
	{
		name: 'challenge_rating',
		placeholder: '1, 1/4, 30, ...',
		required: true,
	},
	{
		name: 'special_abilities',
		type: 'nested',
		fullWidth: true,
		properties: actionProps,
	},
	{
		name: 'actions',
		type: 'nested',
		fullWidth: true,
		properties: actionProps,
	},
	{
		name: 'reactions',
		type: 'nested',
		fullWidth: true,
		properties: actionProps,
	},
	{
		name: 'legendary_actions',
		type: 'nested',
		fullWidth: true,
		properties: actionProps,
	},
];

// todo: encounter may need separate form
export const encounterProps = {
	name: 'name',
	placeholder: 'encounter name',
	fullWidth: true,
	minLength: 1,
	maxLength: 128,
	required: true,
};

export const initiativeProp = {
	type: 'number',
	placeholder: 'initiative',
	min: 0,
	max: 30,
};
