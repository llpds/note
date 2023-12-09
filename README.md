# FullStackOpen Part 6 (https://fullstackopen.com/en/part6)

## Part A: (https://fullstackopen.com/en/part6/flux_architecture_and_redux)

  - Flux-architecture
  - Redux:
    reducer - func that is given a current state and an action, by actions.state it use  corresponding pure function(identical arguments and no side effects) and return new state.
    
      const noteReducer = (state = initialState, action) => {
        switch(action.type) {
          case 'NEW_NOTE':
            return ...
          case 'TOGGLE_IMPORTANCE':
            return ...
          default:
            return state
        }
      }

    Reducer is never supposed to be called directly from the application's code.

  ...


## Part B: (https://fullstackopen.com/en/part6/many_reducers)

  - Store with complex state
      {
        notes: [
          { content: 'reducer defines how redux store works', important: true, id: 1},
          { content: 'state of store can contain any data', important: false, id: 2}
        ],
        filter: 'IMPORTANT'
      }

  - Combined reducers

    index.js/main.jsx:

      import { createStore, combineReducers } from 'redux'

      ...


      const reducer = combineReducers({
        notes: noteReducer,
        filter: filterReducer
      })

      const store = createStore(reducer)

  - Finishing the filters

      const notes = useSelector(state => state.notes)


      const notes = useSelector(({ filter, notes }) => {
        if ( filter === 'ALL' ) {
          return notes
          }
        return filter  === 'IMPORTANT'
          ? notes.filter(note => note.important)
          : notes.filter(note => !note.important)
        })

  - redux toolkit
      
      npm install @reduxjs/toolkit

    index.js/main.jsx: (instead of Combined reducers)

      import { configureStore } from '@reduxjs/toolkit'

      const store = configureStore({
        reducer: {
          notes: noteReducer,
          filter: filterReducer
        }
      })

    noteReducer.js

      import { createSlice } from '@reduxjs/toolkit'

      ...

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
            const noteToChange = state.find(n => n.id === id)
            const changedNote = { 
              ...noteToChange, 
              important: !noteToChange.important 
            }
            return state.map(note =>
              note.id !== id ? note : changedNote 
            )     
          }
        },
      })

      export const { createNote, toggleImportanceOf } = noteSlice.actions
      export default noteSlice.reducer

      now can use push. Immer uses the mutated state to produce a new, immutable state and thus the state changes remain immutable. (Redux Toolkit utilizes the Immer library )