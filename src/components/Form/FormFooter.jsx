const FormFooter = ({ reset, existing }) => (
	<span className="flex justify-around">
		<button type="button" onClick={() => reset()}>
			reset
		</button>
		<button type="submit">{existing ? 'update' : 'save'}</button>
	</span>
);

export default FormFooter;
