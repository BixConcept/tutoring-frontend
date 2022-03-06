import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_HOST } from "..";
import LoadingScreen from "../Components/LoadingScreen";
import { Rank } from "../Components/Rank";
import { RequestState, User } from "../Models";
import css from "../styles/userPage.module.scss";
import FourOFourPage from "./404";

export const UserPage = () => {
  const userId = useParams()["id"];
  const [requestState, setRequestState] = useState(RequestState.Loading);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${API_HOST}/user/${userId}`)
      .then((res) => res.json())
      .then((body) => {
        setUser(body.content);
        setRequestState(RequestState.Success);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //

  return requestState !== RequestState.Loading ? (
    user ? (
      <div className={css["container"]}>
        <div className={css["content"]}>
          <h2>
            {user.name}
            <span>#{user.id}</span> <Rank authLevel={user.authLevel} />
          </h2>
          <h3>Klasse/Stufe {user.grade}</h3>
          <h3>E-Mail: {user.email}</h3>
          <div id={css.offers}>
            {user.offers.map((offer) => (
              <div key={offer.id} className={css.offer}>
                <h1>
                  {offer.subjectName} bis Stufe {offer.maxGrade}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <FourOFourPage />
    )
  ) : (
    <LoadingScreen loaded={false} />
  );
};
