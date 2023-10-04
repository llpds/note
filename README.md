FullStackOpen Part 5

Part A:

- implemented token based authentication which enable users to log in to the application
  - handling login:
      NEW services/login.js: get user data using credentials by axios
      UPD App.js: users states, credantial handlers, login form
  - Creating new notes
      UPD services/notes.js method 'create' uses token in config
