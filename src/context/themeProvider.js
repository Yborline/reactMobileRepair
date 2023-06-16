import { Component } from "react";
import themeContext from "./themeContext";
export default class ProviderTheme extends Component {
  state = {
    themes: "light",
    toggleTheme: () => {
      if (this.state.themes === "light") {
        this.setState({ themes: "dark" });
      } else {
        this.setState({ themes: "light" });
      }
    },
  };
  render() {
    return (
      <themeContext.Provider value={this.state}>
        {this.props.children}
      </themeContext.Provider>
    );
  }
}
