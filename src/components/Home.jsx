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
		<>
			<section className="flex flex-col bg-[var(--bg-secondary)]">
				<h1 className="text-3xl text-center text-white bg-[var(--text-highlight)] p-7">Welcome to DM Deck!</h1>
				<p className="p-2">
					This tool is for game/dungeon masters of tabletop roleplaying games (ttrp's) such as{' '}
					<em>Dungeons & Dragons, Pathfinder, and Gloomhaven</em>.
				</p>

				<p className="p-2">
					Build your party, create encounters, and run them like a card game! You can also use this as a reference for
					monster stats, spells, or items.
				</p>
			</section>

			<section>
				<div className="w-full mt-4">
					<h2 className="text-xl text-center font-bold text-[color:var(--text-highlight)]">Using DM Deck</h2>
				</div>

				<article className="flex w-full items-center p-4 gap-4">
					<span className="flex justify-center items-center bg-[var(--text-highlight)] w-10 h-10 text-white text-2xl font-bold rounded-full leading-none">
						1
					</span>

					<div className="flex flex-col flex-1 bg-[var(--bg-secondary)] rounded py-2 px-4">
						<h3 className="font-bold">Create Your Characters</h3>
						<p>Start by adding your party members! You can edit these as the members level up.</p>
					</div>
				</article>

				<article className="flex w-full items-center p-4 gap-4">
					<span className="flex justify-center items-center bg-[var(--text-highlight)] w-10 h-10 text-white text-2xl font-bold rounded-full leading-none">
						2
					</span>

					<div className="flex flex-col flex-1 bg-[var(--bg-secondary)] rounded py-2 px-4">
						<h3 className="font-bold">Make an Encounter</h3>
						<p>
							Assign the characters and monsters involved in the encounter, and then save! If needed, encounters can be
							edited during a run{' '}
							<em>(if you misjudged your characters ability to wipe the floor with your monsters...again)</em>
						</p>
					</div>
				</article>

				<article className="flex w-full items-center p-4 gap-4">
					<span className="flex justify-center items-center bg-[var(--text-highlight)] w-10 h-10 text-white text-2xl font-bold rounded-full leading-none">
						3
					</span>

					<div className="flex flex-col flex-1 bg-[var(--bg-secondary)] rounded py-2 px-4">
						<h3 className="font-bold">Run Your Encounter</h3>
						<p>
							Set your initiatives, and begin your encounter! Your cards will be ordered automatically, and all you need
							to do is cycle through them as the encounter plays out.
						</p>
					</div>
				</article>
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
		</>
	);
};

export default Home;
