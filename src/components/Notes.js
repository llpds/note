import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({note, toggleImportance}) => {
  return (
    <li onClick = {toggleImportance}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {

  const dispatch = useDispatch()

  const notes = useSelector(({filter, notes}) => {
    if ( filter === 'ALL' ) {
          return notes
    }
    return filter  === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
    })

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => dispatch(toggleImportanceOf(note.id))}
        />
        // <li
        //   key={note.id} 
        //   onClick={() => dispatch(toggleImportanceOf(note.id))}
        // >
        //   {note.content} <strong>{note.important ? 'important' : ''}</strong>
        // </li>
      )}
    </ul>
  )
}

export default Notes