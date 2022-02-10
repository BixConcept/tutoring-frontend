import css from "../styles/userDashboard.module.scss";

function UserDashboard(): JSX.Element {
  document.title = "Dashboard";

  return (
    <div id={css.dashboard}>
      <h1>Dashboard</h1>
      <aside>
        <ul>
          <li>Fächer ändern</li>
          <li>Account löschen</li>
          <li></li>
        </ul>
      </aside>
    </div>
  );
}

export default UserDashboard;
