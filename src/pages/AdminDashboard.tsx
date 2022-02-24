import css from "../styles/adminDashboard.module.scss";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import {
  ApiRequest,
  AuthLevel,
  RequestState,
  TutoringOffer,
  User,
} from "../Models";
import { useContext, useEffect, useState } from "react";
import Alert from "../Components/Alert";
import { OurContext } from "../OurContext";
import { API_HOST } from "..";
import LoadingScreen from "../Components/LoadingScreen";
import { useNavigate } from "react-router";
import { Rank } from "../Components/Rank";

const SubjectPie = (props: { subjects: any; requestState: RequestState }) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    let dataObject = props.subjects.reduce(
      (last: any, x: TutoringOffer) => ({
        ...last,
        ...{
          [x.subjectName]:
            last[x.subjectName] === undefined ? 1 : last[x.subjectName] + 1,
        },
      }),
      {}
    );
    setData(
      Object.keys(dataObject).map((x) => {
        return { id: x, label: "ASDF", value: dataObject[x] };
      })
    );
  }, [props.subjects]);
  return (
    <div id={css.offerChart}>
      {props.subjects.length === 0 ? (
        <span style={{ color: "var(--text_color)" }}>Keine Daten verfübar</span>
      ) : null}
      {props.requestState === RequestState.Success &&
      props.subjects.length > 0 ? (
        <ResponsivePie
          data={data}
          colors={{ scheme: "set1" }}
          arcLabel="formattedValue"
          arcLinkLabelsTextColor="var(--text_color)"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          innerRadius={0.5}
          padAngle={2}
          cornerRadius={8}
          theme={{
            fontSize: 14,
            textColor: "white",
          }}
          margin={{ top: 50, right: 50, left: 50, bottom: 50 }}
        />
      ) : null}
      {props.requestState === RequestState.Loading ? (
        <LoadingScreen loaded={false} />
      ) : null}
    </div>
  );
};

const ActivityGraph = (props: {
  requests: ApiRequest[];
  requestState: RequestState;
}): JSX.Element => {
  const { requests } = props;
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // time of the first request
    const min = requests.reduce(
      (previousValue, currentValue) =>
        new Date(currentValue.time) < previousValue
          ? new Date(currentValue.time)
          : previousValue,
      new Date()
    );

    // time of the last request
    const max = requests.reduce(
      (previousValue: Date, currentValue) =>
        new Date(currentValue.time) > previousValue
          ? new Date(currentValue.time)
          : previousValue,
      new Date()
    );

    // number of hours between the first and last request's time
    let hoursCount = Math.abs(max.getTime() - min.getTime()) / (60 * 60 * 1000);

    //array of whole hours as Date
    let hours: Date[] = [];
    for (let i = 0; i < hoursCount; i++) {
      hours.push(new Date(min.getTime() + i * 60 * 60 * 1000));
    }

    setData([
      {
        id: "request_graph",
        data: hours.map(
          (value: Date) => ({
            x: value.toISOString(),
            y: requests.filter((x) => {
              let date = new Date(x.time);
              return (
                date > value &&
                date < new Date(value.getTime() + 1000 * 60 * 60)
              );
            }).length,
          }),
          []
        ),
      },
    ]);
  });
  return (
    <div id={css.requestsChart}>
      {RequestState.Success === props.requestState ? (
        <ResponsiveLine
          data={data}
          enablePointLabel={false}
          margin={{ top: 50, right: 50, left: 50, bottom: 50 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
            precision: "hour",
          }}
          axisLeft={{
            tickValues: 5,
          }}
          gridXValues={10}
          enableGridX={false}
          lineWidth={3}
          enableGridY={false}
          xFormat="time:%Y-%m-%dT%H:%M:%S.%LZ"
          axisBottom={{
            format: "%Y-%m-%d",
            tickSize: 10,
            tickPadding: 0,
            tickRotation: 0,
            legendPosition: "middle",
            tickValues: 10,
          }}
          enableSlices={"x"}
          colors={{ scheme: "category10" }}
          theme={{
            textColor: "var(--text_color)",
            fontSize: 14,
            crosshair: { line: { stroke: "var(--text_color)" } },
          }}
          curve="monotoneX"
          sliceTooltip={({ slice }) => {
            return (
              <div id={css.tooltip}>
                {slice.points[0].data.x.toLocaleString()}:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {slice.points[0].data.y}
                </span>
              </div>
            );
          }}
        />
      ) : null}
      {props.requestState !== RequestState.Loading ? (
        <LoadingScreen loaded={false} />
      ) : null}
    </div>
  );
};

function Statistic(props: { text: string; value: any }) {
  return (
    <div className={css.stat}>
      <div
        className={`${css.statValue} ${
          props.value !== undefined ? "" : css.loading
        }`}
      >
        {props.value}
      </div>
      <div className={css.statText}>{props.text}</div>
    </div>
  );
}

