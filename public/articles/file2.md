---
id: "A00002"
title: "How to Make a Custom React Component"
date: "02/21/2023"
tags: ["React", "Next"]
category: "React"
image: "Example.jpg"
imageAlt: "Example Alt"
---
## How to Make a Custom React Component
React is a popular JavaScript library used for building user interfaces. It's known for its efficiency and the way it handles component-based architecture. React components are the building blocks of a React application, and there are two types of components: functional and class components.

In this article, we will be focusing on how to create a custom class component in React. We'll explain what a class component is and how to create one from scratch, step by step.

### What is a Class Component?
In React, a class component is a JavaScript class that extends the React.Component class. This class represents a component that can have state and lifecycle methods, and can render JSX elements to the screen.

Let's take a look at a basic example of a class component:

``` jsx
import React from 'react';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}
```
Here, we're importing the React module and extending the React.Component class to create a new component called MyComponent. This component only has a render method, which returns a simple JSX element.

Creating a Custom Class Component
Now that we know what a class component is, let's create a custom one. We'll use the create-next-app@latest tool to set up our project.

First, we'll create a new React app by running the following command in our terminal:

``` bash
npx create-next-app@latest my-app
```
This will create a new Next app in a directory called my-app that uses React.

Next, we'll create a new folder called `components` inside the root directory of our project. Inside this folder, we'll create a new file called `MyComponent.js`. This file will contain our custom class component with the following code:
``` jsx
import React from 'react';

export default class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}
```
Here, we're defining a new class component called `MyComponent` that extends the `React.Component` class. We've added a `render` method that returns a simple JSX element with an h1 heading.

Finally, we need to import and use this component in our `index.js` file. Open up `index.js` and replace the existing code with the following:

``` jsx
import React from 'react';
import MyComponent from './MyComponent';

export default function App() {
  return (
    <div className="App">
      <MyComponent />
    </div>
  );
}
```
Here, we're importing our `MyComponent` component and rendering it inside the `App` function.

If you run the `npm start` command in your terminal to start your React app, you should see the "Hello World" message displayed in your browser.

### Conclusion
In this article, we've learned what a class component is in React and how to create one from scratch. We've walked through an example of creating a custom class component and using it in a React app.

Creating custom components is an essential skill for any React developer, and understanding the fundamentals of class components is an important first step in that process.