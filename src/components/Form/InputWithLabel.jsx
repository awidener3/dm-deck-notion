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
	const styles = {
		fullWidthInput: `flex ${!row ? 'flex-col' : 'items-center flex-1'}  col-span-2`,
		gridInput: `flex ${!row ? 'flex-col' : 'items-center flex-1'}`,
		label: 'italic flex-1',
		input: 'p-2 font-thin flex-1',
	};

	return (
		<span className={fullWidth ? styles.fullWidthInput : styles.gridInput}>
			<label className={styles.label}>{name.replace('_', ' ')}</label>
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
					className={styles.input}
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
