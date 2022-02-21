import { AuthLevel } from "../Models";
import css from "../styles/rank.module.scss";
import Rank1 from "../assets/images/ranks/1.png";
import Rank2 from "../assets/images/ranks/2.png";
import Rank3 from "../assets/images/ranks/3.png";

export function Rank(props: { authLevel?: AuthLevel }) {
  return (
    <img
      id={css.rank}
      src={[Rank1, Rank2, Rank3][props.authLevel || 0]}
      alt={AuthLevel[props.authLevel || 0]}
    />
  );
}
