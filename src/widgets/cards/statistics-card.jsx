import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import LineImg from '../../../public/img/line.png';

export function StatisticsCard({ title, value, percentageDays,bgColor }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm" style={{ backgroundColor: bgColor }}> 
      <CardBody className="p-4 text-left">
        <Typography variant="small" className="font-medium text-white ">
          {title}
        </Typography>
        <Typography variant="h2" color="white">
          {value}
        </Typography>
        <Typography variant="small" color="white">
          {percentageDays}
        </Typography>
          <img src={LineImg}/>
      </CardBody> 
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
