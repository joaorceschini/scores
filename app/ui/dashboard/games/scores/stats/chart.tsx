"use client";

import { formatDateToLocal } from "../../../../../lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function ScoresChart({
  scores,
  highscore,
}: {
  scores: any;
  highscore: number;
}) {
  if (!scores) {
    return <h1>this category does not exists</h1>;
  }

  console.log("stats/chart: ", scores[0].date);
  console.log(
    "stats/chart formatDateToLocal: ",
    formatDateToLocal(scores[0].date),
  );

  const isEmpty = (str: any) => !str || 0 === str.length;
  const convertSqlDateTimeUtc = (serverDate: any) =>
    isEmpty(serverDate) ? serverDate : new Date(serverDate).toLocaleString();

  console.log("convertsqldatetimeutc: ", convertSqlDateTimeUtc(scores[0].date));

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: `highscore: ${highscore} / total scores: ${scores.length}`,
        align: "end" as const,
      },
    },
    stacked: false,
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.08)",
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.08)",
        },
      },
    },
  };

  const data = {
    labels: scores?.map((score: any) => formatDateToLocal(score.date)),
    datasets: [
      {
        label: "scores",
        data: scores?.map((score: any) => score.score),
        borderColor: "white",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 1,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
