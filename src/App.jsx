import Header from './components/Header';
import useLocalStorage from './hooks/useLocalStorage';
import Routes from './Routes';
import srdSource from './assets/json/srd_monsters.json';
import { useEffect } from 'react';

export default function App() {
	// Theme handling
	const [theme, setTheme] = useLocalStorage(
		'theme',
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	);
	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	// Default monster handling
	const [localMonsters, setLocalMonsters] = useLocalStorage('monsters', []);

	useEffect(() => {
		const loadMsg = 'You have no monsters saved, would you like to load the defaults?';
		if (localMonsters.length === 0 && confirm(loadMsg)) {
			console.log('loading SRD monsters...');
			setLocalMonsters(srdSource.monsters);
		}
	}, [localMonsters]);

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