function UserGrowthChart(props: { users: User[]; requestState: RequestState }) {
  return (
    <div id={css.growthChart}>
      {props.users.length > 0 ? (
        <ResponsiveLine
          data={[
            {
              id: "growth_graph",
              data: props.users.reduce(
                (previousValue: any[], user: User) => [
                  ...previousValue,
                  { x: user.createdAt, y: previousValue.length + 1 },
                ],
                []
              ),
            },
          ]}
          enablePointLabel={false}
          margin={{ top: 50, right: 50, left: 50, bottom: 50 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
            precision: "second",
          }}
          axisLeft={{
            tickValues: 5,
          }}
          gridXValues={10}
          enableGridX={false}
          lineWidth={3}
          enableGridY={false}
          xFormat="time:%Y-%m-%dT%H:%M:%S.%LZ"
          axisBottom={{
            format: "%Y-%m-%d %H:00",
            tickSize: 10,
            tickPadding: 0,
            tickRotation: 0,
            legendPosition: "middle",
            tickValues: 8,
          }}
          enableSlices={"x"}
          colors={{ scheme: "category10" }}
          theme={{
            textColor: "var(--text_color)",
            fontSize: 14,
            crosshair: { line: { stroke: "var(--text_color)" } },
          }}
          curve="monotoneX"
          sliceTooltip={({ slice }) => {
            return (
              <div id={css.tooltip}>
                {slice.points[0].data.x.toLocaleString()}:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {slice.points[0].data.y}
                </span>
              </div>
            );
          }}
        />
      ) : (
        <LoadingScreen loaded={props.users.length > 0} />
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const context = useContext(OurContext);
  const [stats, setStats] = useState<any>({});
  const [requestStates, setRequestStates] = useState<{
    [key: string]: RequestState;
  }>({
    offers: RequestState.Loading,
    requests: RequestState.Loading,
    apiRequests: RequestState.Loading,
    userGrowth: RequestState.Loading,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [apiRequests, setApiRequests] = useState<ApiRequest[]>([]);
  const [offers, setOffers] = useState<TutoringOffer[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    // check if the user is authenticated
    fetch(`${API_HOST}/user`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          // go to home page if the user is not authenticated at all
          navigate("/");
        } else {
          res.json().then(async (body) => {
            context.setUser(body.content);
            if (body.content.authLevel !== AuthLevel.Admin) {
              // go to home page if the user is authenticated but not an admin
              navigate("/");
            }

            let res = await fetch(`${API_HOST}/stats`);
            setStats((await res.json()).content);
          });
        }
      })
      .catch((e) => {
        // go to home page if there is some error with the request
        navigate("/");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${API_HOST}/users`, { credentials: "include" })
      .then((res) => res.json())
      .then((body) => {
        setUsers(body.content);
        setRequestStates({
          ...requestStates,
          ...{ users: RequestState.Success },
        });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${API_HOST}/offers`, { credentials: "include" })
      .then((res) => {
        res.json().then((body) => {
          if (!res.ok) {
            setRequestStates({
              ...requestStates,
              ...{ offers: RequestState.Failure },
            });
            Alert(body.msg, "error", context.theme);
          } else {
            setOffers(body.content);
            setRequestStates({
              ...requestStates,
              ...{ users: RequestState.Success },
            });
          }
        });
      })
      .catch((e) => {
        console.error(e);
        Alert("Irgendwas ist schiefgegangen", "error", context.theme);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${API_HOST}/requests`, { credentials: "include" })
      .then((res) => {
        res.json().then((body) => {
          if (!res.ok) {
            setRequestStates({
              ...requestStates,
              ...{ offers: RequestState.Failure },
            });
            Alert(body.msg, "error", context.theme);
          } else {
            setRequests(body.content);
          }
        });
      })
      .catch((e) => {
        console.error(e);
        Alert("Irgendwas ist schiefgegangen", "error", context.theme);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${API_HOST}/apiRequests`, { credentials: "include" }).then((res) => {
      res.json().then((body) => {
        setRequestStates({
          ...requestStates,
          ...{ apiRequests: RequestState.Success },
        });
        setApiRequests(body.content);
      });
    });
  });

  return (
    <div className={css.dashboard}>
      <div className={css["dashboard-content"]}>
        <h1>Admin-Panel</h1>
        <p>
          Wenn du hier bist, bist du entweder wichtig, oder unser Code ist
          kaputt.
        </p>
        <div id={css.firstCharts}>
          <div>
            <h2>Angebote nach Fach</h2>
            <SubjectPie subjects={offers} requestState={requestStates.offers} />
          </div>
          <div>
            <h2>Anfragen nach Fach</h2>
            <SubjectPie
              subjects={requests}
              requestState={requestStates.offers}
            />
          </div>
        </div>
        <div id={css.stats}>
          <Statistic text="api requests" value={stats.apiRequests} />
          <Statistic text="offers" value={stats.offers} />
          <Statistic text="notification requests" value={stats.requests} />
          <Statistic text="user" value={stats.users} />
        </div>
        <div id={css.requestChartContainer}>
          <h2>Requests pro Stunde</h2>
          <ActivityGraph
            requests={apiRequests}
            requestState={requestStates.activity}
          />
        </div>
        <div id={css.growthChartContainer}>
          <h2>User-Wachstum</h2>
          <UserGrowthChart
            users={users}
            requestState={requestStates.userGrowth}
          />
        </div>
        <div id={css.userListContainer}>
          <h2>User</h2>
          <div id={css.userList}>
            {users.map((user) => (
              <div key={user.id} className={css.userListItem}>
                <div>
                  <h1>
                    <span className={css.itemId}>#{user.id}:</span> {user.name}{" "}
                    <Rank authLevel={user.authLevel} />
                  </h1>
                  <p>{user.email}</p>
                  <p>Stufe {user.grade}</p>
                  {user.misc ? <p>Misc: {user.misc}</p> : null}
                </div>
                <button
                  onClick={(e) => {
                    fetch(`${API_HOST}/user/${user.id}`, {
                      method: "DELETE",
                      credentials: "include",
                    })
                      .then((res) => {
                        if (!res.ok) {
                          throw new Error("");
                        }

                        Alert(
                          "Erfolgreich gelöscht!",
                          "success",
                          context.theme
                        );

                        setUsers(users.filter((x) => x.id !== user.id));
                      })
                      .catch((e) => {
                        Alert(
                          "Irgendwas ist schiefgegangen 😟",
                          "error",
                          context.theme
                        );
                      });
                  }}
                  disabled={user.id === context.user?.id}
                >
                  Löschen
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
