import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';

/* eslint-disable react/forbid-prop-types */

/**
 * Avatar Component
 */

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageStatus: 'loading',
      hasFallback: props.fallbackIcon,
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  render() {
    const {
      alt,
      className,
      fallbackIcon,
      id,
      image,
      shouldRender,
      size,
      style,
    } = this.props;

    const {
      imageStatus,
      hasFallback,
    } = this.state;

    if (!shouldRender) {
      return null;
    }
    const avatarClass = () => classNames({
      'avatar--loading': imageStatus === 'loading' && !hasFallback,
      'avatar--large': size === 'lg',
      'avatar--small': size === 'sm',
      avatar: true,
    }, className);

    return (
      <figure
        id={id}
        data-role="avatar"
        style={style}
        className={avatarClass()}
      >
        <img
          className={fallbackIcon && !image ? 'hidden' : ''}
          alt={alt}
          src={image}
          onLoad={this.handleImageLoaded}
        />
        {
          fallbackIcon && !image &&
            <Icon
              className="avatar__fallback-icon"
              icon={fallbackIcon}
            />
        }
      </figure>
    );
  }
}

Avatar.propTypes = {
  /** id for reference */
  id: PropTypes.string,
  /** className for reference */
  className: PropTypes.string,
  /** Conditional logic to determine if render */
  shouldRender: PropTypes.bool,
  /** Override the inline-styles of the root element || Not Recommended */
  style: PropTypes.object,
  /** Image to display */
  image: PropTypes.string,
  /** Alt text for the image */
  alt: PropTypes.string,
  /** Predefined avatar size */
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  /** Fallback icon for when the image is missing */
  fallbackIcon: PropTypes.string,
};

Avatar.defaultProps = {
  id: '',
  className: '',
  image: '',
  alt: 'Avatar Image',
  shouldRender: true,
  size: 'md',
  style: {},
  fallbackIcon: null,
};

export default Avatar;
