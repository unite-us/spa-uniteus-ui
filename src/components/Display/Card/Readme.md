### Simple Card
```jsx
<Card>
  <CardHeader
    title="Simple Card"
    subtitle="subtitle"
  />
  <CardText>
    <div>
      This is a simple non-expandable card
    </div>
  </CardText>
</Card>
```

### Simple Card Bordered
```jsx
<Card
  applyBorder
>
  <CardHeader
    title="Simple Card Bordered"
  />
  <CardText>
    <div>
      This is a simple bordered non-expandable card
    </div>
  </CardText>
</Card>
```

### Controlled Component
- A controlled component allows the user to "Control" when the card expands or hides dependent on the PARENT component.
- To use a controlled component card, you must HAVE `expanded` and `onExpandChange` prop and set the proper state.
- This is useful if you need to attach more functionality when the user wants to expand or hide the content.

```jsx
initialState = {
  expanded: false,
};

<Card
  expanded={state.expanded}
  onExpandChange={() => setState({ expanded: !state.expanded })}
>
  <CardHeader
    title="Controlled Title"
    showExpandableButton
  />
  <CardText expandable>
    <div>
      <h4>Tags</h4>
      <h4>Tags</h4>
      <h4>Tags</h4>
      <h4>Tags</h4>
      <h4>Tags</h4>
    </div>
  </CardText>
</Card>
```

### Uncontrolled Component
- A uncontrolled component forgoes the user control when the card expands or hides.
- You can add an `initiallyExpanded` to expand or hide the text content.

```jsx
<Card
  initiallyExpanded
>
  <CardHeader
    title="Uncontrolled Card and initiallyExpanded"
    showExpandableButton
  />
  <CardText expandable>
    <div>
      This is the 1st text im using
    </div>
  </CardText>
  <CardText expandable>
    <div>
      This is the 1st text im using
    </div>
  </CardText>
  <div>-----------------------</div>
  <CardText expandable>
    <div>
      This is the text I'm using
    </div>
  </CardText>
  <CardActions expandable>
    <Button
      className="random-button"
      label="Random Button"
      onClick={() => alert('random button')}
    />
  </CardActions>
</Card>
```
