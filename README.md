FullStackOpen Part 5

Part A:

- implemented token based authentication which enable users to log in to the application
  - handling login:
      NEW services/login.js: get user data using credentials by axios
      UPD App.js: users states, credantial handlers, login form
  - Creating new notes
      UPD services/notes.js method 'create' uses token in config
  - saving the token to the local storage
      UPD App.js: setToken to local storage by window.localStorage.setItem('key', 'value') and then check it using useEffect where getItem method used. Need to parse object using JSON.stringify or JSON.parse

      NB: remove value from localStorage: method removeItem('key') or clear() to delete all values.
