import Header from './Header';
import List from './components/List';
import useLocalStorage from './hooks/useLocalStorage';
import Routes from './Routes';
import { useEffect } from 'react';

export default function App() {
	const [theme, setTheme] = useLocalStorage(
		'theme',
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	);

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div className="flex flex-1 flex-col overflow-y-auto min-h-min">
				<div className="text-left flex flex-1 flex-col mx-auto w-3/4 max-w-xl">
					<Routes toggleTheme={toggleTheme} />
				</div>
			</div>
		</div>
	);
}
