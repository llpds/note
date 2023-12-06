# FullStackOpen Part 6 (https://fullstackopen.com/en/part6)

## Part A: (https://fullstackopen.com/en/part6/flux_architecture_and_redux)

  - Flux-architecture
  - Redux:
    reducer - func that is given a current state and an action, by actions.state it use  corresponding clean function() and return new state.
    
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

  ...