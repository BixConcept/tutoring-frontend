import css from "../styles/page.module.scss";

function Page(props: { children: any; title: string; center?: boolean }) {
   document.title = props.title;
  return (
    <main className={`${css.page} ${props.center ? "center" : "nocenter"}`}>
      <div id={css.title}>
        <h1>{props.title}</h1>
      </div>
      <div
        id={css.content}
        className={props.center ? css["center"] : css["nocenter"]}
      >
        {props.children}
      </div>
    </main>
  );
}

export default Page;
