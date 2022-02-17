import css from "./styles/adminDashboard.module.scss";

export default function AdminDashboard() {
  return (
    <div className={css.dashboard}>
      <div className={css["dashboard-content"]}>
        <h1>Admin-Panel</h1>
        <p>
          Wenn du hier bist, bist du entweder wichtig, oder unser Code ist
          kaputt.
        </p>
      </div>
    </div>
  );
}
