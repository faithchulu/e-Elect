import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = () => {

const genderData = {
              labels: ["New", "In Progess", "Archieved", "Closed"],
              datasets: [
                {
                  data:[4,6,3,2],
                  backgroundColor: [
                    "#0bda51",
                    "indigo",
                    "orange",
                    "red",
                  ],
                },
              ],
            };

  return (
    <Pie
      data={genderData}
      width={300}
      height={300}
      options={{ maintainAspectRatio: true }}
    />
  );
};

export default Piechart;