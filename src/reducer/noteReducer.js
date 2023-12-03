const noteReducer = (state = [], action) => {

  switch(action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE':
      return state.map(s => s.id === action.payload.id ? {...s, important: !s.important} : s)
    default:
      return state
  }
}

export default noteReducer