import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonItem,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonIcon,
} from "@ionic/react";
import "./Tab1.css";
import { Link, useHistory } from "react-router-dom";
import { addOutline } from "ionicons/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

const Main: React.FC = (props: any) => {
  const { user } = props;
  const [linkData, setLinkData] = useState<any>({});
  const [linkTab, setLinkTab] = useState("");
  const history = useHistory();

  const redirectToAddPage = () => {
    history.push("/addlink");
  };

  const getData = async () => {
    try {
      const dataUrl = await axios.get("/url", {
        headers: {
          Authorization: `Bearer ${user.user.access_token}`,
        },
      });
      const dataResponse = dataUrl.data;
      setLinkData(dataResponse);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);
  }, [linkData]);

  useEffect(() => {
    setLinkTab("All");
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <div className="bg-purple-600 h-20">
          <IonTitle className="ion-text-center py-5">
            <span className="text-3xl text-white font-extrabold">Links</span>
          </IonTitle>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        <IonSegment onIonChange={(e) => setLinkTab(e.detail.value!)}>
          <IonSegmentButton value="All">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Top 10">
            <IonLabel>Top 10</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {linkData.length > 0 && linkTab === "All" && (
          <>
            <h1 className="text-xl p-6">Total ada {linkData.length} Link</h1>
            {[...linkData].reverse().map((data: any) => (
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

        {linkData.length > 0 && linkTab === "Top 10" && (
          <>
            <h1 className="text-center text-2xl font-semibold mt-8">
              Your Top 10 Favourite
            </h1>
            {[...linkData]
              .sort((a: any, b: any) =>
                b.total_clicked > a.total_clicked
                  ? 1
                  : a.total_clicked > b.total_clicked
                  ? -1
                  : 0
              )
              .slice(0, 10)
              .map((data: any) => (
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

        {linkData.length === 0 && (
          <>
            <h1 className="text-2xl font-medium mt-96 text-center">
              Link Masih Kosong..
            </h1>
          </>
        )}
        <IonButton
          shape="round"
          size="large"
          className="fixed bottom-24 right-24"
          onClick={() => redirectToAddPage()}
        >
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(Main);
