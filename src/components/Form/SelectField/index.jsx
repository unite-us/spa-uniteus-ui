import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Choices from '@unite-us/choices.js';
import _ from 'lodash';
import {
  buildChoices,
  fieldProps,
  getPreferredProp,
  getSelectValue,
} from '../utils';

class SelectField extends PureComponent {
  constructor(props) {
    super(props);

    this.asyncCallback = this.asyncCallback.bind(this);
    this.debounceSetIsOpen = _.debounce(this.setIsOpen, 200);
    this.handleToggle = this.handleToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onHideDropdown = this.onHideDropdown.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onShowDropdown = this.onShowDropdown.bind(this);
    this.setIsOpen = this.setIsOpen.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.setValue = this.setValue.bind(this);
    this.shouldAutoSelect = this.shouldAutoSelect.bind(this);
    this.toggleDisabled = this.toggleDisabled.bind(this);
    this.updateSearchPlaceholderValue = this.updateSearchPlaceholderValue.bind(this);
    this.updateChoicesValue = this.updateChoicesValue.bind(this);

    this.state = {
      asyncOptions: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    const {
      clearable,
      disabled,
      loadingText,
      loadOnMount,
      loadOptions,
      options,
      placeholder,
      position,
      renderChoiceLimit,
      resetScrollPosition,
      searchChoices,
      searchEnabled,
      searchPlaceholderValue,
      searchResultLimit,
      shouldSort,
    } = this.props;

    this.choices = new Choices(this.element, {
      itemSelectText: '',
      loadingText,
      placeholderValue: placeholder,
      position,
      removeItemButton: clearable,
      renderChoiceLimit,
      resetScrollPosition,
      searchChoices,
      searchEnabled,
      searchFields: ['label'],
      searchPlaceholderValue,
      searchResultLimit,
      shouldSort,
      silent: true,
    });
    this.setOptions({ options, placeholder });
    this.toggleDisabled(disabled);
    this.element.addEventListener('change', this.onChange);
    this.element.addEventListener('search', this.onSearch);
    this.element.addEventListener('showDropdown', this.onShowDropdown);
    this.element.addEventListener('hideDropdown', this.onHideDropdown);

    if (loadOnMount && loadOptions) {
      this.onSearch({ detail: { value: '' } });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.placeholder !== nextProps.placeholder) {
      this.setOptions({ options: nextProps.options, placeholder: nextProps.placeholder });
    }
    if (this.props.searchPlaceholderValue !== nextProps.searchPlaceholderValue) {
      this.updateSearchPlaceholderValue(nextProps.searchPlaceholderValue);
    }
    if (this.props.disabled !== nextProps.disabled) {
      this.toggleDisabled(nextProps.disabled);
    }
    if (!_.isEqual(this.props.options, nextProps.options)) {
      this.setOptions({ options: nextProps.options, placeholder: nextProps.placeholder });
    }
    if (!_.isEqual(getPreferredProp(this.props, 'value'), getPreferredProp(nextProps, 'value'))) {
      this.setValue(getPreferredProp(nextProps, 'value'));
    }
  }

  componentWillUnmount() {
    if (this.element) {
      this.element.removeEventListener('change', this.onChange);
      this.element.removeEventListener('search', this.onSearch);
      this.element.removeEventListener('showDropdown', this.onShowDropdown);
      this.element.removeEventListener('hideDropdown', this.onHideDropdown);
    }
    this.choices.destroy();
  }

  onChange() {
    const { valueKey, options, forceObjectValue, shouldSearchOnChange } = this.props;
    const rawValue = this.choices.getValue();
    const optionList = _.isEmpty(options) ? this.state.asyncOptions : options;
    const value = getSelectValue(rawValue, valueKey, optionList, forceObjectValue);
    if (shouldSearchOnChange) { this.onSearch(); }
    const callback = getPreferredProp(this.props, 'onChange');
    if (_.isFunction(callback)) {
      callback(value);
    }
    if (_.isFunction(this.props.onChange) && !_.isEqual(this.props.onChange, getPreferredProp(this.props, 'onChange'))) {
      this.props.onChange(value);
    }
  }

  onSearch(event) {
    const { loadOptions, placeholder } = this.props;
    if (_.isFunction(loadOptions)) {
      const search = _.get(event, 'detail.value', '');
      const result = loadOptions(search, this.asyncCallback());
      if (result instanceof Promise) {
        result.then((response) => {
          const options = _.get(response, 'options', []);
          this.setOptions({ options, placeholder });
          this.setState({ asyncOptions: options });
        });
      }
    }
  }

  onShowDropdown(event) {
    const reduxFormOnFocus = getPreferredProp(this.props, 'onFocus');
    const manualPropsOnFocus = _.get(this.props, 'onFocus');
    if (_.isFunction(reduxFormOnFocus)) {
      reduxFormOnFocus(event);
    }
    if (_.isFunction(manualPropsOnFocus) && reduxFormOnFocus !== manualPropsOnFocus) {
      manualPropsOnFocus(event);
    }

    this.debounceSetIsOpen(true);
  }

  onHideDropdown() {
    const { valueKey, options, forceObjectValue, shouldSearchOnHide } = this.props;
    const rawValue = this.choices.getValue();
    const optionList = _.isEmpty(this.state.asyncOptions) ? options : this.state.asyncOptions;
    const value = getSelectValue(rawValue, valueKey, optionList, forceObjectValue);
    const onBlur = getPreferredProp(this.props, 'onBlur');

    this.debounceSetIsOpen(false);

    this.choices.clearInput();
    if (shouldSearchOnHide) {
      this.onSearch();
    }

    if (_.isFunction(onBlur)) {
      onBlur(value);
    }
    // adding clearTimeout closes dropdown w/o it the dropdown reopens in Internet Explorer.
    clearTimeout(this.debounceSetIsOpen(false));
  }

  /**
   * Sets the selected value(s)
   * @param {(string|object)} value
   * @public
   */
  setValue(originalValue) {
    const {
      multiple,
      options,
    } = this.props;

    let value = originalValue;

    if (this.shouldAutoSelect()) {
      if (multiple) {
        value = [options[0]];
      } else {
        value = options[0];
      }
    }

    this.updateChoicesValue(value);

    if (this.shouldAutoSelect()) {
      this.onChange();
    }
  }

  /**
   * Sets the list of options
   * @param { array } options - Options on the dropdown
   * @param { boolean } replace - default to true, passed to choices.js.  clear option and reset them.
   & @param { string } placeholder - placeholder text in the SelectField
   * @public
   */
  setOptions({ options, replace = true, placeholder }) {
    const {
      labelKey,
      multiple,
      valueKey,
    } = this.props;

    const choices = buildChoices(options, valueKey, labelKey, multiple, placeholder);
    this.choices.setChoices(choices, 'value', 'label', replace);
    this.setValue(getPreferredProp(this.props, 'value'));
  }

  setIsOpen(isOpen) {
    this.setState({ isOpen });
  }

  updateSearchPlaceholderValue(newSearchPlaceholderProp) {
    this.choices.config.searchPlaceholderValue = newSearchPlaceholderProp;
    this.choices.input.placeholder = newSearchPlaceholderProp;
  }

  asyncCallback() {
    return (response) => {
      const options = _.get(response, 'options', []);
      this.setOptions({ options });
      this.setState({ asyncOptions: options });
    };
  }

  shouldAutoSelect() {
    const {
      autoSelectValue,
      required,
      options,
    } = this.props;

    return autoSelectValue && required && options.length === 1;
  }

  updateChoicesValue(value) {
    const {
      multiple,
      placeholder,
      valueKey,
    } = this.props;

    if (_.isEmpty(value)) {
      this.choices.removeActiveItems();
      if (!multiple && !_.isEmpty(placeholder)) {
        this.choices.setValueByChoice('');
      }
      return this.choices;
    }
    if (_.isString(value)) {
      return this.choices.setValueByChoice(value);
    }
    if (_.isArray(value)) {
      this.choices.removeActiveItems();
      return this.choices.setValueByChoice(_.map(value, val => _.get(val, valueKey, val)));
    }
    return this.choices.setValueByChoice(_.get(value, valueKey, ''));
  }

  /**
   * Should the component be disabled or enabled
   * @param {boolean} disabled
   * @public
   */
  toggleDisabled(disabled) {
    if (disabled) {
      this.choices.disable();
    } else {
      this.choices.enable();
    }
  }

  handleToggle(e) {
    e.nativeEvent.stopImmediatePropagation();

    if (!this.state.isOpen) {
      this.debounceSetIsOpen(true);
      this.choices.showDropdown();
      this.choices.input.focus();
    }
  }

  render() {
    const {
      className,
      dataTestElement,
      disabled,
      hideError,
      hideHint,
      hideLabel,
      hint,
      id,
      inline,
      label,
      labelClassName,
      labelKey,
      multiple,
      options,
      postLabelContent,
      required,
      style,
    } = this.props;

    const hasError = getPreferredProp(this.props, 'invalid') && getPreferredProp(this.props, 'touched');
    const containerClass = () => classNames({
      'ui-select-field': true,
      'ui-form-field': true,
      'ui-form-field--inline': inline,
      'ui-form-field--has-error': hasError,
      'ui-form-field--disabled': disabled,
      'ui-select-field--has-error': hasError,
    }, className);
    const labelClass = () => classNames({
      'ui-form-field__label': true,
      'ui-form-field__label--required': required,
      'sr-only': hideLabel,
      [labelClassName]: !_.isEmpty(labelClassName),
    });
    const selectClass = () => classNames({
      hidden: this.shouldAutoSelect(),
    });

    return (
      <div
        className={containerClass()}
        style={style.container}
      >
        <label
          htmlFor={id}
          className={labelClass()}
          style={style.label}
        >
          {label}
        </label>
        {postLabelContent}
        <div style={{ position: 'relative' }}>
          <div className={selectClass()} data-test-element={dataTestElement || `dropdown_${getPreferredProp(this.props, 'name')}`}>
            <select
              id={id}
              multiple={multiple}
              name={getPreferredProp(this.props, 'name')}
              onBlur={getPreferredProp(this.props, 'onBlur')}
              onFocus={getPreferredProp(this.props, 'onFocus')}
              ref={(c) => { this.element = c; }}
            />
          </div>
          {
            multiple &&
              <button
                aria-label="Select multiple "
                className={classNames({
                  'multiple-selector': true,
                  open: this.state.isOpen,
                })}
                onClick={this.handleToggle}
                type="button"
                tabIndex={0}
              />
          }
          {
            this.shouldAutoSelect() &&
              <div className="ui-select-field__auto-selected">
                {_.get(options, `[0].${labelKey}`)}
              </div>
          }
          {
            !hideHint &&
            <div className="ui-form-field__hint" style={style.hint}>
              {hint}
            </div>
          }
          {
            !hideError &&
            <div className="ui-form-field__error" style={style.error}>
              {getPreferredProp(this.props, 'error')}
            </div>
          }
        </div>
      </div>
    );
  }
}

SelectField.propTypes = {
  /** Should the value be auto-selected when only one option available? */
  autoSelectValue: PropTypes.bool,
  /** className for reference */
  className: PropTypes.string,
  /** Show clear item button */
  clearable: PropTypes.bool,
  /** dataTestElement for qa testing */
  dataTestElement: PropTypes.string,
  /** Is the select disabled? */
  disabled: PropTypes.bool,
  /** should the value be the object rather than the value string? */
  forceObjectValue: PropTypes.bool,
  /** Should the label be hidden? */
  hideLabel: PropTypes.bool,
  /** Remove Hint element */
  hideHint: PropTypes.bool,
  /** Remove Error element */
  hideError: PropTypes.bool,
  /** Help text displayed below the select */
  hint: PropTypes.node,
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** Should the label be displayed inline with the select? */
  inline: PropTypes.bool,
  /** label text for button */
  label: PropTypes.node.isRequired,
  /** Key used for the label */
  labelKey: PropTypes.string,
  /**
   * Asynchronous options load function returning a Promise
   * @param {string} input - The search term
   */
  loadOptions: PropTypes.func,
  /** Calls loadOptions with an empty string on mount if true */
  loadOnMount: PropTypes.bool,
  /** The text that is shown while searching, defaults to empty string */
  loadingText: PropTypes.string,
  /** Is multiple select? */
  multiple: PropTypes.bool,
  /** Select options */
  options: PropTypes.array,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Where the dropdown should appear in relation to the input */
  position: PropTypes.oneOf(['auto', 'top', 'bottom']),
  /** Content block that is placed between the label and the field */
  postLabelContent: PropTypes.node,
  /** How many options should be rendered? */
  renderChoiceLimit: PropTypes.number,
  /** Is the field required */
  required: PropTypes.bool,
  /** Whether scroll position should reset after adding an item?, defaults to true */
  resetScrollPosition: PropTypes.bool,
  /** False to disable Choices native search, defaults to true. */
  searchChoices: PropTypes.bool,
  /** If true, search is enabled */
  searchEnabled: PropTypes.bool,
  /** Placeholder for free text input */
  searchPlaceholderValue: PropTypes.string,
  /** Number of results to display */
  searchResultLimit: PropTypes.number,
  /** Should the options be automaticaly sorted? */
  shouldSort: PropTypes.bool,
  /** if true, search is triggered when selection is changed  */
  shouldSearchOnChange: PropTypes.bool,
  /** if true, search is triggered when hiding the drop down  */
  shouldSearchOnHide: PropTypes.bool,
  /** Override the inline-styles of the elements || **Not Recommended** */
  style: PropTypes.shape({
    container: PropTypes.object,
    label: PropTypes.object,
    input: PropTypes.object,
    hint: PropTypes.object,
    error: PropTypes.object,
  }),
  /** Key used for the label */
  valueKey: PropTypes.string,
  /** See fieldProps doc */
  ...fieldProps,
};

SelectField.defaultProps = {
  autoSelectValue: false,
  className: '',
  clearable: true,
  dataTestElement: '',
  disabled: false,
  inline: false,
  forceObjectValue: false,
  hideHint: false,
  hideError: false,
  hideLabel: false,
  hint: '',
  labelClassName: '',
  labelKey: 'label',
  loadingText: '',
  loadOnMount: false,
  loadOptions: null,
  multiple: false,
  options: [],
  placeholder: '',
  position: 'bottom',
  postLabelContent: null,
  renderChoiceLimit: -1,
  required: false,
  resetScrollPosition: false,
  searchChoices: true,
  searchEnabled: true,
  searchPlaceholderValue: '',
  searchResultLimit: 10,
  shouldSort: true,
  shouldSearchOnChange: true,
  shouldSearchOnHide: true,
  style: {
    container: {},
    error: {},
    hint: {},
    label: {},
  },
  valueKey: 'value',
};

export default SelectField;
