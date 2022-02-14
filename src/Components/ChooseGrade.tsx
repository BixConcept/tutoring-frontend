import general from "../styles/general.module.scss";
import { grades } from "../Models";

export default function ChooseGrade(props: {
  subject: string;
  value?: string;
  onChange: any;
  className?: string;
}) {
  return (
    <div className={props.className}>
      <div className={general.select_input_field}>
        <select
          name=""
          id=""
          className={general.select}
          onChange={props.onChange}
          value={props.value}
        >
          <option value="">---</option>
          {grades.map((grade, index) => {
            return (
              <option value={index + 5} key={index + 5}>
                bis Stufe {grade}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
