import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Tab extends Component {
  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    const {
      activeTab,
      value,
      children,
    } = this.props;

    if (_.isEqual(activeTab, value)) {
      this.setContent(children);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      activeTab,
      value,
      children,
    } = nextProps;

    if (!_.isEqual(activeTab, this.props.activeTab) && _.isEqual(activeTab, value)) {
      this.setContent(children);
    }
  }

  onKeyPress(event) {
    event.preventDefault();
    if (event.charCode === 13 || event.charCode === 32) {
      this.props.onChange(this.props.value);
    }
  }

  setContent(children) {
    const childrenElement = _.isEmpty(children) ? null : children;
    this.props.setContent(childrenElement);
  }

  render() {
    const {
      id,
      className,
      style,
      activeTab,
      value,
      label,
    } = this.props;

    const tabClass = () => classNames({
      'ui-tab': true,
      'ui-tab--active': activeTab === value,
    }, className);

    return (
      <div className="ui-tab-container">
        <div
          id={id}
          className={tabClass()}
          style={style}
          onClick={() => this.props.onChange(value)}
          role="button"
          tabIndex={0}
          onKeyPress={this.onKeyPress}
        >
          <div className="ui-tab__label">
            {label}
          </div>
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Sets the text value of the tab item to the string specified. */
  label: PropTypes.string.isRequired,
  /** If value prop passed to Tabs component, this value prop is also required. It assigns a value to the tab so that it can be selected by the Tabs. */
  value: PropTypes.string.isRequired,
  /**
   * Called when the selected value change.
   * @ignore
   */
  onChange: PropTypes.func.isRequired,
  /**
   * active tab value
   * @ignore
   */
  activeTab: PropTypes.string,
  /**
   * set Content on active Tab
   * @ignore
   */
  setContent: PropTypes.func,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
};

Tab.defaultProps = {
  id: '',
  className: '',
  style: {},
  children: [],
  onChange: _.noop,
  label: '',
  setContent: _.noop,
  activeTab: '',
};

export default Tab;
