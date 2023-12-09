import { createSlice } from '@reduxjs/toolkit'

const initialState = [
      { content: 'reducer defines how redux store works', important: true, id: 1},
      { content: 'state of store can contain any data', important: false, id: 2}
]

const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId(),
      })
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      console.log('state', JSON.parse(JSON.stringify(state)))
      return state.map(s => s.id === id ? {...s, important: !s.important} : s)     
    }
  },
})




// const noteReducer = (state = initialState, action) => {
//   console.log('ACTION: ', action)

//   switch(action.type) {
//     case 'NEW_NOTE':
//       return state.concat(action.payload)
//     case 'TOGGLE_IMPORTANCE':
//       return state.map(s => s.id === action.payload.id ? {...s, important: !s.important} : s)
//     default:
//       return state
//   }
// }


// export const createNote = (content) => {  return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

// export const toggleImportanceOf = (id) => {  return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   }
// }

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer