**[See additional PropTypes for fields](#form-elements)**

```jsx
initialState = {
  value: false,
  checked: false,
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
};

<ToggleField
  id="basic-toggle"
  label="Toggle Me"
  checked={state.checked}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  hint="I'm a Toggle!"
  onChange={(e) => {
    setState({ checked: e.target.checked, dirty: true, pristine: false });
  }}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

#### Toggle with label on the left

```jsx
initialState = {
  value: false,
  checked: false,
  valid: true,
  invalid: false,
  touched: false,
  pristine: true,
  dirty: false,
  visited: false,
};

<ToggleField
  id="left-toggle"
  label="Toggle Me"
  value={state.value}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  hint="I'm a Toggle!"
  labelPosition="left"
  onChange={(e) => {
    setState({ value: e.target.checked, dirty: true, pristine: false });
  }}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```
