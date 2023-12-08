const initialState = [
      { content: 'reducer defines how redux store works', important: true, id: 1},
      { content: 'state of store can contain any data', important: false, id: 2}

]


const noteReducer = (state = initialState, action) => {
  console.log('ACTION: ', action)

  switch(action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE':
      return state.map(s => s.id === action.payload.id ? {...s, important: !s.important} : s)
    default:
      return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

export default noteReducer