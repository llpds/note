After completing part 5b (ex 5.12) I decide not to do the same app as shown in course and not to continue its repository. It look like double work and cost of time. But 'notes' could be useful and i move it to FSO.

# FullStackOpen Part 5

## Part A:

- token based authentication which enable users to log in to the application
  - handling login:
      NEW services/login.js: get user data using credentials by axios
      UPD App.js: users states, credantial handlers, login form
  - Creating new notes
      UPD services/notes.js method 'create' uses token in config
  - saving the token to the local storage
      UPD App.js: setToken to local storage by window.localStorage.setItem('key', 'value') and then check it using useEffect where getItem method used. Need to parse object using JSON.stringify or JSON.parse

      NB: remove value from localStorage: method removeItem('key') or clear() to delete all values.

## Part B:

  - Displaying loging form only when appropriate.
    ```
      const [loginVisible, setLoginVisible] = useState(false)
      const hideWhenVisible = { display: loginVisible ? 'none' : '' }
      const showWhenVisible = { display: loginVisible ? '' : 'none' }
      <div style={hideWhenVisible}>
        // button
      </div>
      <div style={showWhenVisible}>
        // button/props.children
      </div>
    ```
  - Props.children  (https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
  
      template with slot
      ```
      function Card({ children }) {
       return (
         <div className="card">
           {children}
         </div>
       );
      }       
      export default function Profile() {
       return (
         <Card>
           <p>Other components or code(children)</p>
         </Card>
       );
      }
      ```
  - State of the forms (https://react.dev/learn/sharing-state-between-components)
      lifting state up when a few components use the same state in a parent component that is provided via props
  - References to components with ref (https://react.dev/learn/referencing-values-with-refs)
      useRef stores some object (unnecessary to rendering) that can be modified and is stored for the entire life of the component.
      the child component can access the reference when it's wrapped forwardRef.
      useImperativeHandle provides the declared method to the parent component.
  - One point about components
      When we define a component in React and use it multiple times, each time we create separate instances of the component, each with its own separate state.
  - PropTypes
      We can define the buttonLabel or other props as a mandatory in components
        ```
          import PropTypes from 'prop-types'
        
          Togglable.propTypes = {
            buttonLabel: PropTypes.string.isRequired
          }
        ```
      if the prop is left console will display error message

  - ESLint
    Installed with vite by default

    if VSCode + ESlint plugin return "Failed to load plugin react:...":
      F1 -> settings.json -> chose for WROKSPACE -> "eslint.workingDirectories": [{ "mode": "auto" }]

    .eslintrc.cjs 
    .eslintignore
      node_modules
      dist
      .eslintrc.cjs

    npm run lint 

## Part C:

  - Testing React apps
      test with jest (https://jestjs.io/)
      react-testing-library (https://github.com/testing-library/react-testing-library) - render components for testing purposes:
        npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom @babel/preset-env @babel/preset-react

  - Searching for content in a component
    ```
      render(<Blog blog={blog} user ={user} />)
      const element = screen.getByText('titleTest')
      expect(element).toBeDefined()
    ```
      or use CSS selector to find rendered elements
    ```
      const { container } = render(<Blog blog={blog} user ={user} />)
      const div = container.querySelector('.blog')
      expect(div).toHaveTextContent('titleTest')
    ```

  - Debugging
      screen.debug() or screen.debug(element) - print element to console
  
  - Clicking buttons
      user-event(https://testing-library.com/docs/user-event/intro)

  - Finding elements:
    i like: by id (https://testing-library.com/docs/queries/bytestid)
    in course: by placeholder
      ```const input = screen.getByPlaceholderText('write note content here')```

## Part D: End to End (E2E) tests.
  - Cypress E2E library
    Cypress tests are run completely within the browser.Other libraries run the tests in a Node process, which is connected to the browser through an API.

    ```npm install --save-dev cypress```

    package.json
    ```
      {
       // ...
       "scripts": {

         "dev": "vite --host",
         "build": "vite build",
         "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
         "preview": "vite preview",
         "server": "json-server -p3001 --watch db.json",
         "test": "jest",

         "cypress:open": "cypress open"
       },
       // ...
      }
    ```

    to backend
      ```
          "start:test": "NODE_ENV=test node index.js"
      ```

    npm run cypress:open

      E2E testing / Create new specs / cypress/e2e/note_app.cy.js:
      
      ```
        describe('Note app', function() {
          it('front page can be opened',  function() {
            cy.visit('http://localhost:5173')
            cy.contains('Notes')
            cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
          })

          it('front page contains random text', function() {
            cy.visit('http://localhost:5173')
            cy.contains('wtf is this app?')
          })

          it('user can log in', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')    cy.get('#password').type('salainen')    cy.get('#login-button').click()
            cy.contains('Matti Luukkainen logged in')
          })
        })
      ```
    
    better use function declaration, not arrow func.

    testing note form