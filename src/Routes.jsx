import Characters from './Characters';
import CardView from './CardView';
import CharacterCard from './components/CharacterCard';
import Encounters from './Encounters';
import EncounterForm from './components/EncounterForm';
import EncounterCard from './components/EncounterCard';
import Form from './components/Form';
import Home from './Home';
import Monsters from './Monsters';
import MonsterCard from './components/MonsterCard';
import NotFound from './NotFound';
import Preferences from './Preferences';
import Run from './Run';
import SourceUpload from './SourceUpload';
import { characterProps, monsterProps } from './utils/formProperties';
import { Link, useRoutes } from 'react-router-dom';
import RunForm from './components/RunForm';

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
