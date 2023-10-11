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
