import {BrowserRouter, Route} from "react-router-dom";
import React from "react";

class Gnashblade extends React.Component {
    state = {
        Component: null
    }

    async componentDidMount() {
        const { App:Tmp } = await import("meteor/gnashblade/client/main.jsx");
        this.setState({ Component: Tmp });
    }

    render() {
        const { Component } = this.state;
        if(Component === null) {
            return null;
        } else {
            return <Component />;
        }
    }
}

export default App = () => {
    return(
      <BrowserRouter>
          <Route exact path={"/gnashblade"}>
              <Gnashblade />
          </Route>
      </BrowserRouter>
    )
}