import { Link } from 'react-router-dom';
import { SiNotion } from 'react-icons/si';
import { getLocalStorageItem } from '../utils';

const Home = () => {
	const activeRun = getLocalStorageItem('active_run');

	const styles = {
		header: 'italic text-[color:var(--text-highlight)] border-b',
		message: 'gap-5 p-2 items-center bg-[var(--card-bg)]',
		container: 'mt-3 flex flex-col gap-5',
		notionCard: 'flex flex-col md:flex-row gap-5 p-2 items-center bg-[var(--card-bg)]',
		quickMsgContainer: 'py-3',
	};

	return (
		<>
			<h1 className={styles.header}>DM Deck</h1>

			<section className={styles.container}>
				<p>
					<strong>Welcome to DM Deck!</strong> This app is built for dungeon and game masters of tabletop roleplaying
					games (ttrp's) such as <em>Dungeons & Dragons, Pathfinder, and Gloomhaven</em>.
				</p>

				<p>
					Use this tool to build your party, create encounters, and run them like a card game! You can also use this as
					a reference for monster stats, spells, or items.
				</p>

				<article className={styles.notionCard}>
					<SiNotion size={75} />
					<p>
						This version of DM Deck was designed to be embedded into <a href="https://www.notion.so/">Notion</a>, and
						will save your encounters in Notion's local storage.
					</p>
				</article>
			</section>

			<section className={styles.container}>
				<h2 className="text-lg border-b">What now?</h2>

				<ol className="flex flex-col gap-2">
					<li>
						<strong>
							<em>1. Create Your Characters.</em>
						</strong>
						Start by adding your party members. The details are limited, but that's because their abilities aren't your
						job!
					</li>
					<li>
						<strong>
							<em>2. Make an Encounter.</em>
						</strong>
						Name it, assign some characters, assign some monsters, and push save!
					</li>
					<li>
						<strong>
							<em>3. Run Your Encounter.</em>
						</strong>
						Set your initiatives, and begin your encounter! Your cards will be ordered automatically, and all you need
						to do is cycle through them as the encounter plays out!
					</li>
				</ol>
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
