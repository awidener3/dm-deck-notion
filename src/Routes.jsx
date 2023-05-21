import Characters from './components/Characters/Characters';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Preferences from './components/Preferences';
import SourceUpload from './components/Form/SourceUpload';
import Encounter from './components/Encounters/Encounter';
import Encounters from './components/Encounters/Encounters';
import EncounterForm from './components/Encounters/EncounterForm';
import Form from './components/Form/Form';
import Monsters from './components/Monsters/Monsters';
import Run from './components/Runs/Run';
import Error from './components/Error';
import Spells from './components/Spells/Spells';
import Monster from './components/Monsters/Monster';
import Character from './components/Characters/Character';
import Spell from './components/Spells/Spell';
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
					element: <Character />,
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
					element: <Encounter />,
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
					element: <Monster />,
				},
				{
					path: 'edit/:id',
					element: <Form storageKey={'monsters'} title={'Monster'} properties={monsterProps} isEditing />,
				},
			],
		},
		{
			path: '/spells',
			children: [
				{
					index: true,
					element: <Spells />,
				},
				{
					path: ':id',
					element: <Spell />,
				},
			],
		},
		{
			path: '/preferences',
			element: <Preferences toggleTheme={toggleTheme} />,
		},
		{
			path: '/error',
			element: <Error />,
		},
		{
			path: '*',
			element: <NotFound />,
		},
	]);

	return element;
};

export default Routes;
