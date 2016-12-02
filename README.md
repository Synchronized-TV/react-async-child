# react-async-child

React Component to render asynchronously.

### Usage

```jsx
import React, { PropTypes } from 'react';
import AsyncChild from 'react-async-child';
import Example from './Example';

const Demo = () => (
  <AsyncChild>
    { async () => <Example title={ await myAsyncFunc() }/> }
  </AsyncChild>
);
```

### Examples

#### Destructuring

```jsx
<AsyncChild>
  { async () => <Example { ...(await getProps()) }/> }
</AsyncChild>
```

#### Try / catch

```jsx
<AsyncChild>
  { async () => {
    let view;

    try {
      view = <Example title={ await myAsyncFunc() }/>;
    }
    catch (error) {
      view = <div>{ error.message }</div>;
    }

    return view;
  } }
</AsyncChild>
```

#### Without async/await syntax, using a Promise

```jsx
<AsyncChild>
  { () => new Promise(resolve => setTimeout(() => {
    resolve(<Example title='Hello world !'/>);
  }, 2000)) }
</AsyncChild>
```

#### React Router v4 async route with transition

Here we return an `<AsyncChild/>` component in a React Router `<Match/>` children prop. When the route is matched, it will wait for the `db.find()` async function and then render the result. If the route changes, it will wait again, and rerender again. This will make the transition trigger only after the async function is complete.

```jsx
const MyAsyncView = ({ components }) => (
  <Match
    pattern='/some/:id'
    children={ ({ matched, params: { id } = {} }) => (
      <AsyncChild>
        { async () => (
          <ReactCSSTransitionGroup
            transitionName='some-transition'
            transitionEnterTimeout={ 300 }
            transitionLeaveTimeout={ 300 }
          >
            { matched ? (
              <div key={ id }>
                <SomeComponent { ...(await db.find(id)) }/>
              </div>
            ) : null }
          </ReactCSSTransitionGroup>
        ) }
      </AsyncChild>
    ) }
  />
);
```

<!-- react-components-docs -->
[index.js](src/index.js)
### 

#### Props

##### children

- **required:** true
- **type:** func 

An async function that returns a React element.

##### default

- **required:** false
- **type:** node 

A React element to render until the async function has not been resolved.
<!-- react-components-docs:end -->
