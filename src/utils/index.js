export function getMonsterArray() {
	const stored = JSON.parse(localStorage.getItem('monsters'));

	if (!stored) return [];

	const monsterArr = [];
	stored.forEach((source) => {
		source.monsters.forEach((monster) => monsterArr.push({ ...monster, source: source.source }));
	});
	return monsterArr;
}

export function getLocalStorageItem(key) {
	const stored = JSON.parse(localStorage.getItem(key));

	if (!stored) return [];

	return stored;
}

/**
 *
 * @param {string} key Local storage string (i.e. `'monsters'`, `'encounters'`)
 * @param {string} id ID of item
 * @returns {object|error} Object of item or error if not found
 */
export function getLocalStorageItemById(key, id) {
	const items = JSON.parse(localStorage.getItem(key));
	const item = items.find((item) => item.id === id);

	return item;
}
