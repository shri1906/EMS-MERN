import PropTypes from "prop-types";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="rounded flex bg-white">
      <div className={`text-3xl flex justify-center items-center ${color} text-white px-4`}>
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};
// PropTypes validation for children
SummaryCard.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
  number: PropTypes.node.isRequired,
  color: PropTypes.node.isRequired,
};

export default SummaryCard;
