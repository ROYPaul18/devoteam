import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const AttrGenderGraph = () => {
  const chartRef = useRef(null);

  function interpolateColor(color1, color2, value) {
    const [r1, g1, b1] = color1.match(/\d+/g).map(Number);
    const [r2, g2, b2] = color2.match(/\d+/g).map(Number);

    const r = Math.round(r1 + (r2 - r1) * value);
    const g = Math.round(g1 + (g2 - g1) * value);
    const b = Math.round(b1 + (b2 - b1) * value);

    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  function generateColors(data, color1, color2) {
    return data.map((value) => interpolateColor(color1, color2, value));
  }

  const color1 = "rgb(255, 204, 214)";
  const color2 = "rgb(174, 50, 75)";

  const data = [0.2, 0.4, 0.7, 0.3, 0.5, 0.7, 0.1, 0.4, 0.7, 1, 0.3, 0.7];
  const backgroundColors = generateColors(data, color1, color2);

  const dataGenderChart = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "bar",
      data: dataGenderChart,
      options: {
        indexAxis: "x",
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            grid: {
              drawOnChartArea: false,
            },
            min: 0,
            max: 1,
          },
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [dataGenderChart]);

  return (
    <div style={{ width: "30vw", height: "auto"}}>
      <h1 className="mb-4 text-secondary text-xl">
        Histogrammes du nombre d’attrition par semaines, mois, trimestre année{" "}
      </h1>
      <div className="flex justify-between">
        <select
          name=""
          id=""
          className="border-4 border-secondary rounded p-1 text-secondary"
        >
          <option value="Mois">Mois</option>
          <option value="Trimestre">Trimestre</option>
          <option value="Année">Année</option>
        </select>
        <select
          name=""
          id=""
          className="border-4 border-secondary rounded p-1 text-secondary"
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default AttrGenderGraph;
