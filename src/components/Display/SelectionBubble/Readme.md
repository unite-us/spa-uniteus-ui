```jsx
const label = "I'm a Bubble!";
const selected = { key: "SB", value: "I'm a selected option!" };
const title = "I'm a hovering title!";

function onClick() {
  return console.log('clicked!');
}

  <SelectionBubble
    label={label}
    onClick={onClick}
    selected={selected}
    title={title}
  />
```