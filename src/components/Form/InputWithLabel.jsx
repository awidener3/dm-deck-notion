const InputWithLabel = ({
	name = '',
	path,
	type = 'text',
	placeholder,
	min,
	max,
	minLength,
	maxLength,
	row,
	options = [],
	fullWidth = false,
	required = false,
	register,
}) => {
	return (
		<span
			className={
				fullWidth
					? `flex ${!row ? 'flex-col' : 'items-center flex-1'}  col-span-2`
					: `flex ${!row ? 'flex-col' : 'items-center flex-1'}`
			}
		>
			<label className="italic flex-1">{name.replace('_', ' ')}</label>
			{type === 'select' ? (
				<select defaultValue="" {...register(name, { required })}>
					<option value="" disabled>
						select
					</option>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			) : (
				<input
					type={type}
					className="p-2 font-thin flex-1"
					placeholder={placeholder}
					autoComplete="off"
					min={min}
					max={max}
					minLength={minLength}
					maxLength={maxLength}
					{...register(path ? path : name, { required })}
				/>
			)}
		</span>
	);
};

export default InputWithLabel;
