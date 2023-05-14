import { Link } from 'react-router-dom';
import { SiNotion } from 'react-icons/si';
import { getLocalStorageItem } from '../utils';

const Home = () => {
	const activeRun = getLocalStorageItem('active_run');

	return (
		<>
			<h1 className="italic text-[color:var(--text-highlight)]">DM Deck</h1>
			<hr />

			<div className="flex flex-col gap-5">
				<TextBlock>
					<strong>Welcome to DM Deck!</strong> This app is built for dungeon and game masters of tabletop roleplaying
					games (ttrp's) such as <em>Dungeons & Dragons, Pathfinder, and Gloomhaven</em>.
				</TextBlock>

				<TextBlock>
					Use this tool to build your party, create encounters, and run them like a card game! You can also use this as
					a reference for monster stats, spells, or items.
				</TextBlock>

				<div className="flex gap-5 border px-2 items-center bg-[var(--card-bg)]">
					<SiNotion className="ml-2" size={100} />
					<TextBlock>
						This version of DM Deck was designed to be embedded into <a href="https://www.notion.so/">Notion</a>, and
						will save your encounters in Notion's local storage.
					</TextBlock>
				</div>

				<TextBlock>Have any suggestions or questions? Send an email here (insert email eventually)</TextBlock>
			</div>

			<h2 className="mt-3">Quick Links:</h2>
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
				{activeRun && (
					<li>
						<Link to={`./encounters/run/${activeRun.id}`}>go to active encounter</Link>
					</li>
				)}
			</ul>
		</>
	);
};

const TextBlock = ({ children }) => <p>{children}</p>;

export default Home;
