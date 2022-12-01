___
##### BaseCard Notes
1. The two required Child Components for a `BaseCard` component are the `BaseCardHeader` and `BaseCardBody` components
2. The `BaseCardHeader` is required for the current designs and may have secondary actions    
    displayed on the right side from the title. These actions are passed in as children
3. The `BaseCardBody` is a component that use the `Gradient` component and also allows a bool `withPadding` to determine if the body has padding.
   All other children outside of the `BaseCardHeader` should be placed inside of a `BaseCardBody`
4. The `Expandable` component should be used if there is a need for a expanding/collapsing section. 
   It should not be used inside of a `BaseCardBody` component that has `withPadding: true` due to added padding
    
```jsx harmony
<BaseCard>
  <BaseCardHeader
    title="Base Card with Button"
  >
    <Button
      className="primary-button"
      label="Primary Button"
      onClick={() => alert('primary button')}
      primary
    />
  </BaseCardHeader>
  <BaseCardBody>
    <Expandable header="Expand">
      <div style={{padding: '16px', height: '80px' }}>
        This is a simple expandable card
      </div>
    </Expandable>  
  </BaseCardBody>
</BaseCard>
```    
```jsx harmony
<BaseCard noBorder>
  <BaseCardHeader
    title="Base Card No Border"
  />
  <BaseCardBody>
    <Expandable header="Expand">
      <div style={{padding: '16px', height: '80px' }}>
        To remove border add prop noBorder.
      </div>
    </Expandable>  
  </BaseCardBody>
</BaseCard>
```

```jsx harmony
<BaseCard>
  <BaseCardHeader
    title="Simple BaseCard"
  />
  <BaseCardBody withPadding>
      <div style={{ height: '180px' }}>
        This is a simple base card
      </div>
  </BaseCardBody>
</BaseCard>
```

```jsx harmony
<BaseCard>
  <BaseCardHeader
    title="Base Card"
  />
 <BaseCardBody>
    <Expandable header="Expand">
      <div style={{padding: '16px', height: '80px' }}>
        This is a simple expandable card
      </div>
    </Expandable>
    <Expandable header="Expand Another Would Ya">
      <div style={{padding: '16px', height: '80px' }}>
        Here is another expandable section!
      </div>
    </Expandable>
  </BaseCardBody>
</BaseCard>
```


```jsx harmony
const options = [
  { label: 'item-1', value: 'One', other: 'bla' },
  { label: 'item-2', value: 'Two' },
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
  dirty: false,
  invalid: false,
  placeholder: 'Pick one',
  pristine: true,
  touched: false,
  valid: true,
  value: '',
  visited: false,
  ...isRequired(),
};

<BaseCard>
  <BaseCardHeader
    title="Base Card with Buttons"
  >
    <SelectField
      clearable={false}
      dirty={state.dirty}
      error={state.error}
      hideLabel
      id="base-select"
      invalid={state.invalid}
      label="Base select"
      onBlur={(e) => {
        console.log('blur', e)
        setState({ touched: true, visited: true });
      }}
      onChange={(value) => {
        console.log('change', value);
        setState({ value, dirty: true, pristine: false, ...isRequired(value) });
      }} 
      options={options}
      placeholder={state.placeholder}
      pristine={state.pristine}
      shouldSort={false}
      showError={false}
      showHint={false}
      touched={state.touched}
      valid={state.valid}
      value={state.value}
      visited={state.visited}
    />
    <Button
      className="primary-button"
      label="Primary Larry"
      onClick={() => alert('primary button')}
      primary
    />
  </BaseCardHeader>
  <BaseCardBody>
    <Expandable header="Expand">
      <div style={{padding: '16px', height: '80px' }}>
        This is a simple expandable card
      </div>
    </Expandable>
  </BaseCardBody>
</BaseCard>
```
```jsx harmony
<BaseCard>
  <BaseCardHeader title="Base Card with Table" />
  <Table
    onCellClick={(row, column) => console.log(row, column) }
    secondaryDataList={[0, 1]}
  >
    <TableTitle
      secondary="Don't Show More"
    >
      Table Inside of Card
    </TableTitle>

    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Column 1</TableHeaderColumn>
        <TableHeaderColumn>Column 2</TableHeaderColumn>
        <TableHeaderColumn>Column 3</TableHeaderColumn>
        <TableHeaderColumn>Column 4</TableHeaderColumn>
        <TableHeaderColumn>Column 5</TableHeaderColumn>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableRowColumn>Data</TableRowColumn>
        <TableRowColumn>Data</TableRowColumn>
        <TableRowColumn>Data</TableRowColumn>
        <TableRowColumn>Data</TableRowColumn>
        <TableRowColumn>Data</TableRowColumn>
      </TableRow>

      <TableRow hoverable={false}>
        <TableRowColumn>Data 2 non-hoverable</TableRowColumn>
        <TableRowColumn>Data 2</TableRowColumn>
        <TableRowColumn>Data 2</TableRowColumn>
        <TableRowColumn>Data 2</TableRowColumn>
        <TableRowColumn>Data 2</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
</BaseCard>
```

```jsx harmony
<BaseCard>
  <BaseCardHeader
    title="Base Card with Just a Header"
    withBorder={false}
  />
</BaseCard>
```


```jsx harmony
<BaseCard>
  <BaseCardBody withPadding>
    Base Card with Just a Body
  </BaseCardBody>
</BaseCard>
```
