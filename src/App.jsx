import Header from './components/Header';
import useLocalStorage from './hooks/useLocalStorage';
import Routes from './Routes';
import { useEffect } from 'react';
import srdSource from './assets/json/srd_monsters.json';
import srdSpells from './assets/json/srd_spells.json';
import { setLocalStorageItem } from './utils';

export default function App() {
	// Theme handling
	const [theme, setTheme] = useLocalStorage(
		'theme',
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	);
	const [monsters, setMonsters] = useLocalStorage('monsters', []);
	const [spells, setSpells] = useLocalStorage('spells', []);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

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

	useEffect(() => {
		if (!spells || spells.length === 0) {
			setSpells(srdSpells.spells);
		}
	}, [spells]);

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div className="flex flex-1 flex-col overflow-y-auto min-h-min">
				<div className="text-left flex flex-1 flex-col px-2 md:mx-auto w-full md:w-3/4 md:max-w-xl">
					<Routes toggleTheme={toggleTheme} />
				</div>
			</div>
		</div>
	);
}
