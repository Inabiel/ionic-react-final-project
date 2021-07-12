import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonThumbnail,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { Link } from "react-router-dom";

const Front: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol className="text-center">
              <img
                src="assets/front-icon.jpg"
                width="400px"
                height="400px"
                className="mx-auto pt-24"
                alt=""
              />
              <h1 className="text-6xl font-extrabold text-purple-800 pt-10">
                Pendek.in
              </h1>
            </IonCol>
          </IonRow>
          <IonRow className="bg-purple-700 mt-24 lg:py-28 md:py-24 py-12 bottom-0 ion-align-items-center rounded-t-3xl w-full fixed bottom-0">
            <IonCol size="12" className="ion-text-center">
              <Link to="/register">
                <IonButton
                  size="large"
                  color="danger"
                  className="font-extrabold text-3xl"
                >
                  <span className="py-20">Daftar</span>
                </IonButton>
              </Link>
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <Link to="/login">
                <IonButton
                  size="large"
                  color="danger"
                  className="font-extrabold text-3xl"
                >
                  <span className="py-20">Masuk</span>
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Front;
