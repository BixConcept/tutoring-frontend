import css from "../styles/registerPage.module.scss";

function RegisterPage() {
  const grades = ["5", "6", "7", "8", "9", "EF", "Q1", "Q2"];

  const subjects = [
    "Deutsch",
    "Englisch",
    "katholische Religion",
    "evangelische Religion",
    "Mathematik",
    "Philosophie",
    "Latein",
    "Altgriechisch",
    "Physik",
    "Biologie",
    "Chemie",
    "Spanisch",
    "Französisch",
    "Spanisch",
    "Pädagogik",
    "Sozialwissenschaften",
    "Politik/Wirtschaft",
    "Informatik",
  ];

  return (
    <div id={css.wrapper}>
      <div id={css.formContainer}>
        <h1>Regristrieren als Nachhilfelehrer:in</h1>
        <form>
          <div className={css.row}>
          <input
            type="text"
            name="firstName"
            id={css.firstName}
            placeholder="Vorname"
          />
          <input
            type="text"
            name="lastName"
            id={css.lastName}
            placeholder="Nachname"
          />
          </div>
          <select name="grade" id="grade">
            <option value="">--- Bitte auswählen ---</option>
            {grades.map((grade) => {
              return <option value={grade}>{grade}</option>;
            })}
          </select>
          <div className={css.subjectOptions}>
            {subjects.map((subject) => {
              return (
                <div>
                  <input type="checkbox" name="" id="" />
                  <p>{subject}</p>
                  <select name="" id="">
                    <option value="">--- Bitte auswählen ---</option>
                    {grades.map((grade) => {
                      return <option value={grade}>{grade}</option>;
                    })}
                  </select>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
