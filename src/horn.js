import React from "react";
import HornContext from "./context";

class Provider extends React.Component {
  instancePool = {};

  addInstance = (key, instance) => {
    this.instancePool[key] = instance;
  };

  removeInstance = key => {
    delete this.instancePool[key];
  };

  dispatch = (type, payload) => {
    const pool = this.instancePool;
    Object.keys(pool).forEach(key => {
      const instance = pool[key];
      if (instance.props.on === type) {
        instance.props.handler({ type, payload });
      }
    });
  };

  manager = {
    addInstance: this.addInstance,
    removeInstance: this.removeInstance,
    dispatch: this.dispatch
  };

  render() {
    return (
      <HornContext.Provider value={this.manager}>
        {this.props.children}
      </HornContext.Provider>
    );
  }
}

class Subscriber extends React.Component {
  static contextType = HornContext;
  _uniqId =
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36);

  componentDidMount() {
    this.context.addInstance(this._uniqId, this);
  }

  componentWillUnmount() {
    this.context.removeInstance(this._uniqId, this);
  }

  eventProxy = event => {
    return this.props.handler(event);
  };

  render() {
    return null;
  }
}

function withHorn(WrappedComponent) {
  return class WithHornDispatch extends React.Component {
    static contextType = HornContext;
    render() {
      return React.createElement(WrappedComponent, {
        ...this.props,
        dispatch: this.context.dispatch
      });
    }
  };
}

export { Provider, Subscriber, withHorn };
