import BauarbeiterGIF from "../assets/images/bauarbeiter.gif";

const Bauarbeiter = () => {
  return (
    <div
      style={{
        display: "block",
        marginLeft: "auto",
        width: "50%",
        marginRight: "7%",
      }}
    >
      <img src={BauarbeiterGIF} alt="Bauarbeiter" />
    </div>
  );
};

export default Bauarbeiter;
