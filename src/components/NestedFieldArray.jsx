import { useFieldArray } from 'react-hook-form';
import { actionDefaults } from '../utils/formProperties';
import InputWithLabel from './InputWithLabel';

const NestedFieldArray = ({ name, fullWidth = false, properties, control, register }) => {
	const { fields, append, remove } = useFieldArray({ control, name });

	const handleAdd = () => append(actionDefaults);

	return (
		<span className={fullWidth ? 'flex flex-col col-span-2' : 'flex flex-col'}>
			<div className="flex justify-between border-b">
				<h2>{name.replace('_', ' ')}</h2>
				<button type="button" onClick={handleAdd}>
					add
				</button>
			</div>

			{fields.map((field, index) => (
				<div key={field.name + index} className="grid grid-cols-2 gap-2">
					<h3 className="col-span-2 mt-3">ability {index + 1}</h3>
					{properties.map((property) => (
						<>
							<InputWithLabel
								key={[name, property.name, index].join('_')}
								{...property}
								path={`${name}.${index}.${property.name}`}
								register={register}
							/>
						</>
					))}

					{fields.length > 0 && (
						<button className="col-span-2 italic text-right" onClick={() => remove(index)}>
							Remove
						</button>
					)}
				</div>
			))}
		</span>
	);
};

export default NestedFieldArray;
