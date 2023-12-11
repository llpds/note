import { createSlice } from '@reduxjs/toolkit'

// const initialState = [
//       { content: 'reducer defines how redux store works', important: true, id: 1},
//       { content: 'state of store can contain any data', important: false, id: 2}
// ]

// const generateId = () =>
// Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      console.log('state', JSON.parse(JSON.stringify(state)))
      return state.map(s => s.id === id ? {...s, important: !s.important} : s)     
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer