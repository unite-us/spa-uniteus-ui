import { RETURN_KEY_CODE, SPACEBAR_KEY_CODE } from './keyCodes';

const navigateOnEnterOrSpace = callback =>
  (e) => {
    if (e.keyCode === RETURN_KEY_CODE || e.keyCode === SPACEBAR_KEY_CODE) {
      e.preventDefault();
      return callback(e);
    }
    return false;
  };

export default navigateOnEnterOrSpace;
