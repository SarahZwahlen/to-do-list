import moment from 'moment';


export function TodoList ({data}) {
  return (
    <div className="card">
      <p>{data.title}</p>
      <p>Tasks : {data.tasks.length}</p>
      <p className='time'>{moment(data.createdAt).format('lll')}</p>
    </div>
  )
}