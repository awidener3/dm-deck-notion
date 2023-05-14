const CardSection = ({ children, noBorder }) => {
	const styles = {
		border: 'p-2 border-t border-[var(--bg-secondary)]',
		noBorder: 'p-2',
	};
	return <div className={noBorder ? styles.noBorder : styles.border}>{children}</div>;
};

export default CardSection;
