import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

interface AccuracyChartProps {
  success: number;
  failed: number;
}

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const chartData = {
  labels: ["Correct", "Incorrect"],
  datasets: [
    {
      label: "Accuracy",
      data: [0, 0],
      backgroundColor: ["rgba(181, 250, 181, 1)", "rgba(255, 141, 141, 1)"],
      borderColor: ["#94cf82ff", "#cf8282ff"],
      hoverOffset: 0,
    },
  ],
};

const chartOptions = {
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxWidth: 30,
        padding: 15,
      },
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      font: {
        size: 30,
        weight: 500,
      },
      formatter: (value: number) => {
        return value == 0 ? "" : value + "%";
      },
    },
  },
};

ChartJS.defaults.color = "rgb(0,0,0)";
ChartJS.defaults.font = {
  family: "Source Sans Pro",
  weight: 400,
  size: 20,
};

function AccuracyChart({ success, failed }: AccuracyChartProps) {
  let newChartData = structuredClone(chartData);

  newChartData.labels[0] = "Correct: " + success;
  newChartData.labels[1] = "Incorrect: " + failed;
  newChartData.datasets[0].data = [
    Math.floor((success / (success + failed)) * 100) || 0,
    Math.floor((failed / (success + failed)) * 100) || 0,
  ];

  return (
    <div className="accuracyHolder row justify-content-center align-items-center p-0 m-0">
      {success == 0 && failed == 0 ? (
        <span className="fs-5">
          i am quincy, son of quincy.
          <br />
          are you kidding me? <b>nothing</b> gets past my bow.
          <br />
          <span className="fs-6">(data unavaliable)</span>
        </span>
      ) : (
        <Doughnut
          options={chartOptions}
          className="m-2 mb-4"
          data={newChartData}
          redraw={true}
        />
      )}
    </div>
  );
}

export default AccuracyChart;
