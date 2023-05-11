import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

const SourceUpload = () => {
	const [file, setFile] = useState({});
	const [monsters, setMonsters] = useLocalStorage('monsters', []);
	const [sources, setSources] = useLocalStorage('sources', []);

	const handleUpload = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], 'UTF-8');
		fileReader.onload = (e) => setFile(JSON.parse(e.target.result));
	};

	const handleSubmit = () => {
		const newSource = {
			source: file.source,
			abbr: file.abbr,
			version: file.version,
		};

		const newMonsters = file.monsters;

		setMonsters(() => [...monsters, ...newMonsters]);
		setSources(() => [...sources, newSource]);
	};

	const code = `	// source-file.json

	{
		"source": "your source",
		"version": "0.0.0",
		"monsters": [
			{
				// monster data
			},
		]
	}`;

	return (
		<>
			<h2>Source Upload</h2>
			<div className="flex justify-between">
				<form onSubmit={handleSubmit}>
					<input type="file" className="p-2 border-0" onChange={handleUpload} required={true} />
					<button type="submit">Save</button>
				</form>
			</div>

			<p>
				Sources should be formatted with a <code>source</code> and <code>version</code> property, and a{' '}
				<code>monsters</code> array of objects.
			</p>

			<pre className="mt-5">{code}</pre>
		</>
	);
};

export default SourceUpload;
