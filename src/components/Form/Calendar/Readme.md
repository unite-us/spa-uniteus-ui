### Calendar

```jsx
initialState = {
  selectedDays: null,
};
<div>
  <p><a href="#">Click me</a></p>
  <Calendar
    month={9}
    year={2017}
    onDayClick={day => {
      console.log('clicked on', day.format('YYYY-MM-DD'));
      setState({ selectedDays: [day] });
    }}
    selectedDays={state.selectedDays}
  />
</div>
```

### Calendar with some options

```jsx
initialState = {
  selectedDays: ['2017-10-23'],
  disabledDays: [
    '2017-10-04',
    '2017-10-05',
    '2017-10-06',
    '2017-10-07',
  ],
};

<Calendar
  month={9}
  year={2017}
  onDayClick={day => {
    console.log('clicked on', day.format('YYYY-MM-DD'));
    setState({ selectedDays: [day] });
  }}
  selectedDays={state.selectedDays}
  disabledDays={state.disabledDays}
  shouldDisableDay={(day) => day.isAfter('2017-10-25')}
/>
```

### Calendar with a date range

```jsx
<Calendar
  month={9}
  year={2017}
  dateRange={{
    start: '2017-10-05',
    end: '2017-10-16',
  }}
/>
```
