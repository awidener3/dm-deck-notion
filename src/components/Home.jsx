import { Link } from 'react-router-dom';
import { getLocalStorageItem } from '../utils';

const Home = () => {
	const activeRun = getLocalStorageItem('active_run');

	const styles = {
		header: 'italic text-[color:var(--text-highlight)] border-b',
		message: 'gap-5 p-2 items-center bg-[var(--card-bg)]',
		container: 'mt-3 flex flex-col gap-5 bg-[var(--bg-secondary]',
		notionCard: 'flex flex-col md:flex-row gap-5 p-2 items-center bg-[var(--card-bg)]',
		quickMsgContainer: 'py-3',
	};

	return (
		<div className="p-4">
			<section className="mt-3 flex flex-col gap-5 bg-[var(--bg-secondary)] p-2 rounded">
				<h2 className="text-lg text-[color:var(--text-highlight)]">Welcome to DM Deck!</h2>
				<p>
					This tool is for game/dungeon masters of tabletop roleplaying games (ttrp's) such as{' '}
					<em>Dungeons & Dragons, Pathfinder, and Gloomhaven</em>.
				</p>

				<p>
					Build your party, create encounters, and run them like a card game! You can also use this as a reference for
					monster stats, spells, or items.
				</p>
			</section>

			<div className="w-full mt-4">
				<h2 className="text-xl font-bold text-[color:var(--text-highlight)]">Using DM Deck</h2>
			</div>

			<section className="flex w-full items-center mt-2 p-4 gap-4">
				<div className="flex justify-center items-center bg-purple-700 w-10 h-10 text-white text-3xl font-bold rounded-full leading-none">
					1
				</div>

				<div className="flex flex-col flex-1 bg-[var(--bg-secondary)] rounded py-2 px-4">
					<h3 className="font-bold">Create Your Characters.</h3>
					<p>Start by adding your party members! You can edit these as the members level up.</p>
				</div>
			</section>

			<section className="flex w-full items-center mt-2 p-4 gap-4">
				<div className="flex justify-center items-center bg-purple-700 w-10 h-10 text-white text-3xl font-bold rounded-full leading-none">
					2
				</div>

				<div className="flex flex-col flex-1 bg-[var(--bg-secondary)] rounded py-2 px-4">
					<h3 className="font-bold">Make an Encounter.</h3>
					<p>
						Assign the characters and monsters involved in the encounter, and then save! If needed, encounters can be
						edited during a run{' '}
						<em>(if you misjudged your characters ability to wipe the floor with your monsters...again)</em>
					</p>
				</div>
			</section>

			<section className="flex w-full items-center mt-2 p-4 gap-4">
				<div className="flex justify-center items-center bg-purple-700 w-10 h-10 text-white text-3xl font-bold rounded-full leading-none">
					3
				</div>

				<div className="flex flex-col flex-1 bg-[var(--bg-secondary)] rounded py-2 px-4">
					<h3 className="font-bold">Run Your Encounter.</h3>
					<p>
						Set your initiatives, and begin your encounter! Your cards will be ordered automatically, and all you need
						to do is cycle through them as the encounter plays out.
					</p>
				</div>
			</section>

			<section className={styles.quickMsgContainer}>
				<h2 className="text-lg border-b">Quick Links:</h2>
				<ul>
					<li>
						<Link to={'./characters/new'}>make a character</Link>
					</li>
					<li>
						<Link to={'./monsters/new'}>make a monster</Link>
					</li>
					<li>
						<Link to={'./encounters/new'}>make an encounter</Link>
					</li>
					{activeRun && activeRun.id && (
						<li>
							<Link to={`./encounters/run/${activeRun.id}`}>go to active encounter</Link>
						</li>
					)}
				</ul>
			</section>
		</div>
	);
};

export default Home;
