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

## Part C: (https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application)

        npm install json-server --save-dev

        "scripts": {
          "server": "json-server -p3001 --watch db.json",
          // ...
        }

  initial state in the root of the project in db.json

  - Getting data from the backend

    services/notes.js:
        
        import axios from 'axios'

        const baseUrl = 'http://localhost:3001/notes'

        const getAll = async () => {
          const response = await axios.get(baseUrl)
          return response.data
        }

        export default { getAll }

    add to noteReducer.js

          setNotes(state, action) { return action.payload }

    add to app.js

          import { useEffect } from 'react'
          import noteService from './services/notes'
          import { setNotes } from './reducers/noteReducer'
          import { useDispatch } from 'react-redux'
          ...
            const dispatch = useDispatch()
            useEffect(() => {
              noteService.getAll().then(notes => dispatch(setNotes(notes)))
            }, [])

  - Sending data to the backend

    add to services.note:
        const createNew = async (content) => {
          const object = { content, important: false }
          const response = await axios.post(baseUrl, object)
          return response.data
        }

    newNote:
        const addNote = async (event) => {
          event.preventDefault()
          const content = event.target.note.value
          event.target.note.value = ''
          const newNote = await noteService.createNew(content)
          dispatch(createNote(newNote))
        }

    noteReducer:
        createNote(state, action) {
          state.push(action.payload)
        },