import React from 'react';
import _ from 'lodash';

import Icon from '../index';
import { V2ICONS } from '../utils/v2constants';

const V2IconExampleList = () => {
  const icons = _.map(Object.keys(V2ICONS).sort(), (iconName, i) => (
    <div className="col-xs-3" style={{ marginBottom: '15px' }} key={i}>
      <div
        className="icon-list__item"
        style={{ display: 'flex' }}
      >
        <Icon icon={iconName} />
        <span>{`${String.fromCharCode(160)} ${iconName}`}</span>
      </div>
    </div>
  ));

  return (
    <div className="icon-list">
      <div className="row">
        {icons}
      </div>
    </div>
  );
};

export default V2IconExampleList;
