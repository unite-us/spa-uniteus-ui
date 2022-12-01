import React from 'react';

/* eslint-disable react/no-array-index-key */

const COLORS = {
  main: {
    name: 'Main',
    colors:
    [
      { className: 'display-color', type: 'display color', variable: '$display-color', code: '#2C405A' },
      { className: 'body-grey-color', type: 'body grey color', variable: '$body-grey-color', code: '#506784' },
      { className: 'active-color', type: 'active color', variable: '$active-color', code: '#67859E' },
      { className: 'field-border-color', type: 'field border color', variable: '$field-border-color', code: '#D8E5EE' },
      { className: 'cloud-blue-color', type: 'cloud blue color', variable: '$cloud-blue-color', code: '#ECF5FD' },
      { className: 'table-rule-color', type: 'table ruler color', variable: '$table-rule-color', code: '#E5EEF5' },
      { className: 'table-border-color', type: 'table border color', variable: '$table-border-color', code: '#B7D2E5(.8)' },
      { className: '$section-color', type: 'section border color', variable: '$section-color', code: '#FAFBFC' },
    ],
  },
  active_colors: {
    name: 'Active Colors',
    colors: [
      { className: 'united-blue-color', type: 'united blue color', variable: '$united-blue-color', code: '#4571BA' },
      { className: 'sky-blue-color', type: 'sky blue color', variable: 'sky-blue-color', code: '#628ED7' },
      { className: 'deep-blue-color', type: 'deep blue color', variable: 'deep-blue-color', code: '#2D5495' },
      { className: 'grass-color', type: 'grass color', variable: '$grass-color', code: '#4ECE3D' },
      { className: 'eggplant-color', type: 'eggplant color', variable: '$eggplant-color', code: '#712F79' },
    ],
  },
  status: {
    name: 'Status Colors',
    colors: [
      { className: 'canary-color', type: 'canary color', variable: '$canary-color', code: '#F4D316' },
      { className: 'tangie-color', type: 'tangie color', variable: '$tangie-color', code: '#FF9900' },
      { className: 'rosso-color', type: 'rosso color', variable: '$rosso-color', code: '#D0021B' },
      { className: 'united-blue-color', type: 'united blue color', variable: '$united-blue-color', code: '#4571BA' },
      { className: 'grass-color', type: 'grass color', variable: '$grass-color', code: '#4ECE3D' },
      { className: 'avocado-color', type: 'avocado color', variable: 'avocado-color', code: '#078b00' },
      { className: 'silver-color', type: 'silver color', variable: '$silver-color', code: '#CACACA' },
      { className: 'lil-grey-color', type: 'lil grey color', variable: 'lil-grey-color', code: '#F9F9F9' },
    ],
  },
};

function mapColorDivs(color) {
  return COLORS[color].colors.map((c, i) => (
    <div className="col-xs-12 col-sm-2 colors__grid" key={`color-${i}`}>
      <section className="colors__section">
        <div className={`colors__palette-container color-background--${c.className}`} />
        <div className="colors__details">
          <small className="colors__type">{c.type}</small>
          <small className="colors__variable">
            {c.variable}
          </small>
          <span>
            <strong className="uppercase">{c.code}</strong>
          </span>
        </div>
      </section>
    </div>
  ));
}

const Colors = () => {
  const mainDivs = mapColorDivs('main');
  const activeDivs = mapColorDivs('active_colors');
  const statusDivs = mapColorDivs('status');

  return (
    <div className="colors">
      <div className="row colors__row">
        <div className="col-xs-12">
          <h4>{COLORS.main.name}</h4>
        </div>
        {mainDivs}
      </div>

      <div className="row colors__row">
        <div className="col-xs-12">
          <h4>{COLORS.active_colors.name}</h4>
        </div>
        {activeDivs}
      </div>

      <div className="row colors__row">
        <div className="col-xs-12">
          <h4>{COLORS.status.name}</h4>
        </div>
        {statusDivs}
      </div>
    </div>
  );
};

export default Colors;
