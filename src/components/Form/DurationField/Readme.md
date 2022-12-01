### DurationField

```jsx
initialState = {
  startField: {
    value: '1508299200',
    valid: true,
    invalid: false,
    touched: false,
    pristine: true,
    dirty: false,
    visited: false,
    error: '',
    onChange: value => console.log('start', value),
  },
  endField: {
    value: '1510531200',
    valid: true,
    invalid: false,
    touched: false,
    pristine: true,
    dirty: false,
    visited: false,
    error: '',
    onChange: value => console.log('end', value),
  }
};

<DurationField
  id="duration-1"
  label="Pick a Date Range"
  startField={state.startField}
  endField={state.endField}
/>
```

### DurationField with validation

```jsx
let duration;

function validateStart(value) {
  let error = duration.validate(value);
  setState({
    startField: _.assign({}, state.startField, {
      error,
      value,
      invalid: !_.isEmpty(error),
      valid: _.isEmpty(error),
    }),
  });
}
function validateEnd(value) {
  let error = duration.validate(value);
  setState({
    endField: _.assign({}, state.endField, {
      error,
      value,
      invalid: !_.isEmpty(error),
      valid: _.isEmpty(error),
    }),
  });
}


const startCallbacks = {
  onChange: value => {
    console.log('onChange start', value);
    setState({
      startField: _.assign({}, state.startField, { value, dirty: true, pristine: false }),
    }, () => validateStart(value));
  },
  onBlur: () => {
    setState({
      startField: _.assign({}, state.startField, { touched: true, visited: true }),
    });
  },
};

const endCallbacks = {
  onChange: value => {
    console.log('onChange end', value);
    setState({
      endField: _.assign({}, state.endField, { value, dirty: true, pristine: false }),
    }, () => validateEnd(value));
  },
  onBlur: () => {
    setState({
      endField: _.assign({}, state.endField, { touched: true, visited: true }),
    });
  },
};

initialState = {
  startField: {
    value: '10/15/2017',
    valid: true,
    invalid: false,
    touched: false,
    pristine: true,
    dirty: false,
    visited: false,
    error: '',
  },
  endField: {
    value: '11/5/2017',
    valid: true,
    invalid: false,
    touched: false,
    pristine: true,
    dirty: false,
    visited: false,
    error: '',
  }
};

<DurationField
  ref={c => {
    if (c) {
      duration = c;
    }
  }}
  id="duration-2"
  label="Pick a Date Range"
  startField={_.merge(state.startField, startCallbacks)}
  endField={_.merge(state.endField, endCallbacks)}
  valueFormat="M/D/YYYY"
  minDate="10/1/2017"
  maxDate="11/20/2017"
  hint="I have min and max Dates"
/>
```
