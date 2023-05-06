export const characterProps = [
	{
		name: 'name',
		placeholder: 'Arkhan',
		type: 'text',
		required: true,
	},
	{
		name: 'class',
		placeholder: 'barbarian',
		type: 'text',
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
