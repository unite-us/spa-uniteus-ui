**[See additional PropTypes for fields](#form-elements)**

The SelectField is using [choices.js](https://github.com/jshjohnson/Choices#readme)

#### Basic Select

```jsx
const options = [
  { label: 'item-1', value: 'One', other: 'bla' },
  { label: 'item-2 this one is much longer and should nicely wrap if needed.. still going on and on', value: 'Two' },
  { label: 'item-3', value: 'Three' },
  { label: 'item-4', value: 'Four' },
  { label: 'item-5', value: 'Five' },
];

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
  placeholder: 'Pick one',
  ...isRequired(),
};

<div>
  <SelectField
    id="base-select"
    label="Base select"
    options={options}
    shouldSort={false}
    placeholder={state.placeholder}
    hint="hello bello"
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
      console.log('change', value);
      setState({ value, dirty: true, pristine: false, ...isRequired(value) });
      }}
    onBlur={(e) => {
      console.log('blur', e)
      setState({ touched: true, visited: true });
      }}
  />
  <Button
    style={{ display: 'inline-block', marginRight: '10px' }}
    onClick={() => setState({ value: 'Three' })}
    label="Set value"
  />
  <Button
    style={{ display: 'inline-block' }}
    onClick={() => setState({ value: '' })}
    label="Reset value"
  />
  <Button
    style={{ display: 'inline-block' }}
    onClick={() => setState({ placeholder: 'PICK ONE' })}
    label="Change placeholder Text"
  />
</div>
```

#### Multiple Select

```jsx
const options = [
  { id: 'item-1', name: 'One', other: 'bla' },
  { id: 'item-2 ', name: 'Two this one is much longer and should nicely wrap if needed.. still going on and on' },
  { id: 'item-3', name: 'Three' },
  { id: 'item-4', name: 'Four' },
  { id: 'item-5', name: 'Five' },
];

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
<div>
  <SelectField
    id="multi-select"
    label="Multi select"
    options={options}
    valueKey="id"
    labelKey="name"
    shouldSort={false}
    placeholder="Pick some"
    multiple
    value={state.value}
    valid={state.valid}
    invalid={state.invalid}
    touched={state.touched}
    pristine={state.pristine}
    dirty={state.dirty}
    visited={state.visited}
    error={state.error}
    onChange={(value) => setState({ value, dirty: true, pristine: false })}
    onBlur={(e) => setState({ touched: true, visited: true })}
  />
  <Button
    style={{ display: 'inline-block', marginRight: '10px' }}
    onClick={() => setState({ value: [{ id: 'item-3', name: 'Three' }] })}
    label="Set value"
  />
  <Button
    style={{ display: 'inline-block' }}
    onClick={() => setState({ value: '' })}
    label="Reset value"
  />
</div>
```

#### Async Select with Promise

```jsx
const options = [
  { id: 'item-1', name: 'One', other: 'bla' },
  { id: 'item-2', name: 'Two' },
  { id: 'item-3', name: 'Three' },
  { id: 'item-4', name: 'Four' },
  { id: 'item-5', name: 'Five' },
];

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

function fetcher(search) {
  console.log('searching', search);
  return new Promise((resolve) => {
      setTimeout(() => {
        if(_.isEmpty(search)) {
          resolve({ options });
        }
        resolve({
          options: _.filter(options, (o) => _.includes(_.toLower(o.name), _.toLower(search)))
        });  
      }, 1000);
    });
}

<SelectField
  id="async-select"
  label="Async select"
  valueKey="id"
  labelKey="name"
  shouldSort={false}
  placeholder="Type to search"
  loadOptions={fetcher}
  loadOnMount
  value={state.value}
  onChange={(value) => setState({ value, dirty: true, pristine: false })}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```

#### Async Select with callback

```jsx
const options = [
  { id: 'item-1', name: 'One', other: 'bla' },
  { id: 'item-2', name: 'Two' },
  { id: 'item-3', name: 'Three' },
  { id: 'item-4', name: 'Four' },
  { id: 'item-5', name: 'Five' },
];

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

function fetcher(search, callback) {
  console.log('searching', search);
  setTimeout(() => {
    if(_.isEmpty(search)) {
      callback({ options });
    }
    callback({
      options: _.filter(options, (o) => _.includes(_.toLower(o.name), _.toLower(search)))
    });  
  }, 1000);
}

<SelectField
  id="async-select-callback"
  label="Async select"
  valueKey="id"
  labelKey="name"
  shouldSort={false}
  searchPlaceholderValue="Type to search"
  loadOptions={fetcher}
  value={state.value}
  onChange={(value) => setState({ value, dirty: true, pristine: false })}
  onBlur={(e) => setState({ touched: true, visited: true })}
/>
```
#### Auto-selected value

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
  options: [
    { label: 'I m option 1', value: 'option-1' },
  ],
};

<div>
  <SelectField
    autoSelectValue
    id="auto-select"
    label="Auto selected value"
    options={state.options}
    placeholder="I m an auto-select"
    required
    value={state.value}
    valid={state.valid}
    invalid={state.invalid}
    touched={state.touched}
    pristine={state.pristine}
    dirty={state.dirty}
    visited={state.visited}
    error={state.error}
    onChange={(value) => {
      console.log('autoselected', value);
      setState({ value, dirty: true, pristine: false });
    }}
    onBlur={(e) => setState({ touched: true, visited: true })}
  />
<Button
  label="Add some option"
  onClick={() => {
    const newOptions = _.clone(state.options);
    newOptions.push({
      label: `I m option ${state.options.length + 1}`,
      value: `option-${state.options.length + 1}`,
    });
    setState({ options: newOptions });
  }}
/>
<span>  </span>
<Button
  label="Remove some option"
  onClick={() => {
    if(state.options.length <= 0) {
      return;
    }
    const newOptions = _.clone(state.options);
    newOptions.pop();
    setState({ options: newOptions });
  }}
/>
</div>
```

#### Group Select

```jsx
const options = [
  { id: 'item-1', name: 'One', children: [{ id: '11', name: 'One 1/2' }, { id: '12', name: 'One 2/2' }] },
  { id: 'item-2', name: 'Two', children: [{ id: '21', name: 'Two 1/2' }, { id: '22', name: 'Two 2/2' }] },
  { id: 'item-3', name: 'Three', children: [{ id: '31', name: 'Three 1/2' }, { id: '32', name: 'Three 2/2' }] },
  { id: 'item-4', name: 'Clothing and Household Goods', children: [{ id: '41', name: 'Clothing and Household Goods' }] },
  { id: 'item-5', name: 'Five' },
];

<SelectField
  id="group-select"
  label="Group select"
  options={options}
  valueKey="id"
  labelKey="name"
  shouldSort={false}
  position="top"
  placeholder="Pick one"
/>
```

#### Select with post label content

```jsx
const options = [
  { id: 'item-1', name: 'One', children: [{ id: '11', name: 'One 1/2' }, { id: '12', name: 'One 2/2' }] },
  { id: 'item-2', name: 'Two', children: [{ id: '21', name: 'Two 1/2' }, { id: '22', name: 'Two 2/2' }] },
  { id: 'item-3', name: 'Three', children: [{ id: '31', name: 'Three 1/2' }, { id: '32', name: 'Three 2/2' }] },
  { id: 'item-4', name: 'Clothing and Household Goods', children: [{ id: '41', name: 'Clothing and Household Goods' }] },
  { id: 'item-5', name: 'Five' },
];

const info = (
  <div className="mb-half">
    Select the services that this program directly provides. These include things such as food, clothing, housing, legal services, etc. Select the option(s) that most closely match your services. Learn more about service types.
  </div>
);

<SelectField
  id="group-select"
  label="Group select"
  options={options}
  valueKey="id"
  labelKey="name"
  shouldSort={false}
  position="top"
  placeholder="Pick one"
  postLabelContent={info}
/>
```

### SelectField Best Practices

#### When creating new components, use plain objects for options/field values
- **ALWAYS** set `valueKey`, `labelKey` and `forceObjectValue` props
  - this guarantees we will get an object value on every `onChange`/`onSubmit`
- Massage data `onSubmit`, don't map objects to match `label`/`value` keys

#### **DO**
Use `valueKey`, `labelKey` and `forceObjectValue` props
```jsx static

<SelectField
  id="example-select"
  label="Example Using Plain Objects"
  options={options}
  /* always use the following props */
  valueKey="id"
  labelKey="name"
  forceObjectValue
/>
```

#### **DON'T**
Map options to conform to `label`/`key` properties
```jsx static
const options = networks.map(network => ({
  label: network.name,
  value: network.value,
}));

<SelectField
  id="example-select"
  label="Don't Use Mapped Options"
  options={options}
/>
```

#### When setting `initialValues`
If given an object,
- use that to set the initial value.

```jsx static
function mapStateToProps(state) {
  return {
    initialValues: {
      network: state.user.network,
    },
  };
}
```

If given an id,
  - first, do a lookup on the options array if possible.
  - Otherwise, reconstruct the object with the appropriate `valueKey` as a last resort.

```jsx static
function mapStateToProps(state, ownProps) {
  const networkOptions = ownProps.networkOptions;

  return {
    initialValues: {
      network: _.find(networkOptions, { id: state.user.networkId }) ||
      { id: state.user.networkId } // last resort
    },
  };
}
```
