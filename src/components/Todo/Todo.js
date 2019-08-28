import React, { Component } from 'react';
import { connect } from 'react-redux';

import { todoIsActive } from '../../actions/todo';
import './Todo.css';

const mapStateToProps = state => {
  return {
    isActive: state.todoIsActive,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleActive: bool => dispatch(todoIsActive(bool)),
  };
};

class Todo extends Component {
  constructor(props) {
    super(props);

    this.handleToggleState = this.handleToggleState.bind(this);

    this.state = {
      changed: false,
    };
  }

  /**
   * @desc Open and close the settings popup
   */
  handleToggleState() {
    this.props.toggleActive(!this.props.isActive);
  }

  render() {
    return (
      <div className="todo">
        <button className="todo__control" onClick={this.handleToggleState}>
          Todo
        </button>
        {this.renderPopup()}
      </div>
    );
  }

  renderPopup() {
    if (this.props.isActive) {
      return (
        <div>
          <div
            className="todo__overlay"
            onClick={() => {
              this.handleToggleState(false);
            }}
          />
          <div className="todo__popup">Hi</div>
        </div>
      );
    }

    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
