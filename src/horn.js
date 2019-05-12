import React from "react";
import HornContext from "./context";

function createHore() {
  const instancePool = {};
  function addInstance(key, instance) {
    instancePool[key] = instance;
  };

  function removeInstance(key) {
    delete instancePool[key];
  };

  function dispatch(type, payload) {
    Object.keys(instancePool).forEach(key => {
      const instance = instancePool[key];
      if (instance.props.on === type) {
        instance.props.handler({ type, payload });
      }
    });
  };

  return {
    addInstance,
    removeInstance,
    dispatch,
  };
}

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.manager = createHore(); 
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
    this._uniqId =
      Math.random()
        .toString(36)
        .substring(2) + new Date().getTime().toString(36);

    this.eventProxy = event => {
      return this.props.handler(event);
    };
  }

  componentDidMount() {
    this.context.addInstance(this._uniqId, this);
  }

  componentWillUnmount() {
    this.context.removeInstance(this._uniqId, this);
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
        dispatch: this.context.dispatch
      });
    }
  };
  WithHornDispatch.contextType = HornContext;
  return WithHornDispatch;
}

export { Provider, Subscriber, withHorn };
