**[See additional PropTypes for fields](#form-elements)**

```jsx
initialState = {
  value: 'hello',
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
  error: '',
};

<InputField
  id="input-1"
  label="Simple Input"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  onChange={(e) => setState({ value: e.target.value, dirty: true, pristine: false })}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

#### Placeholder and hint

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

<InputField
  autoComplete="off"
  id="input-placeholder"
  label="Helpful Input"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  placeholder="Enter something"
  hint="Maybe I can help you"
  onChange={(e) => setState({ value: e.target.value, dirty: true, pristine: false })}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

#### Inline Field

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

<InputField
  id="input-inline"
  label="Inline Input"
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
  hint="Maybe I can help you"
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

<InputField
  id="input-required"
  label="Required Input"
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

#### Disabled Field

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

<InputField
  id="input-disabled"
  label="Disabled Input"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  error={state.error}
  placeholder="I'm disabled"
  disabled
  onChange={(e) => setState({ value: e.target.value, dirty: true, pristine: false })}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

#### Mask field
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

<InputField
  id="input-required"
  label="Required Field (Mask)"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  mask="(999) 999-9999 x 99999"
  placeholder="(999) 999-9999"
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
