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
  IonList,
  useIonToast,
  useIonAlert,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import "./Tab1.css";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import QRCode from "qrcode.react";

const DetailUrl: React.FC = (props: any) => {
  const { user } = props;
  const [qrCodeStatus, setQrCodeStatus] = useState(false);
  const [detail, setDetail] = useState<any>({});
  const [isDataExists, setIsDataExists] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [present, dismiss] = useIonToast();
  const { hash }: any = useParams();
  const history = useHistory();
  const [present_alert] = useIonAlert();

  const insertIntoDatabase = async () => {
    try {
      const getDetailUrl = await axios.get(`/url/${hash}`, {
        headers: {
          Authorization: `Bearer ${user.user.access_token}`,
        },
      });
      const response = getDetailUrl.data;
      setDetail(response);
      setIsDataExists(true);
    } catch (e) {
      console.log(e);
    }
  };

  const editHashLinkToDatabase = async () => {
    try {
      const getDetailUrl = await axios.put(`/url/${hash}`, editData, {
        headers: {
          Authorization: `Bearer ${user.user.access_token}`,
        },
      });
      if (getDetailUrl) {
        present({
          buttons: [{ text: "Kembali ke main page", handler: () => dismiss() }],
          message: "Berhasil Edit",
          onDidDismiss: () => history.goBack(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteLinkFromDatabase = async () => {
    try {
      const getDetailUrl = await axios.delete(`/url/${hash}`, {
        headers: {
          Authorization: `Bearer ${user.user.access_token}`,
        },
      });
      if (getDetailUrl) {
        present({
          buttons: [{ text: "Kembali Ke Main", handler: () => dismiss() }],
          message: "Berhasil Hapus Link",
          onDidDismiss: () => history.goBack(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const addToFavourite = async () => {
    try {
      const getDetailUrl = await axios.put(
        `/favourite/${hash}`,
        {
          is_favourite: detail.is_favourite ? 0 : 1,
        },
        {
          headers: {
            Authorization: `Bearer ${user.user.access_token}`,
          },
        }
      );
      if (getDetailUrl) {
        present({
          duration: 1500,
          buttons: [{ text: "Hide", handler: () => dismiss() }],
          message: "Berhasil mengganti favorit",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openEditDialog = () => {
    if (openEdit) {
      setOpenEdit(false);
    } else {
      setOpenEdit(true);
    }
  };

  const openQrCode = () => {
    if (qrCodeStatus) {
      setQrCodeStatus(false);
    } else {
      setQrCodeStatus(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://pendek-in-dua.herokuapp.com/${detail.hash}`
    );
    present({
      duration: 1500,
      buttons: [{ text: "Hide", handler: () => dismiss() }],
      message: "Link berhasil dicopy",
    });
  };

  useEffect(() => {
    insertIntoDatabase();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle className="ion-text-center">Detail</IonTitle>
          <IonButtons slot="primary">
            <IonButton color="secondary" onClick={() => openEditDialog()}>
              <IonIcon
                slot="icon-only"
                size="large"
                color="light"
                icon={createOutline}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light">
        <IonList>
          <IonItem lines="full">
            <IonLabel>
              {isDataExists && (
                <>
                  <h2>{moment(detail.created_at).format("MMM Do ")}</h2>
                  <span className="text-xl font-semibold">
                    {detail.title.length > 55
                      ? detail.title.substr(0, 55) + "...."
                      : detail.title}
                  </span>
                  <br />
                  <a target="_blank" href={detail.original_link}>
                    {detail.original_link}
                  </a>
                  <h2>https://pendek-in-dua.herokuapp.com/{detail.hash}</h2>
                </>
              )}
              <IonButton
                size="default"
                onClick={() =>
                  present_alert({
                    cssClass: "my-css",
                    header: "Hapus Link",
                    message:
                      "Hapus Link? link tidak akan bisa dikembalikan lagi.",
                    buttons: [
                      "Cancel",
                      { text: "Ok", handler: (d) => DeleteLinkFromDatabase() },
                    ],
                  })
                }
              >
                Hapus Link
              </IonButton>{" "}
              <br />
              <IonButton onClick={() => copyToClipboard()} size="default">
                Copy ke Clipboard
              </IonButton>
              <br />
              {detail.is_favourite === false && (
                <>
                  <IonButton onClick={() => addToFavourite()} size="default">
                    Add to Favourite
                  </IonButton>
                </>
              )}
              {detail.is_favourite === true && (
                <>
                  <IonButton onClick={() => addToFavourite()} size="default">
                    Unfavourite
                  </IonButton>
                </>
              )}
            </IonLabel>
            <IonLabel slot="end" className="text-center">
              <span className="text-2xl font-semibold">
                {detail.total_clicked}
              </span>
              <h1>Click</h1>
              <IonButton
                className="mt-4"
                size="default"
                onClick={() => openQrCode()}
              >
                Generate QR
              </IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
        {openEdit && (
          <>
            <h1 className="text-center text-xl font-semibold mt-12">
              Edit link
            </h1>
            <form className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Pendek.in/ </IonLabel>
                <IonInput
                  placeholder={detail.title}
                  onIonChange={(e) => {
                    const title = e.detail.value ? e.detail.value : "";
                    setEditData({ ...editData, ...{ title } });
                  }}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Pendek.in/ </IonLabel>
                <IonInput
                  placeholder={detail.hash}
                  onIonChange={(e) => {
                    const hash = e.detail.value ? e.detail.value : "";
                    setEditData({ ...editData, ...{ hash } });
                  }}
                />
              </IonItem>
              <IonButton
                onClick={() => editHashLinkToDatabase()}
                size="large"
                className="ion-margin-top"
                expand="block"
              >
                Edit Link
              </IonButton>
            </form>
          </>
        )}
        {qrCodeStatus && (
          <>
            <h1 className="text-center text-xl font-semibold mt-8">QR Code</h1>
            <QRCode
              size={348}
              className="mx-auto mt-12"
              value={`https://pendek-in-dua.herokuapp.com/${detail.hash}`}
            ></QRCode>
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

export default connect(mapStateToProps)(DetailUrl);
