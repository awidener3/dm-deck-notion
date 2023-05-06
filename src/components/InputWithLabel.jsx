const InputWithLabel = ({
	name,
	type = 'text',
	placeholder,
	min,
	max,
	minLength,
	maxLength,
	value,
	options = [],
	fullWidth = false,
	required = false,
	register,
}) => {
	return (
		<span className={fullWidth ? 'flex flex-col col-span-2' : 'flex flex-col'}>
			<label className="italic">{name.replace('_', ' ')}</label>
			{type === 'select' ? (
				<select defaultValue={value || 'DEFAULT'}>
					<option value="DEFAULT" disabled>
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
					className="p-2 font-thin"
					defaultValue={value}
					placeholder={placeholder}
					autoComplete="off"
					min={min}
					max={max}
					minLength={minLength}
					maxLength={maxLength}
					{...register(name, { required })}
				/>
			)}
		</span>
	);
};

export default InputWithLabel;
