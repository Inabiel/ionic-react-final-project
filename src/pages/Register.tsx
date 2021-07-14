import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonGrid,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import { lockClosedOutline, personOutline, mailOutline } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const Register: React.FC = () => {
  const [userState, setUserState] = useState<any>({});
  const [present, dismiss] = useIonToast();
  const history = useHistory();

  const registerUser = async (e: any) => {
    try {
      if (userState.password !== userState.retypePassword) {
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: "Password must Match",
          onDidDismiss: () => console.log("dismissed"),
          onWillDismiss: () => console.log("will dismiss"),
        });
      }
      if (userState.username === "" && userState.email === "") {
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: "name and email are required",
          onDidDismiss: () => console.log("dismissed"),
          onWillDismiss: () => console.log("will dismiss"),
        });
      }
      const data = await Axios.post("auth/register", userState);
      if (!data) {
        history.push("/register");
      }
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol className="text-center">
              <h1 className="text-5xl font-extrabold text-purple-800 pt-14">
                Daftar
              </h1>
              <img
                src="assets/register-icon.jpg"
                width="350px"
                height="350px"
                className="mx-auto"
                alt=""
              />
            </IonCol>
          </IonRow>
          <IonRow className="">
            <IonCol size="12" className="ion-text-center">
              <form className="ion-padding">
                <IonItem>
                  <IonIcon icon={personOutline} slot="start" className="mt-6" />
                  <IonLabel position="floating">
                    Username (The name must be between 2 and 100 characters.)
                  </IonLabel>
                  <IonInput
                    onIonChange={(e) => {
                      const name = e.detail.value!;
                      setUserState({ ...userState, ...{ name } });
                    }}
                  />
                </IonItem>
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
                  <IonLabel position="floating">
                    Password (Need To be at least 6 characters)
                  </IonLabel>
                  <IonInput
                    type="password"
                    onIonChange={(e) => {
                      const password = e.detail.value!;
                      setUserState({ ...userState, ...{ password } });
                    }}
                  />
                </IonItem>
                <IonItem>
                  <IonIcon
                    icon={lockClosedOutline}
                    slot="start"
                    className="mt-6"
                  />
                  <IonLabel position="floating">Retype Password</IonLabel>
                  <IonInput
                    type="password"
                    onIonChange={(e) => {
                      const password_confirmation = e.detail.value!;
                      setUserState({
                        ...userState,
                        ...{ password_confirmation },
                      });
                    }}
                  />
                </IonItem>
                <IonButton
                  className="ion-margin-top"
                  expand="block"
                  onClick={(e) => registerUser(e)}
                >
                  Daftar
                </IonButton>
                <IonItem className="mt-3" lines="none">
                  <IonLabel className="font-extrabold ion-text-center">
                    <span className="text-purple-800 text-xl ">
                      Sudah punya akun? <Link to="/login">Masuk</Link> Disini
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

export default Register;
