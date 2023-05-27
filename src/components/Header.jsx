import { NavLink } from 'react-router-dom';
import { GiTreasureMap, GiElfHelmet, GiOrcHead, GiSwordClash, GiSpellBook, GiCog } from 'react-icons/gi';
import { TbCards } from 'react-icons/tb';

const Header = () => {
	const styles = {
		list: 'flex sm:flex-col gap-3 flex-wrap mt-2',
		activeLink: 'flex items-center gap-2 text-[color:var(--text-highlight)] font-bold',
		link: 'flex items-center gap-2 text-[color:var(--text-primary)]',
	};

	return (
		// <nav className="bg-[var(--bg-secondary)] p-2 w-screen sm:w-max sm:p-4 sm:border-r">
		<nav className="bg-[var(--bg-secondary)] flex flex-row sticky top-0 p-2 border-b justify-between sm:border-r sm:border-b-0 sm:justify-normal sm:flex-col sm:h-screen z-10">
			<h1 className="flex text-xl items-center justify-center">
				<TbCards className="text-emerald-700" />
				<span className="hidden md:block"> DM Deck</span>
			</h1>

			<ul className={styles.list}>
				<NavLink to={'/'} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
					<GiTreasureMap size={25} /> <span className="hidden md:block">Home</span>
				</NavLink>

				<NavLink to={'/characters'} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
					<GiElfHelmet size={25} /> <span className="hidden md:block">Characters</span>
				</NavLink>

				<NavLink to={'/monsters'} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
					<GiOrcHead size={25} /> <span className="hidden md:block">Monsters</span>
				</NavLink>

				<NavLink to={'/encounters'} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
					<GiSwordClash size={25} /> <span className="hidden md:block">Encounters</span>
				</NavLink>

				<NavLink to={'/spells'} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
					<GiSpellBook size={25} /> <span className="hidden md:block">Spells</span>
				</NavLink>

				<NavLink to={'/preferences'} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
					<GiCog size={25} /> <span className="hidden md:block">Preferences</span>
				</NavLink>
			</ul>
		</nav>
	);
};

export default Header;
