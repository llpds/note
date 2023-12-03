const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload)
  }

  if(action.type === 'TOGGLE_IMPORTANCE'){
   return state.map(s => s.id === action.payload.id ? {...s, important: !s.important} : s)
  }

  return state
}
export default noteReducer