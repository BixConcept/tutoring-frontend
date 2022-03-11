import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { API_HOST, checkEmail } from "..";
import Alert from "../Components/Alert";
import LoadingScreen from "../Components/LoadingScreen";
import { OurContext } from "../OurContext";
import general from "../styles/general.module.scss";
import css from "../styles/userDashboard.module.scss";
import { Subject, User } from "../Models";
import { Rank } from "../Components/Rank";

const UserDashboard = (): JSX.Element => {
  document.title = "Dashboard";

  const context = useContext(OurContext);
  const navigate = useNavigate();

  const [modUser, setModUser] = useState<User | null>(context.user);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false);
  const [dname, setDname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number>(NaN);
  const [targetGrade, setTargetGrade] = useState<number>(0);

  const emailButtonRef = useRef<HTMLDivElement>(null);

  const fetchUser = () => {
    fetch(`${API_HOST}/user`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((body) => {
        setModUser(body.content);
        context.setUser(body.content);
      })
      .catch((e) => {
        console.log(e);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${API_HOST}/subjects`)
      .then((res) => res.json())
      .then((body) => setSubjects(body.content));
  }, []);

  function updateProfile() {
    fetch(`${API_HOST}/user`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(modUser),
      headers: { "content-type": "application/json" },
    }).then(async (res) => {
      const body = await res.json();
      if (!res.ok) {
        Alert(
          `Irgendetwas ist schief gegangen: ${body.msg}`,
          "error",
          context.theme
        );
      } else {
        Alert(
          "Dein Profil wurde erfolgreich geupdatet!",
          "success",
          context.theme
        );
      }
      fetchUser();
    });
  }

  if (modUser && modUser.offers) {
    return (
      <div className={css.dashboard}>
        <div className={css["dashboard-content"]}>
          <h1>
            Hey 👋, {context.user?.name.split(" ")[0]}{" "}
            <Rank authLevel={context.user?.authLevel} />
          </h1>
          <h4>Meine Fächer</h4>
          <div id={css.offers}>
            {modUser.offers.map((offer) => (
              <div key={offer.id} className={css.offer}>
                <h1>
                  {offer.subjectName} bis Stufe {offer.maxGrade}
                </h1>
                <button
                  className={css["remove-button"]}
                  onClick={() => {
                    fetch(`${API_HOST}/offer/${offer.id}`, {
                      method: "DELETE",
                      credentials: "include",
                    })
                      .then((res) => {
                        if (!res.ok) {
                          if (
                            res.headers.get("content-type") !==
                            "application/json"
                          ) {
                            Alert(
                              "Irgendetwas ist schiefgegangen 😠",
                              "error",
                              context.theme
                            );
                          } else {
                            res.json().then((body) => {
                              Alert(
                                "Irgendetwas ist schiefgegangen 😠 " + body.msg,
                                "error",
                                context.theme
                              );
                            });
                          }
                        } else {
                          Alert(
                            "Erfolgreich gelöscht!",
                            "success",
                            context.theme
                          );
                          setModUser({
                            ...modUser,
                            ...{
                              offers: modUser.offers.filter(
                                (x) => x.id !== offer.id
                              ),
                            },
                          });
                        }
                      })
                      .catch((e) => {
                        console.log(e.stack);
                      });
                  }}
                >
                  Löschen
                </button>
              </div>
            ))}
            <div className={css.offer} id={css.addSubjectThingy}>
              <div id={css.inputElements}>
                <div className={css.select_wrapper}>
                  <div className={general.select_input_field}>
                    <select
                      name=""
                      className={general.select}
                      onChange={(e) =>
                        setSelectedSubject(parseInt(e.target.value))
                      }
                      value={selectedSubject}
                    >
                      <option value="" className={css.na_option}>
                        ---
                      </option>
                      {subjects.map((subject, index) => {
                        return (
                          <option value={subject.id} key={subject.id}>
                            {subject.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                bis Stufe{" "}
                <div className={css.select_wrapper}>
                  <div className={general.select_input_field}>
                    <select
                      name=""
                      id=""
                      className={general.select}
                      onChange={(e) => setTargetGrade(parseInt(e.target.value))}
                      value={targetGrade}
                    >
                      <option value="" className={css.na_option}>
                        ---
                      </option>
                      {[...Array(13 - 4).keys()].map((grade, index) => {
                        return (
                          <option value={index + 5} key={index + 5}>
                            {grade + 5}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <button
                className={css["add-button"]}
                disabled={
                  isNaN(targetGrade) ||
                  targetGrade === 0 ||
                  isNaN(selectedSubject) ||
                  selectedSubject === 0
                }
                onClick={(e) => {
                  fetch(`${API_HOST}/offer`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                      subjectId: selectedSubject,
                      maxGrade: targetGrade,
                    }),
                  })
                    .then((res) => {
                      if (!res.ok) {
                        if (
                          res.headers.get("content-type") !== "application/json"
                        ) {
                          Alert(
                            "Irgendwas ist schiefgegangen 😠",
                            "error",
                            context.theme
                          );
                        } else {
                          res.json().then((body) => {
                            Alert(
                              "Irgendwas ist schiefgegangen 😠 " + body.msg,
                              "error",
                              context.theme
                            );
                          });
                        }
                      } else {
                        res.json().then((body) => {
                          setModUser({
                            ...modUser,
                            ...{ offers: [...modUser.offers, body.content] },
                          });
                        });
                      }
                    })
                    .catch((e) => {
                      console.log(e.stack);
                    });
                }}
              >
                Hinzufügen
              </button>
            </div>
          </div>
          <h4>Dein Profil</h4>
          <form
            id={css.profileForm}
            onKeyDown={(e) => {
              // submit by pressing ctrl+enter
              if (e.ctrlKey && e.key === "Enter") {
                updateProfile();
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile();
            }}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="text"
              value={modUser?.email}
              className={general["input-field"]}
              readOnly={true}
              name="email"
              onClick={() => {
                if (emailButtonRef.current) {
                  emailButtonRef.current.scrollIntoView();
                }
              }}
            />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={modUser?.name}
              className={general["input-field"]}
              onChange={(e) =>
                setModUser({ ...modUser, ...{ name: e.target.value } })
              }
              name="name"
            />
            <label htmlFor="grade">Stufe</label>
            <div className={general.select_input_field} id={css.chooseGrade}>
              <select
                name=""
                className={general.select}
                value={modUser.grade}
                onChange={(e) => {
                  setModUser({
                    ...modUser,
                    ...{ grade: parseInt(e.target.value) },
                  });
                }}
              >
                <option value="">--- Stufe wählen ---</option>
                {[...Array(13 - 4).keys()].map((grade, index) => {
                  return <option key={index}>{grade + 5}</option>;
                })}
              </select>
            </div>
            <label htmlFor="misc">Sonstiges</label>
            <textarea
              className={general["select_input_field"]}
              defaultValue={modUser?.misc}
              name="misc"
              onChange={(e) => {
                setModUser({ ...modUser, ...{ misc: e.target.value } });
              }}
            />
            <input
              type="submit"
              className={general.text_button}
              value="Updaten"
            />
          </form>

          <h4>Danger Zone</h4>
          <div className={css["danger-zone"]}>
            <div className={css["danger-item"]}>
              <div>
                <p className={css["danger-action"]}>Account löschen</p>
                <p className={css["danger-description"]}>
                  Sobald du deinen Account gelöscht hast, wirst du nicht mehr in
                  der Suche angezeigt und kannst nicht mehr darauf zugreifen.
                </p>
              </div>
              <button
                onClick={() => setModalVisible(!modalVisible)}
                className={general["text-button"]}
              >
                Account löschen
              </button>
            </div>
            <div
              className={css["modal-background"]}
              style={{ display: modalVisible ? "flex" : "none" }}
            >
              <div className={css["modal-content"]} onClick={() => {}}>
                <div className={css["modal-heading-row"]}>
                  <h1>Account löschen</h1>
                  <button
                    onClick={() => setModalVisible(false)}
                    className={css["close-button"]}
                  >
                    &times;
                  </button>
                </div>
                <hr />
                <p>Diese Aktion ist ir­re­ver­si­bel!</p>
                <p>
                  Bitte gib zum Bestätigen{" "}
                  <span className={css.name}>{context.user?.name}</span>ein.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetch(`${API_HOST}/user`, {
                      method: "DELETE",
                      credentials: "include",
                    }).then((res) => {
                      if (!res.ok) {
                        Alert(
                          "Irgendwas ist schiefgegangen.",
                          "error",
                          context.theme
                        );
                      } else {
                        Alert("Account gelöscht.", "info", context.theme);
                        setModalVisible(false);
                      }
                    });
                  }}
                >
                  <input
                    type="text"
                    placeholder=""
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <input
                    type="submit"
                    value="Löschen"
                    disabled={name !== context.user?.name}
                    onSubmit={() => setName("")}
                  />
                </form>
              </div>
            </div>
            <hr />
            <div
              className={css["danger-item"]}
              id="change-email-button"
              ref={emailButtonRef}
            >
              <div>
                <p className={css["danger-action"]}>E-Mail ändern</p>
                <p className={css["danger-description"]}>
                  Ändere deine E-Mail, wenn du eine eigene benutzen willst.
                </p>
              </div>
              <button
                onClick={(e) => {
                  setEmailModalVisible(!emailModalVisible);
                }}
                className={general["text-button"]}
              >
                E-Mail ändern
              </button>
            </div>
            <div
              className={css["modal-background"]}
              style={{ display: emailModalVisible ? "flex" : "none" }}
            >
              <div className={css["modal-content"]} onClick={() => {}}>
                <div className={css["modal-heading-row"]}>
                  <h1>E-Mail ändern</h1>
                  <button
                    onClick={() => setEmailModalVisible(false)}
                    className={css["close-button"]}
                  >
                    &times;
                  </button>
                </div>
                <hr />
                <p>
                  Bitte gib zum Bestätigen{" "}
                  <span className={css.name}>{context.user?.name}</span>ein.
                </p>

                {/* this form is there so the user can submit via pressing enter or the key on their mobile keyboard */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO
                    fetch(`${API_HOST}/user`, {
                      method: "PUT",
                      credentials: "include",
                      body: JSON.stringify({ email }),
                      headers: { "content-type": "application/json" },
                    }).then(async (res) => {
                      const body = await res.json();
                      if (!res.ok) {
                        Alert(
                          `Irgendwas ist schief gegangen: ${body.msg}`,
                          "error",
                          context.theme
                        );
                      } else {
                        Alert("E-Mail geändert!", "success", context.theme);
                        setEmailModalVisible(false);
                      }
                    });
                  }}
                >
                  <input
                    type="text"
                    placeholder=""
                    value={dname}
                    onChange={(e) => {
                      setDname(e.target.value);
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder=" Neue E-Mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <input
                    type="submit"
                    value="Ändern"
                    disabled={
                      dname !== context.user?.name || !checkEmail(email)
                    }
                    onSubmit={() => setDname("")}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <LoadingScreen loaded={modUser !== null} />;
};
export default UserDashboard;
