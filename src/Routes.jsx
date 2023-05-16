import Characters from './components/Characters';
import Encounters from './components/Encounters';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Preferences from './components/Preferences';
import SourceUpload from './components/SourceUpload';
import EncounterForm from './components/EncounterForm';
import Form from './components/Form';
import Monsters from './components/Monsters';
import Run from './components/Run';
import Error from './components/Error';
import Spells from './components/Spells';
import Monster from './components/Monster';
import Encounter from './components/Encounter';
import Character from './components/Character';
import Spell from './components/Spell';
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
