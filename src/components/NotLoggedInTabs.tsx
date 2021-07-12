import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Front from "../pages/Front";

const NotLoggedInTabs: React.FC = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route exact path="/front">
          <Front />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/front" component={Front} />
        <Redirect exact path="/" to="/front" />
        <Redirect exact path="/main" to="/login" />
      </IonRouterOutlet>
    </>
  );
};

export default NotLoggedInTabs;
