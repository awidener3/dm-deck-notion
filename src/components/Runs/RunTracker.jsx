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

			<table className="border-t-2 border-b-2">
				<thead className="text-left border-b-2">
					<tr>
						<th>Initiative</th>
						<th>Creature</th>
						<th>Hit Points</th>
					</tr>
				</thead>
				<tbody>
					{order.map((item, index) => (
						<tr key={item.id + '-' + item.name}>
							<td className="p-1">
								<input
									type="number"
									className="w-[42px] text-center"
									value={run.initiative_order[index].initiative}
									onChange={(e) => handleInitiativeChange(e, item)}
								/>
							</td>
							<td className="flex items-center gap-2 p-1 w-[100px]">
								<h2 className={index === run.initiative_position ? 'text-[color:var(--text-highlight)]' : ''}>
									{item.name}
								</h2>
							</td>
							<td>
								<input
									type="number"
									className="text-center w-[42px]"
									value={run.initiative_order[index].current_hit_points}
									onChange={(e) => handleHpChange(e, item)}
								/>{' '}
								/ {item.hit_points}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-between">
				<button type="button" onClick={handleDecrement}>
					&larr; previous
				</button>
				<button type="button" onClick={handleIncrement}>
					next &rarr;
				</button>
			</div>
		</section>
	);
}

export default RunTracker;
