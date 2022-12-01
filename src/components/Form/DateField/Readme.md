### DateField

```jsx
initialState = {
  value: '1508299200',
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  error: '',
};

<DateField
  id="simple-date"
  label="Simple Date"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  onChange={(value) => {
    console.log('onChange', value);
    setState({ value: value, dirty: true, pristine: false });
  }}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

### DateField with different valueFormat and max date

The date picker limits to 10/5/1999 < date < 10/23/1999 and excludes the 10/13/1999

```jsx
const moment = require('moment');

initialState = {
  value: '10/7/1999',
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  error: '',
};

let formatDateRef;

function validate(value) {
  let error = formatDateRef.validate(value);
  if (_.isEmpty(value)) {
    error = 'Required';
  }
  setState({
    error,
    invalid: !_.isEmpty(error),
    valid: _.isEmpty(error),
  });
}

<DateField
  ref={c => {
    if (c) {
      formatDateRef = c;
    }
  }}
  id="format-date"
  label="More complex Date"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  required
  onChange={(value) => {
    console.log('onChange', value);
    setState({ value: value, dirty: true, pristine: false }, () => validate(value));
  }}
  onBlur={(e) => setState({ touched: true, visited: true })}
  valueFormat="M/D/YYYY"
  maxDate="10/23/1999"
  minDate="10/5/1999"
  shouldDisableDate={(date) => date.isSame(moment('10/13/1999', 'MM/DD/YYYY'), 'day')}
/>
```
