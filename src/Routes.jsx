import Characters from './components/Characters';
import CardView from './components/CardView';
import CharacterCard from './components/CharacterCard';
import Encounters from './components/Encounters';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Preferences from './components/Preferences';
import SourceUpload from './components/SourceUpload';
import EncounterForm from './components/EncounterForm';
import EncounterCard from './components/EncounterCard';
import Form from './components/Form';
import Monsters from './components/Monsters';
import MonsterCard from './components/MonsterCard';
import Run from './components/Run';
import { characterProps, monsterProps } from './utils/formProperties';
import { Link, useRoutes } from 'react-router-dom';

const Routes = ({ toggleTheme }) => {
	const element = useRoutes([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/characters',
			children: [
				{
					index: true,
					element: <Characters />,
				},
				{
					path: ':id',
					element: (
						<CardView storageKey={'characters'}>
							<CharacterCard />
						</CardView>
					),
				},
				{
					path: 'new',
					element: <Form storageKey={'characters'} title={'Character'} properties={characterProps} />,
				},
				{
					path: 'edit/:id',
					element: <Form storageKey={'characters'} title={'Character'} properties={characterProps} isEditing />,
				},
			],
		},
		{
			path: '/encounters',
			children: [
				{
					index: true,
					element: <Encounters />,
				},
				{
					path: 'new',
					element: <EncounterForm />,
				},
				{
					path: ':id',
					element: (
						<CardView storageKey={'encounters'}>
							<EncounterCard storageKey={'encounters'} />
						</CardView>
					),
				},
				{
					path: 'edit/:id',
					element: <EncounterForm />,
				},
				{
					path: 'run/:id',
					children: [
						{
							index: true,
							element: <Run />,
						},
					],
				},
			],
		},
		{
			path: '/monsters',
			children: [
				{
					index: true,
					element: <Monsters />,
				},
				{
					path: 'new',
					children: [
						{
							index: true,
							element: (
								<>
									<Link className="text-right" to={'./source'}>
										add source?
									</Link>
									<Form storageKey={'monsters'} title={'Monster'} properties={monsterProps} />
								</>
							),
						},
						{
							path: 'source',
							element: <SourceUpload />,
						},
					],
				},
				{
					path: ':id',
					element: (
						<CardView storageKey={'monsters'}>
							<MonsterCard />
						</CardView>
					),
				},
				{
					path: 'edit/:id',
					element: <Form storageKey={'monsters'} title={'Monster'} properties={monsterProps} isEditing />,
				},
			],
		},
		{
			path: '/preferences',
			element: <Preferences toggleTheme={toggleTheme} />,
		},
		{
			path: '*',
			element: <NotFound />,
		},
	]);

	return element;
};

export default Routes;
