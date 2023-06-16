import hook from "../../hooks/hookTimer";

const ItemRepair = ({ item }) => {
  const { model, brand, statusRepair, description, finishDay } = item;
  const arrayTime = finishDay.split("T");
  const normalTime = arrayTime.join(" ");
  const headerString = `${brand.toUpperCase()} ${model}`;
  const [finalTime, setFinalTime] = hook.useFinaltimer(finishDay, "");

  return (
    <div>
      <h3>{headerString}</h3>
      <p>{statusRepair}</p>
      <p>{description}</p>
      <p>{normalTime}</p>
      <p>{finalTime}</p>
    </div>
  );
};

export default ItemRepair;
