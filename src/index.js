import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useAutoControlled } from 'react-auto-controlled';

import './styles.css';

function AppTemplate({ onClick, value, header }) {
  return (
    <div className="App">
      <h2>{header}</h2>
      <div>{value}</div>
      <button onClick={onClick}>Increment</button>
    </div>
  );
}

function App({ header, value: prop, defaultValue: defaultProp }) {
  const [
    value,
    setValue, // The original setValue from React.useState.
    trySetValue,
    getDerivedValueFromProp
  ] = useAutoControlled(0, {
    prop: prop,
    defaultProp: defaultProp
  });

  getDerivedValueFromProp();

  const handleClick = useCallback(() => {
    trySetValue(value + 1);
  }, [value, trySetValue]);

  return <AppTemplate onClick={handleClick} value={value} header={header} />;
}

function Root() {
  return (
    <div>
      <h1 className="App-header">React v16.3</h1>
      <App header="Uncontrolled" />
      <hr />
      <App header="Uncontrolled with Default" defaultValue={123} />
      <hr />
      <App header="Controlled" value={123} />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
