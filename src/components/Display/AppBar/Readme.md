```jsx
initialState = {
  opened: false,
  width: '250px',
};

function toggleOpenState() {
  setState({ opened: !state.opened });
}

<div>
  <AppBar
    iconElementLeft={
      <ul>
        <li>Hello</li>
        <li>Hello</li>
        <li>Goodbye</li>
      </ul>
    }
    iconElementRight={
      <div>
        Hello World
      </div>
    }
    onHamburgerIconClick={toggleOpenState}
    opened={state.opened}
  >
  </AppBar>
  <AppSideNav
    width={state.width}
    backgroundColor="red"
    navContent={<div>Side Nav Bar data</div>}
    mainContentStyle={{ height: '500px', backgroundColor: '#D8E5EE'}}
    opened={state.opened}
    style={{ backgroundColor: '#ECF5FD' }}
  >
    <div>Main Content</div>
  </AppSideNav>
</div>
```
