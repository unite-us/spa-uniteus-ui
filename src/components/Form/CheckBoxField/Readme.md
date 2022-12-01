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

<CheckBoxField
  id="basic-checkbox"
  label="Try to check me"
  checked={state.checked}
  valid={state.valid}
  invalid={state.invalid}
  touched={state.touched}
  pristine={state.pristine}
  dirty={state.dirty}
  visited={state.visited}
  hint="Helper text for a CheckBox"
  onChange={(e) => {
    setState({ checked: e.target.checked, dirty: true, pristine: false });
  }}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

#### CheckBox with label on the left

```jsx
initialState = {
  value: false,
  checked: false,
  valid: false,
  invalid: true,
  touched: true,
  pristine: true,
  dirty: false,
  visited: false,
};

<fieldset>
  <legend>This is in a fieldset element</legend>
  <CheckBoxField
    id="left-checkbox"
    label="I've the checkbox on the right"
    value={state.value}
    valid={state.valid}
    invalid={state.invalid}
    touched={state.touched}
    pristine={state.pristine}
    dirty={state.dirty}
    visited={state.visited}
    hint=""
    labelPosition="left"
    error="Error text for a CheckBox"
    onChange={(e) => {
      setState({ value: e.target.checked, dirty: true, pristine: false });
    }}
    onBlur={(e) => setState({ touched: true, visited: true })}
  />
</fieldset>
```
