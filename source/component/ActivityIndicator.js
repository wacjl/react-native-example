
import React from 'react';
import {ActivityIndicator,StyleSheet,View} from 'react-native';
import TimerMixin from 'react-timer-mixin';


 const ToggleAnimatingActivityIndicator = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      animating: true,
    };
  },

  setToggleTimeout() {
    this.setTimeout(() => {
      this.setState({animating: !this.state.animating});
      this.setToggleTimeout();
    }, 2000);
  },

  componentDidMount() {
    this.setToggleTimeout();
  },

  render() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    );
  }
});

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});
export default ToggleAnimatingActivityIndicator