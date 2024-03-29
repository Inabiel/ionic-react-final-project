import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { homeOutline, personOutline, starOutline } from "ionicons/icons";
import Favourite from "../pages/Favourite";
import Profile from "../pages/Profile";
import Main from "../pages/Main";
import addLink from "../pages/addLink";
import DetailUrl from "../pages/DetailUrl";

const MainTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/main">
          <Main />
        </Route>
        <Route exact path="/favourite">
          <Favourite />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/addlink" component={addLink} />
        <Route path="/detail/:hash" component={DetailUrl} />
        <Redirect exact path="/login" to="/main" />
        <Redirect exact path="/" to="/main"></Redirect>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="main" href="/main">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="favourite" href="/favourite">
          <IonIcon icon={starOutline} />
          <IonLabel>Favourite</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
