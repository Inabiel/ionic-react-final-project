import { Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import MainTabs from "./components/MainTabs";
import { connect } from "react-redux";
import NotLoggedInTabs from "./components/NotLoggedInTabs";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = (props: any) => {
  const { auth } = props;

  return (
    <IonApp>
      <IonReactRouter>
        <Route
          path="/"
          component={auth.isLoggedIn ? MainTabs : NotLoggedInTabs}
        />
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = (state: any) => {
  return {
    auth: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (history: any) => {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
