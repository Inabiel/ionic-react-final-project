import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonButtons,
  IonIcon,
  IonBackButton,
  IonInput,
  IonLabel,
  useIonToast,
} from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import axios from "axios";

const AddLink: React.FC = (props: any) => {
  const { user } = props;
  const [link, setLink] = useState<any>({});
  const [present, dismiss] = useIonToast();
  const history = useHistory();

  const insertIntoDatabase = async () => {
    try {
      const dataUrl = await axios.post("/url", link, {
        headers: {
          Authorization: `Bearer ${user.user.access_token}`,
        },
      });
      if (dataUrl) {
        present({
          buttons: [{ text: "Kembali ke Main", handler: () => dismiss() }],
          message: "Berhasil Menambahkan Link",
          onDidDismiss: () => history.goBack(),
          onWillDismiss: () => console.log("will dismiss"),
        });
        return <Redirect to="/main"></Redirect>;
      }
    } catch (e) {
      present({
        buttons: [{ text: "Kembali ke Main", handler: () => dismiss() }],
        message: "Ada Masalah, cek kembali original link dan hash",
        onDidDismiss: () => console.log("dismissed"),
        onWillDismiss: () => console.log("will dismiss"),
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle className="ion-text-center">Tambah Link</IonTitle>
          <IonButtons slot="primary">
            <IonButton color="secondary" onClick={() => insertIntoDatabase()}>
              <IonIcon slot="icon-only" color="light" icon={checkmarkOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <form className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Original Link</IonLabel>
            <IonInput
              onIonChange={(e) => {
                const original_link = e.detail.value ? e.detail.value : "";
                setLink({ ...link, ...{ original_link } });
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Hash (Opsional)</IonLabel>
            <IonInput
              onIonChange={(e) => {
                const hash = e.detail.value ? e.detail.value : "";
                setLink({ ...link, ...{ hash } });
              }}
            />
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};
const mapStateToProps = (state: any) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(AddLink);
