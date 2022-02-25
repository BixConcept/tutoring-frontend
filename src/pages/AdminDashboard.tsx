import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_HOST } from "..";
import Alert from "../Components/Alert";
import LoadingScreen from "../Components/LoadingScreen";
import { Rank } from "../Components/Rank";
import {
  ApiRequest,
  AuthLevel,
  RequestState,
  TutoringOffer,
  User,
} from "../Models";
import { OurContext } from "../OurContext";
import css from "../styles/adminDashboard.module.scss";

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
  }, [requests]);
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
      {props.requestState === RequestState.Loading ? (
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
      {props.requestState === RequestState.Success ? (
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
        <LoadingScreen loaded={props.requestState !== RequestState.Loading} />
      )}
    </div>
  );
}

function IPAddressLeaderboard(props: {
  apiRequests: ApiRequest[];
  requestState: RequestState;
}): JSX.Element {
  const [ips, setIPs] = useState<any[]>([]);
  const [sortColumn, setSortColumn] = useState<string>("numRequests");
  const [sortDirection, setSortDirection] = useState<string>("down");
  const [maxItems, setMaxItems] = useState<number>(10);
  useEffect(() => {
    const listOfIPs: string[] = props.apiRequests.reduce(
      (last: string[], r: ApiRequest) => {
        if (last.indexOf(r.ip) === -1) {
          return [...last, r.ip];
        } else {
          return last;
        }
      },
      []
    );
    const numberRequestsPerIP: { [key: string]: number } = listOfIPs.reduce(
      (last, ip: string) => ({
        ...last,
        ...{ [ip]: props.apiRequests.filter((r) => r.ip === ip).length },
      }),
      {}
    );
    const lastRequestPerIP: { [key: string]: number } = listOfIPs.reduce(
      (last, ip: string) => ({
        ...last,
        ...{
          [ip]: props.apiRequests
            .filter((r) => r.ip === ip)
            .reduce(
              (lastDate: Date, r: ApiRequest) =>
                new Date(r.time).getTime() >= lastDate.getTime()
                  ? new Date(r.time)
                  : lastDate,
              new Date(0)
            ),
        },
      }),
      {}
    );
    setIPs(
      listOfIPs.map((ip) => ({
        ip,
        numRequests: numberRequestsPerIP[ip],
        lastRequest: lastRequestPerIP[ip],
      }))
    );
  }, [props.apiRequests]);
  return (
    <table id={css.ipTable}>
      <thead>
        <tr>
          <td>Adresse</td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (sortColumn === "numRequests") {
                setSortDirection(sortDirection === "up" ? "down" : "up");
              } else {
                setSortColumn("numRequests");
              }
            }}
          >
            # Requests{" "}
            {sortColumn === "numRequests" ? (
              <FontAwesomeIcon
                icon={sortDirection === "up" ? faSortUp : faSortDown}
              />
            ) : (
              <FontAwesomeIcon icon={faSort} />
            )}
          </td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (sortColumn === "lastRequest") {
                setSortDirection(sortDirection === "up" ? "down" : "up");
              } else {
                setSortColumn("lastRequest");
              }
            }}
          >
            Letzter Request{" "}
            {sortColumn === "lastRequest" ? (
              <FontAwesomeIcon
                icon={sortDirection === "up" ? faSortUp : faSortDown}
              />
            ) : (
              <FontAwesomeIcon icon={faSort} />
            )}
          </td>
        </tr>
      </thead>
      <tbody>
        {ips
          .sort((a, b) =>
            sortDirection === "up"
              ? a[sortColumn] - b[sortColumn]
              : b[sortColumn] - a[sortColumn]
          )
          .slice(0, maxItems)
          .map((ip) => (
            <tr key={ip.ip}>
              <td>{ip.ip}</td>
              <td>{ip.numRequests}</td>
              <td>
                {ip.lastRequest
                  .toISOString()
                  .replace("T", " ")
                  .replace("Z", "")
                  .slice(0, -4)}
              </td>
            </tr>
          ))}
      </tbody>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          setMaxItems(maxItems >= ips.length ? 10 : ips.length);
        }}
      >
        {ips.length - maxItems > 0
          ? `${ips.length - maxItems} weitere`
          : "einklappen"}
      </p>
    </table>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const context = useContext(OurContext);
  const [stats, setStats] = useState<any>({});

  // The point of this is that we can update the state for a single request
  // in a single state variable instead of updating the data and request
  // state seperately. That lead to weird behavior where the data was only set sometimes
  interface RequestWithState<T> {
    state: RequestState;
    data: T;
  }

  const [usersRequest, setUsersRequest] = useState<RequestWithState<User[]>>({
    state: RequestState.Loading,
    data: [],
  });
  const [apiRequestsRequest, setApiRequestsRequest] = useState<
    RequestWithState<ApiRequest[]>
  >({ state: RequestState.Loading, data: [] });
  const [offersRequest, setOffersRequest] = useState<
    RequestWithState<TutoringOffer[]>
  >({ state: RequestState.Loading, data: [] });
  const [requestsRequest, setRequestsRequest] = useState<
    RequestWithState<Request[]>
  >({ state: RequestState.Loading, data: [] });

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
      .catch(() => {
        // go to home page if there is some error with the request
        navigate("/");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${API_HOST}/users`, { credentials: "include" })
      .then((res) => res.json())
      .then((body) => {
        setUsersRequest({ state: RequestState.Success, data: body.content });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${API_HOST}/offers`, { credentials: "include" })
      .then((res) => {
        res.json().then((body) => {
          if (!res.ok) {
            setOffersRequest({ state: RequestState.Failure, data: [] });
            Alert(body.msg, "error", context.theme);
          } else {
            console.log(body.content);
            setOffersRequest({
              state: RequestState.Success,
              data: body.content,
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
            setRequestsRequest({ state: RequestState.Failure, data: [] });
            Alert(body.msg, "error", context.theme);
          } else {
            setRequestsRequest({
              state: RequestState.Success,
              data: body.content,
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
    fetch(`${API_HOST}/apiRequests`, { credentials: "include" }).then((res) => {
      res.json().then((body) => {
        setApiRequestsRequest({
          state: RequestState.Success,
          data: body.content,
        });
      });
    });
  }, []);

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
            <SubjectPie
              subjects={offersRequest.data}
              requestState={offersRequest.state}
            />
          </div>
          <div>
            <h2>Anfragen nach Fach</h2>
            <SubjectPie
              subjects={requestsRequest.data}
              requestState={requestsRequest.state}
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
            requests={apiRequestsRequest.data}
            requestState={apiRequestsRequest.state}
          />
        </div>
        <div id={css.growthChartContainer}>
          <h2>User-Wachstum</h2>
          <UserGrowthChart
            users={usersRequest.data}
            requestState={usersRequest.state}
          />
        </div>
        <div id={css.userListContainer}>
          <h2>User</h2>
          <div id={css.userList}>
            {usersRequest.data.map((user) => (
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
                  onClick={() => {
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

                        setUsersRequest({
                          ...usersRequest,
                          ...{
                            data: usersRequest.data.filter(
                              (x) => x.id !== user.id
                            ),
                          },
                        });
                      })
                      .catch(() => {
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
        <div>
          <h2>IP-Adressen</h2>
          <IPAddressLeaderboard
            apiRequests={apiRequestsRequest.data}
            requestState={apiRequestsRequest.state}
          />
        </div>
      </div>
    </div>
  );
}
