import React from "react";
import HornContext from "./context";

class Provider extends React.Component {
  constructor(props) {
    super(props);
    const { event } = props;
    this.manager = {
      addEventListener: event.on.bind(event),
      removeEventListener: event.off.bind(event),
      emit: event.emit.bind(event)
    };
  }

  render() {
    return (
      <HornContext.Provider value={this.manager}>
        {this.props.children}
      </HornContext.Provider>
    );
  }
}

class Subscriber extends React.Component {
  constructor(props) {
    super(props);
    this.eventProxy = payload => {
      const { on } = this.props;
      return this.props.handler({ type: on, payload });
    };
  }

  componentDidMount() {
    this.context.addEventListener(this.props.on, this.eventProxy);
  }

  componentDidUpdate(nextProps) {
    if (this.props.on !== nextProps.on && nextProps.on != null) {
      this.context.removeEventListener(this.props.on, this.eventProxy);
      this.context.addEventListener(nextProps.on, this.eventProxy);
    }
  }

  componentWillUnmount() {
    this.context.removeEventListener(this.props.on, this.eventProxy);
  }

  render() {
    return null;
  }
}

Subscriber.contextType = HornContext;

function withHorn(WrappedComponent) {
  class WithHornDispatch extends React.Component {
    render() {
      return React.createElement(WrappedComponent, {
        ...this.props,
        emit: this.context.emit
      });
    }
  }
  WithHornDispatch.contextType = HornContext;
  return WithHornDispatch;
}

export { Provider, Subscriber, withHorn };
