import Header from './components/Header';
import useLocalStorage from './hooks/useLocalStorage';
import Routes from './Routes';
import { useEffect, useState } from 'react';
import srdSource from './assets/json/srd_monsters.json';
import srdSpells from './assets/json/srd_spells.json';
import { setLocalStorageItem } from './utils';

export default function App() {
	// theme handling
	const [theme, setTheme] = useState('light');
	// const [theme, setTheme] = useLocalStorage(
	// 	'theme',
	// 	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	// );
	const [monsters, setMonsters] = useLocalStorage('monsters', []);
	const [spells, setSpells] = useLocalStorage('spells', []);

	// update theme
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	// auto-load monsters and sources
	useEffect(() => {
		if (!monsters || monsters.length === 0) {
			setMonsters;
			const sources = [
				{
					source: 'Systems Reference Document',
					abbr: 'srd',
					version: srdSource.version,
				},
			];

			setMonsters(srdSource.monsters);
			setLocalStorageItem('sources', sources);
		}
	}, [monsters]);

	// auto-load spells
	useEffect(() => {
		if (!spells || spells.length === 0) {
			setSpells(srdSpells.spells);
		}
	}, [spells]);

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	return (
		<main className="h-screen w-screen">
			<div className="flex flex-col h-screen w-full sm:flex-row">
				<Header />

				<section className="flex flex-1 flex-col overflow-y-auto min-h-min items-center max-w-7xl p-4">
					<Routes toggleTheme={toggleTheme} />
				</section>
			</div>
		</main>
	);
}
