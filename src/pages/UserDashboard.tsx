import css from "../styles/dashboard.module.scss";

function UserDashboard() {
  return (
    <div id={css["dashboard"]}>
      <h1>Einstellungen</h1>
      <h2>Deine Fächer</h2>
    </div>
  );
}

export default UserDashboard;
