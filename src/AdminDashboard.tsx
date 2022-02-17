import css from "./styles/adminDashboard.module.scss";
import { ResponsivePie } from "@nivo/pie";
import { RequestState, TutoringOffer } from "./Models";
import { useContext, useEffect, useState } from "react";
import Alert from "./Components/Alert";
import { OurContext } from "./OurContext";
import { API_HOST } from ".";
import LoadingScreen from "./Components/LoadingScreen";

const SubjectPie = () => {
  const context = useContext(OurContext);
  const [offers, setOffers] = useState<TutoringOffer[]>([]);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.Loading
  );
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_HOST}/offers`, { credentials: "include" })
      .then((res) => {
        res.json().then((body) => {
          if (!res.ok) {
            setRequestState(RequestState.Failure);
            Alert(body.msg, "error", context.theme);
          } else {
            setRequestState(RequestState.Success);
            let dataObject = body.content.reduce(
              (last: any, x: TutoringOffer) => ({
                ...last,
                ...{
                  [x.subjectName]:
                    last[x.subjectName] === undefined
                      ? 1
                      : last[x.subjectName] + 1,
                },
              }),
              {}
            );
            setData(
              Object.keys(dataObject).map((x, index) => {
                return { id: x, label: "ASDF", value: dataObject[x] };
              })
            );
          }
        });
      })
      .catch((e) => {
        console.error(e);
        Alert("Irgendwas ist schiefgegangen", "error", context.theme);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id={css.offerChart}>
      <ResponsivePie
        data={data}
        colors={{ scheme: "set1" }}
        arcLabel="value"
        arcLinkLabelsTextColor="var(--text_color)"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={8}
      />
      {requestState === RequestState.Loading ? (
        <LoadingScreen loaded={false} />
      ) : null}
    </div>
  );
};
export default function AdminDashboard() {
  return (
    <div className={css.dashboard}>
      <div className={css["dashboard-content"]}>
        <h1>Admin-Panel</h1>
        <p>
          Wenn du hier bist, bist du entweder wichtig, oder unser Code ist
          kaputt.
        </p>
        <SubjectPie />
      </div>
    </div>
  );
}
