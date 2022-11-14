import css from "../styles/page.module.scss";

const Page = (props: {
  children: any;
  title: string;
  center?: boolean;
  id?: string;
}): JSX.Element => {
  document.title = props.title;
  return (
    <main
      className={`${css.page} ${props.center ? "center" : "nocenter"}`}
      id={props.id}
    >
      <div id={css.title}>
        <h1 style={{ fontSize: "2rem" }}>{props.title}</h1>
      </div>
      <div
        id={css.content}
        className={props.center ? css["center"] : css["nocenter"]}
      >
        {props.children}
      </div>
    </main>
  );
};

export default Page;
