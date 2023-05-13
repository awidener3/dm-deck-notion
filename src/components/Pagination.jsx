import { useEffect } from 'react';

// converted from this example: https://codepen.io/mhmanandhar/pen/oEWBqx?editors=0010
const Pagination = ({ pagination, setPagination, listItems }) => {
	useEffect(() => {
		setPrevNextBtn(1);
	}, []);

	const setPrevNextBtn = (listId) => {
		const totalPage = Math.ceil(listItems.length / pagination.perPage);

		if (listId === 1 && totalPage === 1) {
			setPagination((existing) => ({
				...existing,
				nextBtnActive: false,
				previousBtnActive: false,
			}));
		} else if (totalPage === listId && totalPage > 1) {
			setPagination((existing) => ({
				...existing,
				nextBtnActive: false,
				previousBtnActive: true,
			}));
		} else if (listId === 1 && totalPage > 1) {
			setPagination((existing) => ({
				...existing,
				nextBtnActive: true,
				previousBtnActive: false,
			}));
		} else if (totalPage > 1) {
			setPagination((existing) => ({ ...existing, nextBtnActive: true, previousBtnActive: true }));
		}
	};

	const handlePageChange = (e) => {
		const listId = Number(e.target.id);

		setPagination((existing) => ({
			...existing,
			currentPage: listId,
		}));

		setPrevNextBtn(listId);
	};

	const handleIncrementPage = () => {
		const listId = pagination.upperPageBound + 1;

		setPagination((existing) => ({
			...existing,
			upperPageBound: pagination.upperPageBound + pagination.pageBound,
			lowerPageBound: pagination.lowerPageBound + pagination.pageBound,
			currentPage: listId,
		}));

		setPrevNextBtn(listId);
	};

	const handleDecrementPage = () => {
		const listId = pagination.upperPageBound - 1;

		setPagination((existing) => ({
			...existing,
			upperPageBound: pagination.upperPageBound - pagination.pageBound,
			lowerPageBound: pagination.lowerPageBound - pagination.pageBound,
			currentPage: listId,
		}));

		setPrevNextBtn(listId);
	};

	const handlePreviousClick = () => {
		if ((pagination.currentPage - 1) % pagination.pageBound === 0) {
			setPagination((existing) => ({
				...existing,
				upperPageBound: pagination.upperPageBound - pagination.pageBound,
				lowerPageBound: pagination.lowerPageBound - pagination.pageBound,
			}));
		}

		const listId = pagination.currentPage - 1;
		setPagination((existing) => ({
			...existing,
			currentPage: listId,
		}));

		setPrevNextBtn(listId);
	};

	const handleNextClick = () => {
		if (pagination.currentPage + 1 > pagination.upperPageBound) {
			setPagination((existing) => ({
				...existing,
				upperPageBound: pagination.upperPageBound + pagination.pageBound,
				lowerPageBound: pagination.lowerPageBound + pagination.pageBound,
			}));
		}
		const listId = pagination.currentPage + 1;
		setPagination((existing) => ({
			...existing,
			currentPage: listId,
		}));

		setPrevNextBtn(listId);
	};

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(listItems.length / pagination.perPage); i++) {
		pageNumbers.push(i);
	}

	const renderPageNumbers = pageNumbers.map((number) => {
		if (number === pagination.currentPage) {
			return (
				<li key={number}>
					<a id={number} className="text-[color:var(--text-highlight)] cursor-pointer" onClick={handlePageChange}>
						{number}
					</a>
				</li>
			);
		} else if (number < pagination.upperPageBound + 1 && number > pagination.lowerPageBound) {
			return (
				<li key={number}>
					<a id={number} className="cursor-pointer text-[color:var(--text-primary)]" onClick={handlePageChange}>
						{number}
					</a>
				</li>
			);
		}
	});

	let pageIncrementBtn = null;
	if (pageNumbers.length > pagination.upperPageBound) {
		pageIncrementBtn = (
			<li>
				<a className="cursor-pointer text-[color:var(--text-primary)]" onClick={handleIncrementPage}>
					{' '}
					&hellip;{' '}
				</a>
			</li>
		);
	}

	let pageDecrementBtn = null;
	if (pagination.lowerPageBound >= 1) {
		pageDecrementBtn = (
			<li>
				<a className="cursor-pointer text-[color:var(--text-primary)]" onClick={handleDecrementPage}>
					{' '}
					&hellip;{' '}
				</a>
			</li>
		);
	}

	let renderPrevBtn = null;
	if (pagination.previousBtnActive) {
		renderPrevBtn = (
			<li>
				<a id="btnPrev" className="text-[color:var(--text-highlight)] cursor-pointer" onClick={handlePreviousClick}>
					Prev
				</a>
			</li>
		);
	} else {
		renderPrevBtn = (
			<li className="select-none cursor-not-allowed">
				<span id="btnPrev"> Prev </span>
			</li>
		);
	}

	let renderNextBtn = null;
	if (pagination.nextBtnActive) {
		renderNextBtn = (
			<li>
				<a id="btnNext" className="text-[color:var(--text-highlight)] cursor-pointer" onClick={handleNextClick}>
					Next
				</a>
			</li>
		);
	} else {
		renderNextBtn = (
			<li className="select-none cursor-not-allowed">
				<span id="btnNext"> Next </span>
			</li>
		);
	}

	return (
		<ul className="flex gap mt-4 justify-center gap-2">
			{renderPrevBtn}
			{pageDecrementBtn}
			{renderPageNumbers}
			{pageIncrementBtn}
			{renderNextBtn}
		</ul>
	);
};

export default Pagination;
