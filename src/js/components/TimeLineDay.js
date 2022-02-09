import React from 'react';
import PropTypes from 'prop-types';

class TimeLineDay extends React.Component {
  constructor() {
    super();
    this.state = {
      top: ''
    }
  }
  toggleSelected() {
    this.props.onClick(this.props.dayNumber);
  }
  render() {
    console.log(this.props.dayNumber);
    const timeWrapperStyles = {
      top: this.state.top
    };
    return (
      <li className={(this.props.isSelected) ? 'selected' : ''} onClick={() => this.toggleSelected()}>
        <div className={"direction-r "} onMouseOver={(e) => {
          const coord = e.target.getBoundingClientRect();
          this.setState({
            top: coord.top + 10
          });
        }}>
          <div className="flag-wrapper">
            <span className="flag-point">{this.props.day}</span>
            <span className="flag">{this.props.label}
              {(this.props.technologies.length > 0) ?
                (<span className="time-wrapper" style={timeWrapperStyles}>
                  {/* <span className="time">{this.props.technologies.join(', ')}</span> */}
                  <span className="time">{this.props.technologies.map((technology) => {
                    return technology.title
                  }).join(', ')}</span>
                </span>)
                : ''
              }
            </span>
          </div>
          <div className="desc">{this.props.description}</div>
        </div>
      </li>
    )
  }
}
TimeLineDay.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  day: PropTypes.number,
  label: PropTypes.string.isRequired,
  technologies: PropTypes.array,
  description: PropTypes.string,
  isSelected: PropTypes.bool,
};
TimeLineDay.defaultProps = {
  deph: 1,
  label: '',
  isSelected: false,
  description: "",
  technologies: []
};
export default TimeLineDay;