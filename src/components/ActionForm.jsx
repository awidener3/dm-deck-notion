import InputWithLabel from './InputWithLabel';
import { useState } from 'react';
import { actionProps } from '../utils/formProperties';

const ActionForm = ({ register }) => {
	return (
		<>
			<ActionContainer heading={'Special Abilities'} register={register} />
			<ActionContainer heading={'Actions'} register={register} />
			<ActionContainer heading={'Reactions'} register={register} />
			<ActionContainer heading={'Legendary Actions'} register={register} />
		</>
	);
};

const ActionContainer = ({ heading, register }) => {
	const [actions, setActions] = useState([]);

	const actionObject = {
		name: '',
		desc: '',
		attack_bonus: 0,
		damage_dice: '',
		damage_bonus: 0,
	};

	const handleAdd = (e) => {
		e.preventDefault();
		setActions(() => [...actions, actionObject]);
	};

	return (
		<>
			<div className="flex justify-between border-b">
				<h2>{heading}</h2>
				<button onClick={handleAdd}>add</button>
			</div>

			<div className="grid grid-cols-2 gap-2">
				{actions.map((action, index) => (
					<Action key={index} action={action} register={register} />
				))}
			</div>
		</>
	);
};

const Action = ({ action, register }) => (
	<div>
		{actionProps.map((prop) => (
			<InputWithLabel {...prop} register={register} />
		))}
		<button>remove</button>
	</div>
);

export default ActionForm;
