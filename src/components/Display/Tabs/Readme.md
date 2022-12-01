```jsx
initialState = {
  value: 'Apple'
};

function consoleIt(value) {
  setState({ value });
}

<Tabs
  onChange={consoleIt}
  value={state.value}
>
  <Tab
    value="Apple"
    label="Apple"
  >
    <div>
      Hello Apple
    </div>
  </Tab>

  <Tab
    value="Dog"
    label="Dog"
  >
    <div>
      Hello Dog
    </div>
  </Tab>
</Tabs>
```
