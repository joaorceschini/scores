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

export default function ScoresChart({ scores }: { scores: any }) {
  if (!scores) {
    return <h1>this category does not exists</h1>;
  }

  function getScoresAverage(array: any) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += Number(array[i].score);
    }
    return Math.round(sum / array.length);
  }

  const highscore = Math.max(...scores.map((s: any) => Number(s.score)));

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: `highscore: ${highscore} / average: ${getScoresAverage(scores)} / total scores: ${scores.length}`,
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
    labels: scores?.map((score: any) =>
      formatDateToLocal(score.date.setHours(score.date.getHours() + 3)),
    ),
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
