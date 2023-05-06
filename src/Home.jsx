const Home = () => (
	<>
		<h1 className="italic text-[color:var(--text-highlight)]">DM Deck</h1>
		<hr />

		<TextBlock>
			<strong>Welcome to DM Deck!</strong> This app is built for dungeon and game masters of tabletop roleplaying games
			(ttrp's) such as <em>Dungeons & Dragons, Pathfinder, and Gloomhaven</em>.
		</TextBlock>

		<TextBlock>
			Use this tool to build your party, create encounters, and run them like a card game! You can also use this as a
			reference for monster stats, spells, or items.
		</TextBlock>

		<TextBlock>
			This version of DM Deck was designed to be embedded into <a href="https://www.notion.so/">Notion</a>, and will
			save your encounters in Notion's local storage.
		</TextBlock>

		<TextBlock>Have any suggestions or questions? Send an email here (insert email eventually)</TextBlock>
	</>
);

const TextBlock = ({ children }) => <p className="mt-3 text-left">{children}</p>;

export default Home;
