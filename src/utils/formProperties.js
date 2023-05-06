export const characterProps = [
	{
		name: 'name',
		placeholder: 'Arkhan',
		required: true,
	},
	{
		name: 'class',
		placeholder: 'barbarian',
		required: true,
	},
	{
		name: 'level',
		placeholder: 5,
		type: 'number',
		required: true,
		min: 1,
		max: 20,
	},
	{
		name: 'armor_class',
		placeholder: 14,
		type: 'number',
		required: true,
		min: 1,
		max: 25,
	},
	{
		name: 'hit_points',
		placeholder: 44,
		type: 'number',
		required: true,
		min: 1,
		max: 560,
	},
];

// todo: encounter may need separate form
export const encounterProps = [
	{
		name: 'name',
		placeholder: 'tpk',
		required: true,
	},
	{
		name: 'character_ids',
		type: 'select',
		required: true,
	},
];
