function RunTracker({ run, order, handleDecrement, handleIncrement }) {
	return (
		<section className="flex flex-col bg-[var(--bg-secondary)]">
			<div className="flex justify-evenly gap-2 py-2">
				<div className="flex flex-col text-center font-bold text-lg text-zinc-400 leading-none">
					<span>Round</span>
					<span>{run.round}</span>
				</div>
				<div className="flex flex-col text-center font-bold text-lg text-zinc-400 leading-none">
					<span>Turn</span>
					<span>{run.initiative_position + 1}</span>
				</div>
			</div>

			<div className="flex justify-between">
				<button type="button" onClick={handleDecrement}>
					&larr; previous
				</button>
				<button type="button" onClick={handleIncrement}>
					next &rarr;
				</button>
			</div>

			<table className="border">
				<tbody>
					{order.map((item, index) => (
						<TrackerItem />
						// <tr key={item.id + '-' + item.name}>
						// 	<td className="p-1">
						// 		<input
						// 			type="number"
						// 			className="w-[42px] text-center"
						// 			value={run.initiative_order[index].initiative}
						// 			onChange={(e) => handleInitiativeChange(e, item)}
						// 		/>
						// 	</td>
						// 	<td className="flex items-center gap-2 p-1 w-[100px]">
						// 		<h2 className={index === run.initiative_position ? 'text-[color:var(--text-highlight)]' : ''}>
						// 			{item.name}
						// 		</h2>
						// 	</td>
						// 	<td>
						// 		<input
						// 			type="number"
						// 			className="text-center w-[42px]"
						// 			value={run.initiative_order[index].current_hit_points}
						// 			onChange={(e) => handleHpChange(e, item)}
						// 		/>{' '}
						// 		/ {item.hit_points}
						// 	</td>
						// </tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

function TrackerItem() {
	return (
		<div className="flex">
			<div>initiative</div>
			<div className="flex-1">name</div>
			<div>hp</div>
		</div>
	);
}

export default RunTracker;
