import _ from 'lodash';
import { stripHTML } from './sanitize';

function buildChoices(options, valueKey, labelKey, multi, placeholder) {
  const choices = _.reduce(options, (acc, option) => {
    const choice = _.assign({}, {
      label: stripHTML(_.get(option, labelKey, '')),
      value: stripHTML(_.get(option, valueKey, '')),
      disabled: _.get(option, 'disabled'),
    });
    if (_.has(option, 'children') && !_.isEmpty(option.children)) {
      const children = buildChoices(option.children, valueKey, labelKey);
      _.set(choice, 'choices', children);
    }
    return [...acc, choice];
  }, []);
  if (!multi && placeholder) {
    return [
      {
        label: placeholder,
        value: '',
        placeholder: true,
      },
      ...choices,
    ];
  }
  return choices;
}

export default buildChoices;
