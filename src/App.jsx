import Header from './components/Header';
import useLocalStorage from './hooks/useLocalStorage';
import Routes from './Routes';
import { useEffect } from 'react';
import srdSource from './assets/json/srd_monsters.json';
import srdSpells from './assets/json/srd_spells.json';
import { setLocalStorageItem } from './utils';

export default function App() {
	// theme handling
	const [theme, setTheme] = useLocalStorage(
		'theme',
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	);
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

	const styles = {
		container: 'flex flex-col h-screen',
		appWrapper: 'flex flex-1 flex-col overflow-y-auto min-h-min',
		contentWrapper: 'flex flex-col px-2 sm:mx-auto sm:w-3/4 sm:max-w-xl',
	};

	return (
		<main className={styles.container}>
			<Header />

			<section className={styles.appWrapper}>
				<section className={styles.contentWrapper}>
					<Routes toggleTheme={toggleTheme} />
				</section>
			</section>
		</main>
	);
}
