import React from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRadius } from "../store/actions/radius";
//Custom slider im workig on
import Slider from "../components/map/slider";

const MAX_RADIUS = 20;
// for some reason firebase gets all data if is 0 ??????
const MIN_RADIUS = 0.1;

class ModalScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setRadius(this.props.radius);
  }

  updateRadius = (val) => {
    this.props.setRadius(val);
  }
  

  render() {
    const { navigation, radius } = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#00000080"
        }}
      >
        <Slider sendData={this.updateRadius}/>
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
