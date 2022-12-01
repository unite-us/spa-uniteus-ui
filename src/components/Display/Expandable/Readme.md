### Simple Expandable with initiallyCollapsed as true
```jsx harmony
 <div style={{ width: '300px' }}>
   <Expandable
     header="Simple Expand"
     initiallyCollapsed
     headerTag="h1"
   >
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bill!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
   </Expandable>
 </div>
```

### Expandable with secondary as true
```jsx harmony
 <div style={{ width: '300px' }}>
   <Expandable
     header="Secondary Expand"
     initiallyCollapsed
     secondary
   >
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bill!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
   </Expandable>
 </div>
```

### Expandable with optional id and class
```jsx harmony
 <div style={{ width: '500px' }}>
   <Expandable
     className="optional-class-name"
     header="Expandable Section"
     id="optional-id"
   >
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
     <div>Hello Bill!</div>
     <div>Hello Bob!</div>
     <div>Hello Bob!</div>
   </Expandable>
 </div>
```

```jsx harmony
initialState = {
  expanded: true,
};
<div>
  <Button
    id="Popover1"
    label="Control the Expandable"
    onClick={() => setState({ expanded: !state.expanded })}
    primary
    style={{ marginBottom: '20px' }}
  />

  <Expandable
     className="optional-class-name"
     expanded={state.expanded}
     id="optional-id"
     header={
       <span>
         Controlled Expandable Section
         <span style={{ color: 'red' }}>2 Errors</span>
         <span className="pull-right"><Icon icon="IconTrash" /></span>
       </span>
     }
     onExpandChange={() => {
       console.log('I am being called.');
       setState({ expanded: !state.expanded });
     }}
   >
    <div>
      The Expandable is controlled by the parent by passing in a expanded prop.
      The Expandable will also call an onExpandChange function when it is toggled.
    </div>

  </Expandable>
</div>
```
