```jsx
const initialState = {
  clicked: false,
};

function onEscClick() {
  setState({ clicked: false });
}

function onClose() {
  setState({ clicked: false });
}

<div>
  <Button
    label="Primary Drawer"
    onClick={() => setState({ clicked: !state.clicked })}
  />
  <Drawer
    onClose={onClose}
    onEscClick={onEscClick}
    open={state.clicked}
    width="300px"
  />
</div>
```

```jsx
const initialState = {
  clicked: false,
};

function onClose() {
  setState({ clicked: false });
}

<div>
  <Button
    label="Secondary Drawer /w div container"
    onClick={() => setState({ clicked: !state.clicked })}
    secondary
  />
  <Drawer
    onClose={onClose}
    open={state.clicked}
    secondary
    width="300px"
    title="The drawer is now more responsive... Maybe there's a happy little waterfall happening over here. You got your heavy coat out yet? It's getting colder."
  >
    <div style={{ padding: '10px' }}>
      <a href="#drawer" style={{ display: 'block', padding: '10px 20px'}}>About</a>
      <a href="#drawer" style={{ display: 'block', padding: '10px 20px'}}>Services</a>
      <a href="#drawer" style={{ display: 'block', padding: '10px 20px'}}>Clients</a>
      <a href="#drawer" style={{ display: 'block', padding: '10px 20px'}}>Contact</a>

      <p>
        Maybe there's a happy little waterfall happening over here. You got your heavy coat out yet? It's getting colder. Don't hurry. Take your time and enjoy. Don't fight it, use what happens.
      </p>

      <p>
        It's a super day, so why not make a beautiful sky? Put your feelings into it, your heart, it's your world. We artists are a different breed of people. We're a happy bunch. This is the time to get out all your flustrations, much better than kicking the dog around the house or taking it out on your spouse.
      </p>

      <p>
        No pressure. Just relax and watch it happen. Be brave.
      </p>

      <p>
        Work on one thing at a time. Don't get carried away - we have plenty of time. You don't have to spend all your time thinking about what you're doing, you just let it happen. If we're gonna walk though the woods, we need a little path. And I know you're saying, 'Oh Bob, you've done it this time.' And you may be right. Now then, let's play. If you do too much it's going to lose its effectiveness.
      </p>

      <p>
        You can spend all day playing with mountains. Go out on a limb - that's where the fruit is. If I paint something, I don't want to have to explain what it is. Automatically, all of these beautiful, beautiful things will happen. Let's give him a friend too. Everybody needs a friend. I'm a water fanatic. I love water.
      </p>

      <p>
        Mix your color marbly don't mix it dead. Didn't you know you had that much power? You can move mountains. You can do anything.
      </p>

      <p>
        The little tiny Tim easels will let you down. Let's put some highlights on these little trees. The sun wouldn't forget them.
      </p>

      <p>
        And right there you got an almighty cloud. Paint anything you want on the canvas. Create your own world. The very fact that you're aware of suffering is enough reason to be overjoyed that you're alive and can experience it.
      </p>

      <p>
        This is a happy place, little squirrels live here and play. There comes a nice little fluffer. Talk to trees, look at the birds. Whatever it takes. Only eight colors that you need. Only God can make a tree - but you can paint one.
      </p>

      <p>
        I really believe that if you practice enough you could paint the 'Mona Lisa' with a two-inch brush. A fan brush is a fantastic piece of equipment. Use it. Make friends with it.
      </p>
    </div>
  </Drawer>
</div>
```

```jsx
const initialState = {
  clicked: false,
};

function onEscClick() {
  setState({ clicked: false });
}

<div>
  <Button
    label="Drawer With No Close Button"
    onClick={() => setState({ clicked: !state.clicked })}
  />
  <Drawer
    hideCloseButton
    onEscClick={onEscClick}
    open={state.clicked}
    width="300px"
    secondary
  />
</div>
```
