const InputWithLabel = ({
	name = '',
	path,
	type = 'text',
	placeholder,
	min,
	max,
	minLength,
	maxLength,
	options = [],
	fullWidth = false,
	required = false,
	register,
}) => {
	return (
		<span className={fullWidth ? 'flex flex-col col-span-2' : 'flex flex-col'}>
			<label className="italic">{name.replace('_', ' ')}</label>
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
					className="p-2 font-thin"
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
