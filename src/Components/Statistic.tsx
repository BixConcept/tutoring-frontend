import css from "../styles/statistic.module.scss";

export function Statistic(props: { text: string; value: any }) {
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
