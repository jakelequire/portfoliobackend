---
id: "A00002"
title: "How to Make a Custom React Component"
description: "An example of how to create a custom React Class Component."
date: "02/28/2023"
tags: ["React", "Next"]
category: "React"
image: "Example.jpg"
imageAlt: "Example Alt"
---
# Creating a Custom React Component
React is a popular JavaScript library for building user interfaces. It allows developers to create reusable components that can be combined to build complex UIs. In this tutorial, we will walk through the process of creating a custom React component.

## What is a React Component?
In React, a component is a reusable piece of code that represents a part of a user interface. It can be a button, a form, a card, or any other UI element. Components are built using JavaScript and JSX, a syntax extension that allows developers to write HTML-like code in their JavaScript files.

React components can be classified into two types: functional components and class components. Functional components are simple JavaScript functions that take props as input and return a React element. Class components are more powerful and have additional features like state and lifecycle methods.

## Creating a Class Component
Let's start by creating a simple class component. We will create a component that displays a list of items. Here's the code:

``` jsx
import React from "react";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <ul>
          {this.state.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;
```
In this code, we define a class component called `ItemList`. The constructor method is used to initialize the component's state with an array of items passed in as props. The render method returns a JSX element that displays a title and a list of items.

## Using the Component
To use the `ItemList` component, we need to import it into another file and render it. Here's an example:

``` jsx
import React from "react";
import ItemList from "./ItemList";

const items = ["item 1", "item 2", "item 3"];

export default function App() {
  return <ItemList title="My List" items={items} />;
}
```
In this code, we import the `ItemList` component and pass in an array of items as props. We then create a new functional component called `App` that renders the `ItemList` component with a title of "My List". Finally, we export the `App` component so it can be used in other files.

## Adding Props Validation
In our `ItemList` component, we are assuming that the `items` prop is an array. But what if a developer passes in a non-array value? To prevent bugs and improve the component's usability, we can add props validation using the `propTypes` package.

First, we need to install the package by running the following command:

``` bash
npm install prop-types
```
Next, we need to import the package and add propTypes validation to our component:

``` jsx
import React from "react";
import PropTypes from "prop-types";

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <ul>
          {this.state.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ItemList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

```
## The Component's Lifecycle
React components have what is known as a lifecycle, which refers to the different stages a component goes through from its creation to its destruction. These stages are divided into four main phases: the **initialization phase**, the **mounting phase**, the **updating phase**, and the **unmounting phase**.

### Initialization Phase
The initialization phase happens when a component is first created. This is when the component's constructor method is called, and it's where you typically set the initial state of the component.

### Mounting Phase
The mounting phase is when a component is added to the DOM. This is where you typically do any setup that needs to happen once the component is visible on the page. The `componentDidMount()` lifecycle method is called during this phase, and it's a good place to put any code that needs to interact with the DOM.

### Updating Phase
The updating phase happens whenever a component's state or props change. This is where you typically update any data that needs to be changed based on user interactions or other events. The `componentDidUpdate()` lifecycle method is called during this phase, and it's a good place to put any code that needs to run after the component has updated.

### Unmounting Phase
The unmounting phase happens when a component is removed from the DOM. This is where you typically clean up any resources that the component was using, such as event listeners or timers. The `componentWillUnmount()` lifecycle method is called during this phase, and it's a good place to put any code that needs to run before the component is destroyed.

## Putting it All Together
Now that we've covered the basics of creating a custom React component, let's put it all together and create a more complex example.

Suppose we want to create a custom component that displays a list of items. Each item should have a title and a description, and there should be a button to delete each item from the list. We could create this component using the following code:

``` jsx
import React, { Component } from 'react';

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { id: 1, title: 'Item 1', description: 'Description 1' },
        { id: 2, title: 'Item 2', description: 'Description 2' },
        { id: 3, title: 'Item 3', description: 'Description 3' },
      ],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(itemId) {
    const items = this.state.items.filter(item => item.id !== itemId);
    this.setState({ items });
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        {items.map(item => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button onClick={() => this.handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
}
```
In this example, we're using the `Component` class to define our custom component, and we're defining a `constructor()` method to set the initial state of the component. We're also defining a `handleDelete()` method to remove an item from the list when the "Delete" button is clicked.

In the `render()` method, we're using the `map()` function to loop through the `items` array in the component's state and create a list of items with their titles, descriptions, and "Delete" buttons. When the "Delete" button is clicked, we call the handleDelete() method and pass in the ID of the item to be deleted.

## Using the Component
To use the ItemList component, we need to import it into another file and render it. Here's an example:

``` jsx
import React from 'react';
import ItemList from './ItemList';

export default function App() {
  return <ItemList />;
}
```
In this example, we're importing the `ItemList` component and rendering it in a new functional component called `App`. We're not passing any props to the ItemList component, so it will use the default values defined in the component's `constructor()` method.

## Conclusion
In this article, we've covered the basics of creating a custom React component. We've also looked at the component's lifecycle and how to use the different lifecycle methods to perform different tasks.

### Resources
* [React Docs: Components and Props](https://reactjs.org/docs/components-and-props.html)
* [React Docs: State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
* [React Docs: Handling Events](https://reactjs.org/docs/handling-events.html)
* [React Docs: Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
* [React Docs: Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)