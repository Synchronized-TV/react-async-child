import { Component, PropTypes } from 'react';

export default class AsyncChild extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);

    this.state = {
      children: props.default
    };
  }

  componentDidMount() {
    this.renderAsync(this.props.children);
  }

  componentWillReceiveProps(nextProps) {
    this.renderAsync(nextProps.children);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.children !== nextState.children;
  }

  componentWillUnmount() {
    this.didUnmount = true;
  }

  async renderAsync(asyncFunc) {
    asyncFunc()
      .then(rendered => {
        if (!this.didUnmount) {
          this.setState({ children: rendered });
        }
      })
      .catch(error => {
        console.warn(error);
      });
  }

  render() {
    return this.state.children;
  }
}

AsyncChild.propTypes = {
  /**
   * An async function that returns a React element.
   */
  children: PropTypes.func.isRequired,
  /**
   * A React element to render until the async function has not been resolved.
   */
  default: PropTypes.node
};

AsyncChild.defaultProps = {
  default: null
};
