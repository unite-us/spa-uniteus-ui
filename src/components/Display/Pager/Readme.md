```jsx
const perPage = 10;
const total = 32;
const total_pages = _.ceil(total / perPage);

initialState = {
  current_page: 1,
};

function getPagination(page) {
  console.log('current page', page);
  return {
    current_page: page,
    next_page: (page >= total_pages) ? null : page + 1,
    prev_page: (page <= 1) ? null : page - 1,
    per: perPage,
    total_count: total,
    total_pages,
  };
}

  function onNext() {
    setState({ current_page: state.current_page + 1 });
  }

  function onPrev() {
    setState({ current_page: state.current_page - 1 });
  }

<Pager
  className="pager-example"
  onNextClick={onNext}
  onPrevClick={onPrev}
  paging={getPagination(state.current_page)}
/>
```