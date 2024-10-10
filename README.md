### Steps to install Project:
1. Install CORS Chrome Extension
2. main directory run -> npm install -> npm start on terminal
3. Open another tab of terminal then move to the directory location: cd ./front -> npm install -> npm run dev

.env variables to place in that file .env for main directory

NODE_ENV=development
PORT=3000
MONGO_URI="mongodb+srv://shekhar:VD73Z7078P6AlHFs@cluster0.bca2o.mongodb.net/"
JWTKEY="DEVTINDER@123"



### 1. Difference between Controlled and Uncontrolled Components in React
Controlled components are React components where the form data is handled by the component's state. The value of the input is determined by the state, and updates are made via event handlers. Uncontrolled components, on the other hand, manage their own state internally, where the data is accessed via DOM references. Controlled components offer more control and make form handling easier but are more verbose than uncontrolled components.

### 2. Significance of Functional Components in React & Hooks
Functional components are simpler than class-based components and were introduced to handle UI rendering more efficiently. Hooks like `useState`, `useEffect`, and `useRef` allow functional components to manage state and side effects. `useState` manages local component state, `useEffect` handles side-effects like fetching data, and `useRef` helps to directly interact with DOM elements without re-rendering the component.

### 3. Redux Toolkit & Prop Drilling
Redux Toolkit simplifies managing global state in React. It reduces boilerplate code and is designed to work seamlessly with the Redux library for better state management. Prop drilling refers to the process of passing props down through multiple components, which can clutter the code. To avoid it, you can use state management libraries like Redux or React Context API.

### 4. CSS Box Model & Custom Scrollbars
The CSS box model defines how the content, padding, border, and margin of an element are structured. To create custom scrollbars, you can use the `::-webkit-scrollbar` pseudo-element to style the scrollbar components in webkit-based browsers.

### 5. Callback Hell & Avoidance
Callback hell occurs when multiple nested callbacks lead to complex and unreadable code. It can be avoided using promises or async/await, making asynchronous code easier to manage.

### 6. JavaScript Closures
Closures allow a function to access variables from an outer function even after the outer function has completed. A real-world example is a function that returns another function for private variable encapsulation.

### 7. JavaScript Event Loop
The event loop handles asynchronous tasks by managing the execution of non-blocking code. It continuously checks for tasks in the callback queue and executes them when the call stack is empty, ensuring smooth non-blocking execution.

### 8. Async Function Using Promises
function asyncCalls() {
  return firstCall()
    .then(result => secondCall(result))
    .then(result => thirdCall(result))
    .catch(error => handleError(error));
} 

### 9. ES6 Features
ES6 introduced many features like `let/const`, template literals, arrow functions, and destructuring. Example:
const [a, b] = [1, 2]; // Array destructuring in ES6

-> Object Destructuring:
const person = { name: 'Alice', age: 25 };
const { name, age } = person;
console.log(name, age);  // Output: Alice, 25

-> Template Literals
const name = 'John';
const greeting = `Hello, ${name}!`;
console.log(greeting);  // Output: Hello, John!

