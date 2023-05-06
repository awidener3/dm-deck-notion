import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<>
			<h1 className="text-center italic">Not Found!</h1>
			<p>It's unfortunate you are here. It means that you've come across a place that doesn't exist! </p>
			<Link to={'../'}>return to the material plane?</Link>
		</>
	);
}

export default NotFound;
