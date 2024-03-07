import React from "react";
import {
  Typography 
} from "@material-tailwind/react"; 
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {promotionsSliderData, statisticsCardsData,statisticsChartsData } from "@/service/data";
import { ClockIcon } from "@heroicons/react/24/solid";
import { Carousel } from "@material-tailwind/react";
export function Home() {
  return (
    <div className="mt-6">
     <div class="flex gap-6">
      <div class="w-1/2 mb-16">
      <Carousel className="rounded-xl" autoplay={true}>
      {promotionsSliderData.map(({title, img}) => (
        <img
        src={img}
        alt={title}
        className="h-full w-full"
        /> 
      ))} 
    </Carousel>
      </div> 

      <div class="w-1/2"> 
      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-stretch">
        {statisticsCardsData.map(({ title, value, percentageDays, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            value={value}
            percentageDays={percentageDays}
          />
        ))}
      </div>
      </div>
      </div> 
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> 
    </div>
  );
}

export default Home;
