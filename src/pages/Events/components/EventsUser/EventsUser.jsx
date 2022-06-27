import { useSorting } from '../../../../hook/useSorting';
import { getClassNames } from '../../../../functions/getClassNames';

import './EventsUser.scss';
import { useSelector } from 'react-redux';

const EventsUser = () => {
	const eventsData = useSelector(state => state.events.eventsData);
	const { items, requestSort, sorting } = useSorting(eventsData);
	return (
		<main>
			<div className={'container-xl'}>
				<h3 className={'page-name pt-2'}> Events </h3>
			</div>

			<div className={'container-xl'}>
				<table className='table'>
					<thead>
						<tr>
							<th
								scope='col'
								onClick={() => requestSort('name')}
								className={`${getClassNames('name', sorting)} w-25 pointer`}
							>
								Name
							</th>
							<th
								scope='col'
								onClick={() => requestSort('date')}
								className={`${getClassNames('date', sorting)} w-25 pointer`}
							>
								Date
							</th>
							<th
								scope='col'
								onClick={() => requestSort('score')}
								className={`${getClassNames('score', sorting)} w-50 pointer`}
							>
								Score
							</th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<tr key={item.id}>
								<td className='name-column'>{item.name}</td>
								<td>
									{item.date.substr(0, 10) + ' ' + item.date.substr(11, 8)}
								</td>
								<td>{item.score}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
};

export default EventsUser;
