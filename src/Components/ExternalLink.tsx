import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const ExternalLink = (): JSX.Element => {
  return (
    <FontAwesomeIcon
      icon={faExternalLinkAlt}
      size={"sm"}
      style={{ verticalAlign: "middle" }}
    />
  );
};

export default ExternalLink;
