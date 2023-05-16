export const getMonsterArray = () => {
	const stored = JSON.parse(localStorage.getItem('monsters'));

	if (!stored) return [];

	const monsterArr = [];
	stored.forEach((source) => {
		source.monsters.forEach((monster) => monsterArr.push({ ...monster, source: source.source }));
	});
	return monsterArr;
};

export const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setLocalStorageItem = (key, item) => localStorage.setItem(key, JSON.stringify(item));

export const addLocalStorageItem = (key, item) => {
	const existing = JSON.parse(localStorage.getItem(key));
	setLocalStorageItem(key, [...existing, item]);
};

/**
 *
 * @param {string} key Local storage string (i.e. `'monsters'`, `'encounters'`)
 * @param {string} id ID of item
 * @returns {object|error} Object of item or error if not found
 */
export const getLocalStorageItemById = (key, id) => {
	const items = JSON.parse(localStorage.getItem(key));
	return items && items.find((item) => item.id === id);
};

/**
 *
 * @param {string} key Local storage string (i.e. `'monsters'`, `'encounters'`)
 * @param {string} id ID of item
 * @returns {object|error} Object of item or error if not found
 */
export const getLocalStorageItemByName = (key, name) => {
	const items = JSON.parse(localStorage.getItem(key));
	return items && items.find((item) => item.name.toLowerCase() === name.toLowerCase());
};
