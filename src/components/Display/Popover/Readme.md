```jsx
initialState = {
  popoverOpen: false,
}

function toggleIt() {
  setState({ popoverOpen: !state.popoverOpen })
}

<div>
  <Button
    id="Popover1"
    onClick={toggleIt}
    label="Launch Popover"
  />
  <Popover
    placement="bottom"
    isOpen={state.popoverOpen}
    target="Popover1"
    toggle={toggleIt}
    header="This is the Header"
    body={
      <div>Hello World</div>
    }
  />
</div>
```
