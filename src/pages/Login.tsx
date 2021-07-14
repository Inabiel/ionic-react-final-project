import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonGrid,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
} from "@ionic/react";
import { lockClosedOutline, mailOutline } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { LoginAuthAction } from "../redux/action/AuthAction";

const Login: React.FC = (props: any) => {
  const { user, register } = props;
  const [userState, setUserState] = useState<any>({});
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol className="text-center">
              <h1 className="text-5xl font-extrabold text-purple-800 pt-14">
                Masuk
              </h1>
              <img
                src="assets/Mobile-login.jpg"
                width="350px"
                height="350px"
                className="mx-auto pt-14"
                alt=""
              />
            </IonCol>
          </IonRow>
          <IonRow className="">
            <IonCol size="12" className="ion-text-center">
              <form className="ion-padding">
                <IonItem>
                  <IonIcon icon={mailOutline} slot="start" className="mt-6" />
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    onIonChange={(e) => {
                      const email = e.detail.value!;
                      setUserState({ ...userState, ...{ email } });
                    }}
                  />
                </IonItem>
                <IonItem>
                  <IonIcon
                    icon={lockClosedOutline}
                    slot="start"
                    className="mt-6"
                  />
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    onIonChange={(e) => {
                      const password = e.detail.value!;
                      setUserState({ ...userState, ...{ password } });
                    }}
                  />
                </IonItem>
                <IonButton
                  className="ion-margin-top"
                  expand="block"
                  onClick={(e) => register(userState)}
                >
                  Masuk
                </IonButton>
                <IonItem className="mt-3" lines="none">
                  <IonLabel className="font-extrabold ion-text-center">
                    <span className="text-purple-800 text-xl ">
                      Belum punya akun? <Link to="/register">Daftar </Link>
                      disini
                    </span>
                  </IonLabel>
                </IonItem>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (userState: any, history: any) => {
      dispatch(LoginAuthAction(history, userState));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
