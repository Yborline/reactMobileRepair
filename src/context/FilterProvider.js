import { Component } from "react";
import filterContext from "./filterContext";
export default class FilterProvider extends Component {
  state = {
    input: "",
    inputIn: (text) => {
      this.setState({ input: text });
    },
  };
  render() {
    return (
      <filterContext.Provider value={this.state}>
        {this.props.children}
      </filterContext.Provider>
    );
  }
}
