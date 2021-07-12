import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  useIonViewWillEnter,
} from "@ionic/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";

const Favourite: React.FC = (props: any) => {
  const { user } = props;
  const [isDataExists, setIsDataExists] = useState(false);
  const [favourite, setFavourite] = useState<any>({});
  const getFavouriteDetailFromDatabase = async () => {
    const getDetail = await axios.get("/favourite", {
      headers: {
        Authorization: `Bearer ${user.user.access_token}`,
      },
    });
    const res = getDetail.data;
    setFavourite(res);
    setIsDataExists(true);
  };

  useIonViewWillEnter(() => {
    getFavouriteDetailFromDatabase();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle className="ion-text-center">Favourite</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isDataExists && (
          <>
            {favourite.length > 0 && (
              <>
                {favourite.map((data: any) => (
                  <IonList key={data.hash}>
                    <Link to={`/detail/${data.hash}`}>
                      <IonItem>
                        <IonLabel>
                          <h2>{moment(data.created_at).format("MMM Do")}</h2>
                          <h1 className="pt-5">
                            {data.title.length > 30
                              ? data.title.substr(0, 30) + "...."
                              : data.title}
                          </h1>
                          <h2 className="pt-5">pendek.in/{data.hash}</h2>
                        </IonLabel>
                      </IonItem>
                    </Link>
                  </IonList>
                ))}
              </>
            )}
            {favourite.length === 0 && (
              <>
                <h1 className="text-3xl font-semibold text-center mt-96">
                  Data Kosong . . . .
                </h1>
              </>
            )}
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
export default connect(mapStateToProps)(Favourite);
