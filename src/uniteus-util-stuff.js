
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import './components/index';
import { Button } from './components/index';
import Wrapper from './Wrapper';

export default function Root(props) {
  return (
    <div>
      <section>{props.name} is mounted!</section>
      <Wrapper>
        <p>Wrapper</p>
      </Wrapper>
      <Button
          id={`$asd-use-btn`}
          className="contact-card__confirmation"
          label="Use This Record"
          onClick={() => { console.log('German!!!')}}
        />
    </div>
  );
}

console.log('test 3 outside');
// Anything exported from this file is importable by other in-browser modules.
export function publicApiFunction() {
  console.log('test 3 inside');
}

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

