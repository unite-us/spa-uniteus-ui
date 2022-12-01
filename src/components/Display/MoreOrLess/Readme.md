```jsx
const HelloChildren = ({ showMore, showLess }) => (
  <div>
    <p>I'm the child content</p>
    { showMore && <p>I'm more</p> }
    { showMore && <p>I'm more</p> }
    <p>I'm some more content</p>
    { showMore && <p>I'm more</p> }
    { showMore && <p>I'm more</p> }
    { showLess && <p>I'm only here in the condensed view</p> }
  </div>
);

<MoreOrLess>
  <HelloChildren />
</MoreOrLess>
```
