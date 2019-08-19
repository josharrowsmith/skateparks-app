import React from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRadius } from "../store/actions/radius";
import Slider from "../components/map/slider";

const MAX_RADIUS = 20;
const MIN_RADIUS = 0.1;

class ModalScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setRadius(this.props.radius);
  }

  updateRadius = val => {
    this.props.setRadius(val);
  };

  render() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#00000080"
        }}
      >
        <Slider />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    radius: state.radius.radius
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setRadius
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalScreen);
