"use client";
import { formatDateToLocal } from "../../../../../lib/utils";
import { fetchScoresByGameId } from "@/app/lib/data";
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
import { useEffect, useState } from "react";
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

interface LineProps {
  id: string;
}

export default async function ScoresChart({ scores }: { scores: any }) {
  console.log(scores);

  if (!scores) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
      </div>
    );
  }

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
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
