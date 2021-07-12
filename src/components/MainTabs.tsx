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
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";
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
        <Route exact path="/tab2">
          <Tab2 />
        </Route>
        <Route path="/tab3">
          <Tab3 />
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
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={starOutline} />
          <IonLabel>Favourite</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
