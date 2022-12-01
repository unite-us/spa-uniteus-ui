### Controlled Component with Actions
```jsx
initialState = {
  expanded: false,
};

<Card
  expandable
  expanded={state.expanded}
  onExpandChange={() => setState({ expanded: !state.expanded })}
>
  <CardHeader
    title="Controlled Title"
  />
  <CardActions>
    <div style={{ display: 'flex' }}>
      <Button
        label="Action Button Expand"
        onClick={() => setState({ expanded: true})}
      />
      <Button
        className="btn-reduce ml-half"
        label="Action Button Reduce"
        secondary
        onClick={() => setState({ expanded: false })}
      />
    </div>
  </CardActions>
  <CardText>
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
