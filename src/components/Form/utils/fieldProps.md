## fieldProps util

This is a group of PropTypes common for all fields.

#### For use with [Redux Form v7.x](https://redux-form.com/7.0.4)

| Prop name | Type      | Description            |
|-----------|-----------|------------------------|
| `input`   | `object`  | The props under the input key are what connects your input component to Redux and are meant to be destructured into your `<input/>` component.            |
| `meta`    | `object`  | The props under the meta key are metadata about the state of this field that redux-form is tracking for you.            |

> **You can simply pass the Uniteus-ui field component to Redux-Form like `<Field component={InputField} />`**

---

#### For use with [Redux Form v5.x](https://redux-form.com/5.3.6)

| Prop name | Type      | Description            |
|-----------|-----------|------------------------|
| `field`   | `object`  | Description            |

---

#### For use without helper library

| Prop name | Type      | Description            |
|-----------|-----------|------------------------|
| `value`   | `string` or `bool` or `object` or `array`  | The value of the field |
| `name`    | `string`  | The name of the field  |
| `onChange`| `func` *required*   | Function called on change event. Gets the event as param  |
| `onBlur`  | `func`    | Function called on blur event. Gets the event as param  |
| `onFocus` | `func`    | Function called on blur event. Gets the event as param  |
| `valid`   | `bool`    | Is the field valid    |
| `invalid` | `bool`    | Is the field invalid  |
| `touched` | `bool`    | Is the field touched  |
| `pristine`| `bool`    | Is the field pristine |
| `dirty`   | `bool`    | Is the field dirty    |
| `visited` | `bool`    | Is the field visited  |
| `error`   | `string`  | The error message to display  |
