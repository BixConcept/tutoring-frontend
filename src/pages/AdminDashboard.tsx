import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { API_HOST } from "..";
import Alert from "../Components/Alert";
import LoadingScreen from "../Components/LoadingScreen";
import { MessengerInfo } from "../Components/MessengerInfo";
import { Rank } from "../Components/Rank";
import { Statistic } from "../Components/Statistic";
import {
  ApiRequest,
  AuthLevel,
  NotificationRequest,
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
      Object.keys(dataObject)
        .map((x) => {
          return { id: x, label: "ASDF", value: dataObject[x] };
        })
        .sort((a, b) => b.value - a.value)
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
          cornerRadius={6}
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
  data: ApiRequest[];
  requestState: RequestState;
}): JSX.Element => {
  const { data: requests } = props;
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      {
        id: "request_graph",
        data: props.data.map(
          (value: any) => ({
            x: new Date(value.time).toISOString(),
            y: value.value,
          }),
          []
        ),
      },
    ]);
  }, [requests]); // eslint-disable-line react-hooks/exhaustive-deps
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

function UserGrowthChart(props: { users: User[]; requestState: RequestState }) {
  const [showVerified, setShowVerified] = useState<boolean>(false);
  return (
    <div id={css.growthChart}>
      {props.requestState === RequestState.Success ? (
        <Fragment>
          <form>
            <input
              type="checkbox"
              checked={showVerified}
              onChange={(e) => setShowVerified(e.target.checked)}
              name="asdf"
            />
            <label htmlFor="asdf">Nur verifizierte anzeigen</label>
          </form>
          <ResponsiveLine
            data={[
              {
                id: "growth_graph" + (showVerified ? "_verified" : ""),
                data: [
                  {
                    x:
                      /* get the first user's creation date and subtract one day from it so the graph starts at 0, not at 1

                    bitte lesen sie die packungsbeilage oder fragen sie ihren arzt oder apotheker
                    */
                      props.users.length > 0
                        ? new Date(
                            props.users
                              // generate date objects from date strings
                              .map((x) => ({
                                ...x,
                                ...{ createdAt: new Date(x.createdAt) },
                              }))
                              // sort to get the first one
                              .sort(
                                (a, b) =>
                                  a.createdAt.getTime() - b.createdAt.getTime()
                              )[0]
                              // subtract
                              .createdAt.getTime() -
                              1000 * 60 * 60 * 24
                          )
                        : new Date(),
                    y: 0,
                  },
                  ...props.users
                    .filter(
                      (x) =>
                        x.authLevel >= (showVerified ? AuthLevel.Verified : 0)
                    )
                    .reduce(
                      (previousValue: any[], user: User) => [
                        ...previousValue,
                        {
                          x: user.createdAt,
                          y: previousValue.length + 1,
                        },
                      ],
                      []
                    ),
                  {
                    x: new Date(),
                    y: props.users.filter(
                      (x) =>
                        x.authLevel >= (showVerified ? AuthLevel.Verified : 0)
                    ).length,
                  },
                ],
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
            enableCrosshair={true}
            crosshairType="cross"
            colors={{ scheme: "category10" }}
            theme={{
              textColor: "var(--text_color)",
              fontSize: 14,
              crosshair: { line: { stroke: "var(--text_color)" } },
            }}
            curve="catmullRom"
            useMesh={true}
            tooltip={({ point }) => {
              let users = props.users.filter(
                (x) =>
                  new Date(x.createdAt).getTime() === point.data.x.valueOf()
              );

              if (users.length > 0) {
                return (
                  <div id={css.tooltip}>
                    <p>
                      {point.data.x.toLocaleString()}:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {point.data.y}{" "}
                        {users.length > 0
                          ? `(${users[0].name}#${users[0].id})`
                          : ""}
                        <Rank authLevel={users[0].authLevel} />
                      </span>
                    </p>
                  </div>
                );
              } else {
                return <span></span>;
              }
            }}
          />
        </Fragment>
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

function AuthLevelChart(props: { users: User[] | null }) {
  const { users } = props;

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const labels = ["Unverizifiert", "Verifiziert", "Administrator"];

    if (users) {
      setData(
        Object.entries(
          users.reduce(
            (prev: { [key: string]: number }, current) => ({
              ...prev,
              ...{
                [labels[current.authLevel]]:
                  (prev[labels[current.authLevel]] || 0) + 1,
              },
            }),
            {}
          )
        ).map((x) => ({ id: x[0], value: x[1], label: "penis" }))
      );
    }
  }, [users]);

  if (users === null) {
    return <LoadingScreen loaded={false} />;
  } else {
    return (
      <div id={css.authLevelChart}>
        <ResponsivePie
          data={data}
          colors={{ scheme: "set1" }}
          arcLabel="formattedValue"
          arcLinkLabelsTextColor="var(--text_color)"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          innerRadius={0.5}
          padAngle={2}
          cornerRadius={6}
          sortByValue={true}
          theme={{
            fontSize: 14,
            textColor: "white",
          }}
          margin={{ top: 50, right: 50, left: 50, bottom: 50 }}
        />
      </div>
    );
  }
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
    RequestWithState<any[]>
  >({ state: RequestState.Loading, data: [] });
  const [offersRequest, setOffersRequest] = useState<
    RequestWithState<TutoringOffer[]>
  >({ state: RequestState.Loading, data: [] });
  const [requestsRequest, setRequestsRequest] = useState<
    RequestWithState<NotificationRequest[]>
  >({ state: RequestState.Loading, data: [] });

  const [olderThan, setOlderThan] = useState<string>("");

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
            if (body.content.authLevel < AuthLevel.Verified) {
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
    fetch(`${API_HOST}/apiRequests?aggregate=86400`, {
      credentials: "include",
    }).then((res) => {
      res.json().then((body) => {
        setApiRequestsRequest({
          state: RequestState.Success,
          data: body.content,
        });
      });
    });
  }, []);

  function usersOlderThan(): number {
    const minDate = new Date().getTime() - parseInt(olderThan) * 1000;
    console.log(minDate, new Date(minDate));
    return usersRequest.data.filter((x) => {
      console.log(x.createdAt);
      return (
        new Date(x.createdAt).getTime() < minDate &&
        x.authLevel === AuthLevel.Unverified
      );
    }).length;
  }

  return (
    <div className={css.dashboard}>
      <div className={css["dashboard-content"]}>
        <h1>
          {context.user
            ? context.user.authLevel === AuthLevel.Admin
              ? "Admin-Panel"
              : "Statistiken"
            : ""}
        </h1>
        {context.user?.authLevel === AuthLevel.Admin ? (
          <p>
            Wenn du hier bist, bist du entweder wichtig, oder unser Code ist
            kaputt.
          </p>
        ) : null}
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
          <Statistic text="angebote" value={stats.offers} />
          <Statistic text="notification-anfragen" value={stats.requests} />
          <Statistic text="benutzer:innen" value={stats.users} />
        </div>
        <div id={css.requestChartContainer}>
          <h2>API-Aktivität [Requests/Tag]</h2>
          <ActivityGraph
            data={apiRequestsRequest.data}
            requestState={apiRequestsRequest.state}
          />
        </div>
        <div id={css.growthChartContainer}>
          <h2>Benutzer:innen-Wachstum</h2>
          <UserGrowthChart
            users={usersRequest.data}
            requestState={usersRequest.state}
          />
        </div>
        <div id={css.authLevelContainer}>
          <AuthLevelChart users={usersRequest.data} />
        </div>
        <div id={css.userListContainer}>
          <h2>User</h2>
          <div id={css.userInfo}>
            <p>
              {usersRequest.data.length} Benutzer:innen, davon sind{" "}
              {(usersRequest.data.filter(
                (x) => x.authLevel >= AuthLevel.Verified
              ).length /
                usersRequest.data.length) *
                100}
              % (
              {
                usersRequest.data.filter(
                  (x) => x.authLevel >= AuthLevel.Verified
                ).length
              }
              ) verifiziert
            </p>
            <div id={css.deleteUnverifiedContainer}>
              <p>
                Benutzer:innen, die innerhalb einer bestimmten Zeit nicht ihre
                E-Mail-Adresse verifizert haben, können hier gelöscht werden.
              </p>
              <select
                onChange={(e) => {
                  setOlderThan(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="0">Alle</option>
                <option value="86400">Älter als 1 Tag</option>
                <option value="604800">Älter als 7 Tage</option>
                <option value="2592000">Älter als 30 Tage</option>
              </select>
              <button
                className={css.deleteUnverifiedButton}
                disabled={usersOlderThan() === 0}
              >
                {usersOlderThan()} unverifizierte löschen
              </button>
            </div>
          </div>
          <div id={css.userList}>
            {usersRequest.data.map((user) => (
              <div key={user.id} className={css.userListItem}>
                <div>
                  <h1>
                    <Link to={`/user/${user.id}`}>
                      <span className={css.itemId}>#{user.id}:</span>{" "}
                      {user.name} <Rank authLevel={user.authLevel} />
                      <div className={css.messengerIcons}>
                        <MessengerInfo
                          hasDiscord={user.hasDiscord}
                          discordUser={user.discordUser}
                          hasWhatsapp={user.hasWhatsapp}
                          hasSignal={user.hasSignal}
                          phoneNumber={user.phoneNumber || null}
                          iconsOnly={true}
                        />
                      </div>
                    </Link>
                  </h1>
                  <p>{user.email}</p>
                  <p>Stufe {user.grade}</p>
                  {user.phoneNumber ? <p>{user.phoneNumber}</p> : null}
                  {user.misc ? <p>Misc: {user.misc}</p> : null}
                </div>{" "}
                {context.user?.authLevel === AuthLevel.Admin ? (
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
                ) : null}
              </div>
            ))}
          </div>
        </div>
        {/* looks too bad to ship */}
        {/* context.user?.authLevel === AuthLevel.Admin ? (
          <div>
            <h2>IP-Adressen</h2>
            <IPAddressLeaderboard
              apiRequests={apiRequestsRequest.data}
              requestState={apiRequestsRequest.state}
            />
          </div>
        ) : null} */}
      </div>
    </div>
  );
}
