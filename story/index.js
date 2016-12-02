import React, { PropTypes } from 'react';
import { storiesOf } from '@kadira/storybook';
import AsyncChild from '../src/index';

const Example = ({ title }) => <div>{ title }</div>;

Example.propTypes = {
  title: PropTypes.string
};

const myAsyncFunc = (value) => new Promise(resolve => {
  setTimeout(() => resolve(value), 2000);
});

const Basic = () => (
  <AsyncChild>
    { async () => <Example title={ await myAsyncFunc('Hello world !') }/> }
  </AsyncChild>
);

const loading = <Example title='Loading...'/>;

const DefaultValue = () => (
  <AsyncChild default={ loading }>
    { async () => <Example title={ await myAsyncFunc('Hello world !') }/> }
  </AsyncChild>
);

const TryCatch = () => (
  <AsyncChild>
    { async () => {
      let view;

      try {
        view = <Example title={ await myAsyncFunc('Try') }/>;
        throw new Error('error');
      }
      catch (error) {
        view = <div>{ error.message }</div>;
      }

      return view;
    } }
  </AsyncChild>
);

const UsingPromise = () => (
  <AsyncChild>
    { () => new Promise(resolve => setTimeout(() => {
      resolve(<Example title='Hello world !'/>);
    }, 2000)) }
  </AsyncChild>
);

storiesOf('react-async-child', module)
  .add('Basic', () => <Basic/>)
  .add('Using a Promise', () => <UsingPromise/>)
  .add('Default value', () => <DefaultValue/>)
  .add('Using try/catch', () => <TryCatch/>);
