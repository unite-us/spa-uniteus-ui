```jsx
<Button
  className="default-button"
  label="Default Button"
  onClick={() => alert('default button')}
/>
```

```jsx
<Button
  className="primary-button"
  label="Primary Button"
  primary
  onClick={() => alert('primary button')}
/>
```

```jsx
<Button
  label="Secondary Button"
  secondary
  onClick={() => alert('secondary Button')}
/>
```

```jsx
<Button
  label="Disabled Button"
  disabled
  primary
  onClick={() => alert('secondary Button')}
/>
```

```jsx
<Button
  label="Icon Right Button"
  primary
  iconRight={<Icon icon="IconCompass" />}
/>

```
```jsx
<Button
  label="Icon Left Button"
  primary
  iconLeft={<Icon icon="IconCompass" />}
/>
```
