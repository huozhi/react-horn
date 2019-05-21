# react-horn
> cross component communication with actions

## Why?

React works based on state/props changes. Corss communication may let you hoist some state to global state like root component state or in redux store. react-horn wants to give user ability to capture the state mutation rather than the final state. It works like event listeners but the listeners are smart in auto subscribing events.

## API

### <Horn.Provider event={event: Event}>

Wrap the `Provider` on your component to make it avaible for broadcast events for any nested component wrapped by `withHorn` and functional component using `useHorn`

`event` is Node.js standard event like instance, at least require it to have `on`, `off`, `emit` 3 methods.
you can create your own event which holding these 3 methods, and pass it to `Horn.Provider`.

### withHorn

HOC `withHorn` provide descendants to fire actions with type and payload to the subscribers.
action scheme is similiar to [FSA](https://github.com/redux-utilities/flux-standard-action).

`{type: string, payload: any?}`

### useHorn

React hooks API has same function comparing to `withHorn`.


## Usage

```js
import EventEmitter from "events"
import Horn, { withHorn } from "react-horn";
import { useHorn } from "react-horn/hooks";

const Dialer = () => {
  function onAck(action) {
    console.log(action.type + ":", action.payload); // ack: 2
  }

  const emit = useHorn();
  return (
    <button onClick={() => emit("syn", 1)}>
      syn
      <Horn.Subscriber on={"ack"} handler={onAck} />
    </button>
  );
};

const Feedback = withHorn(({ emit }) => {
  return (
    <Horn.Subscriber on={"syn"} handler={() => emit("ack", 2)} />
  );
});

const event = new EventEmitter();

render(
  <Horn.Provider event={event}>
    <Dialer />
    <Feedback />
  </Horn.Provider>,
  document.getElementById("root")
);

event.emit('syn');
```

## Playground

[codesandbox example](https://codesandbox.io/s/njm193jr)
