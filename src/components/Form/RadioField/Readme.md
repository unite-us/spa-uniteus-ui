```jsx
initialState = {
  value: 'data_2',
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  error: '',
};

<RadioField
  id="radio-field-id-1"
  className="radio-field-className-1"
  label="Radio Field Label"
  name="radio-field-regular"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  options={
    [
      {
        label: 'Data 1',
        value: 'data_1',
      },
      {
        label: 'Data 2',
        value: 'data_2',
      },
      {
        label: 'Data 7',
        value: 'data_7',
      },
    ]
  }
  onChange={(e) => {
    console.log(e.target.value);
    setState({ value: e.target.value, dirty: true, pristine: false })
  }}
  onBlur={(e) => {
    setState({ touched: true, visited: true })
  }}
/>
```

```jsx
initialState = {
  value: 'data_3',
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  error: '',
};

<RadioField
  id="radio-field-id-2"
  className="radio-field-className-2"
  inline
  inlineLabel
  label="Radio Field Label Inline"
  name="radio-field-inline"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  options={
    [
      {
        label: 'Data 3',
        value: 'data_3',
      },
      {
        label: 'Data 4',
        value: 'data_4',
      },
      {
        label: 'Data 5',
        value: 'data_5',
      },
      {
        label: 'Data 10',
        value: 'data_10',
      },
    ]
  }
  onChange={(e) => {
    setState({ value: e.target.value, dirty: true, pristine: false })
  }}
  onBlur={(e) => {
    setState({ touched: true, visited: true })
  }}
/>
```

### Required radio field
```jsx
const isRequired = (value) => {
  console.log('validate', value)
  return {
    error: !value ? 'Required' : undefined,
    invalid: !value,
    valid: value && value.length > 0 ? true : false,
  };
};

initialState = {
  value: '',
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  ...isRequired(),
};

<RadioField
  id="radio-field-id-3"
  className="radio-field-className-3"
  label="Radio Field Required"
  name="radio-field-required"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  required
  options={
    [
      {
        label: 'Data 3',
        value: 'data_3',
      },
      {
        label: 'Data 4',
        value: 'data_4',
      },
      {
        label: 'Data 5',
        value: 'data_5',
      },
      {
        label: 'Data 10',
        value: '',
      },
    ]
  }
  onChange={(e) => {
    console.log('value', e.target.value);
    setState({
      value: e.target.value,
      dirty: true,
      pristine: false,
      ...isRequired(e.target.value),
    })
  }}
  onBlur={(e) => {
    console.log('blur');
    setState({ touched: true, visited: true })
  }}
/>
```
