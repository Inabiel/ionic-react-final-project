import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import axios from "axios";
import { checkmarkOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import "./Tab1.css";

const Profile: React.FC = (props: any) => {
  const { user } = props;
  const [userProfile, setUserProfile] = useState<any>({});
  const [isDataExists, setIsDataExists] = useState(false);
  const [userEdit, setUserEdit] = useState<any>({});
  const [present, dismiss] = useIonToast();
  const history = useHistory();

  const getProfileDataFromDatabase = async () => {
    try {
      const data = await axios.get("/auth/user-profile", {
        headers: {
          Authorization: `Bearer ${user.user.access_token}`,
        },
      });
      const res = data.data;
      setUserProfile(res);
      setIsDataExists(true);
    } catch (e) {
      console.log(e);
    }
  };

  const editUserDetailIntoDatabase = async () => {
    try {
      const data = await axios.put("/auth/change-user-detail", userEdit, {
        headers: {
          Authorization: `Bearer ${user.user.access_token}`,
        },
      });
      if (data) {
        present({
          buttons: [{ text: "Kembali ke Main", handler: () => dismiss() }],
          message: "Berhasil mengganti detail",
          onDidDismiss: () => history.goBack(),
          onWillDismiss: () => console.log("will dismiss"),
        });
      }
    } catch (e) {
      present({
        buttons: [{ text: "Kembali ke Main", handler: () => dismiss() }],
        message: "Ada Masalah di server",
        onDidDismiss: () => console.log("dismissed"),
        onWillDismiss: () => console.log("will dismiss"),
      });
    }
  };

  useIonViewWillEnter(() => {
    getProfileDataFromDatabase();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle className="ion-text-center">Profile</IonTitle>
          <IonButtons slot="primary">
            <IonButton
              color="secondary"
              onClick={() => editUserDetailIntoDatabase()}
            >
              <IonIcon slot="icon-only" color="light" icon={checkmarkOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        {isDataExists && (
          <>
            <IonItem
              className="ion-padding rounded-corner mt-12"
              color="danger"
              lines="none"
            >
              <div className="mx-auto bg-red-700 rounded-full h-28 p-10 w-28 text-2xl font-semibold">
                {userProfile.name.toUpperCase().slice(0, 2)}
              </div>
              <IonLabel slot="end">
                <h1 className="font-extrabold">{userProfile.name}</h1>
                <h1 className="font-extrabold">{userProfile.email}</h1>
              </IonLabel>
            </IonItem>
            <form className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Display Name</IonLabel>
                <IonInput
                  placeholder={userProfile.name}
                  onIonChange={(e) => {
                    const name = e.detail.value!;
                    setUserEdit({ ...userEdit, ...{ name } });
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  placeholder={userProfile.email}
                  onIonChange={(e) => {
                    const email = e.detail.value!;
                    setUserEdit({ ...userEdit, ...{ email } });
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Current Password</IonLabel>
                <IonInput
                  type="password"
                  onIonChange={(e) => {
                    const current_password = e.detail.value!;
                    setUserEdit({ ...userEdit, ...{ current_password } });
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">New Password</IonLabel>
                <IonInput
                  onIonChange={(e) => {
                    const new_password = e.detail.value!;
                    setUserEdit({ ...userEdit, ...{ new_password } });
                  }}
                />
              </IonItem>
            </form>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(Profile);
