```jsx
<div style={{ minHeight: '100px' }}>
  <Menu
    id="menu-id-123"
    className="menu-className-123"
    anchorElement={<Icon icon="IconEllipsisV" />}
    target="left-right"
  >
    <MenuItem primaryNode="HELLO WORLD YOLO" onClick={() => console.log('Yep')} />
    <MenuItem primaryNode="NOPE" onClick={() => console.log('Nope')}  />
    <MenuItem
      primaryNode={
        <h4>Hello YOU</h4>
      }
    >
    </MenuItem>
    <MenuItem
      primaryNode="Menu subitems"
      menuItems={
        [
          <MenuItem primaryNode="NOPE" onClick={() => console.log('Nope')}  />,
          <MenuItem primaryNode="YES" onClick={() => console.log('yes')}  />
        ]
      }
      subMenuPosition="right-start"
      subMenuTarget="left-right"
    />
    {
      true ? null : <div>Hello World</div>
    }
  </Menu>
</div>
```
