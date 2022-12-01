#### Simple TextField with Placeholder
```jsx
initialState = {
  value: '',
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  error: '',
};

<TextField
  id="textfield-placeholder"
  label="Helpful TextField"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  placeholder="Enter something"
  hint="I'm a multiline text field"
  onChange={(e) => setState({ value: e.target.value, dirty: true, pristine: false })}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

#### TextField Inline Field

```jsx
initialState = {
  value: '',
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  error: '',
};

<TextField
  id="textfield-inline"
  label="TextField Label"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  inline
  placeholder="Enter something"
  onChange={(e) => setState({ value: e.target.value, dirty: true, pristine: false })}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

#### Required field

```jsx
const isRequired = (value) => ({
  error: !value ? 'Required' : undefined,
  invalid: !value,
  valid: value && value.length > 0,
});

initialState = {
  value: '',
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  ...isRequired(),
};

<TextField
  id="textfield-required"
  label="Required Text"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  required
  onChange={(e) => setState({
    value: e.target.value,
    dirty: true,
    pristine: false,
    ...isRequired(e.target.value),
  })}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```
