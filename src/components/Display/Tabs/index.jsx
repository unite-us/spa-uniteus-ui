import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filterChildren from '../../utils/Children/filterChildren';

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
    };

    this.setContent = this.setContent.bind(this);
  }

  setContent(content) {
    this.setState({ content });
  }

  render() {
    const {
      className,
      id,
      style,
      value,
    } = this.props;

    const tabsClass = () => classNames({
      'ui-tabs': true,
    }, className);

    const newChildren = filterChildren(this.props.children, {
      onChange: this.props.onChange,
      setContent: this.setContent,
      activeTab: value,
    });

    return (
      <div id={id} className={tabsClass()} style={style}>
        {newChildren}
        {this.state.content}
      </div>
    );
  }
}

Tabs.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** selects the tab whose value prop matches this prop. */
  value: PropTypes.string.isRequired,
  /** Called when the selected value change. */
  onChange: PropTypes.func.isRequired,
  /**
   * children props for content inside
   * @ignore
   */
  children: PropTypes.node,
};

Tabs.defaultProps = {
  id: '',
  className: '',
  children: [],
  style: {},
};

export default Tabs;
