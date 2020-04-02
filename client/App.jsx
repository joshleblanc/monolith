import {BrowserRouter, Route} from "react-router-dom";
import React from "react";

class Component extends React.Component {
    state = {
        Component: null
    }

    async componentDidMount() {
        const { App:Tmp } = await this.props.import();
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
          <Route path={"/gnashblade"}>
              <Component import={() => import("meteor/gnashblade/client/main.jsx")}/>
          </Route>
          <Route path={"/secret-santa"}>
              <Component import={() => import("meteor/secret-santa/client/main.js")} />
          </Route>
      </BrowserRouter>
    )
}