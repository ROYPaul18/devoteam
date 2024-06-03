import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const AttrByWeMoTriYe = () => {
  const chartRef = useRef(null);
  const chartRefModal = useRef(null);

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Mois");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [isYearDisabled, setIsYearDisabled] = useState(false);
  const [isTimePeriodDisabled, setIsTimePeriodDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const generateRandomData = (length) => {
    return Array.from({ length }, () => Math.random() * 0.9 + 0.1);
  };

  const yearsData = {
    2024: generateRandomData(12),
    2023: generateRandomData(12),
    2022: generateRandomData(12),
    2021: generateRandomData(12),
    2020: generateRandomData(12),
    2019: generateRandomData(12),
  };

  const [data, setData] = useState(yearsData[selectedYear]);
  const backgroundColors = generateColors(data, color1, color2);

  const [dataGenderChart, setDataGenderChart] = useState({
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
  });

  useEffect(() => {
    setData(yearsData[selectedYear]);
    setIsYearDisabled(selectedTimePeriod === "Année");
  }, [selectedYear, selectedTimePeriod]);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "bar",
      data: dataGenderChart,
      options: {
        indexAxis: "x",
        responsive: true,
        plugins: {
          legend: {
            display: false,
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

  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value);
    if (event.target.value === "Année") {
      setIsTimePeriodDisabled(true);
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      if (chartRefModal.current && chartRefModal.current.chart) {
        chartRefModal.current.chart.destroy();
      }
      setDataGenderChart({
        labels: ["2024", "2023", "2022", "2021", "2020", "2019"],
        datasets: [
          {
            data: generateRandomData(6),
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
            borderRadius: 10,
          },
        ],
      });
    } else if (event.target.value === "Trimestre") {
      setIsYearDisabled(false);
      setIsTimePeriodDisabled(false);
      setDataGenderChart({
        labels: ["T1", "T2", "T3", "T4"],
        datasets: [
          {
            data: generateRandomData(4),
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
            borderRadius: 10,
          },
        ],
      });
    } else {
      setIsYearDisabled(true);
      setIsTimePeriodDisabled(false);
      setDataGenderChart({
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
      });
    }
    if (showModal) {
      chartRefModal.current.chart.data.labels = dataGenderChart.labels;
      chartRefModal.current.chart.data.datasets[0].data = dataGenderChart.datasets[0].data;
      chartRefModal.current.chart.update();
    }
  };

  const handleYearChange = (event) => {
    const newSelectedYear = event.target.value;
    setSelectedYear(newSelectedYear);
    setData(yearsData[newSelectedYear]);
    setDataGenderChart({
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
          data: yearsData[newSelectedYear],
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
    });
    if (showModal) {
      chartRefModal.current.chart.data.labels = dataGenderChart.labels;
      chartRefModal.current.chart.data.datasets[0].data = dataGenderChart.datasets[0].data;
      chartRefModal.current.chart.update();
    }
  };

  const handleGraphClick = () => {
    setShowModal(true);
    setTimeout(() => {
      if (chartRefModal.current) {
        const chartInstance = new Chart(chartRefModal.current, {
          type: "bar",
          data: dataGenderChart,
          options: {
            indexAxis: "x",
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            borderWidth: 3,
            scales: {
              y: {
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
      }
    }, 0);
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (chartRefModal.current && chartRefModal.current.chart) {
      chartRefModal.current.chart.destroy();
    }
  };

  return (
    <div className="w-11/12 h-3/4">
      <h1 className="mb-4 text-secondary text-lg">  
        Histogrammes du nombre d’attrition par mois, trimestre année
      </h1>
      <div className="w-full h-full">
      <div className="flex justify-between">
        <select
          name=""
          id=""
          className="border-4 border-secondary rounded p-1 text-secondary"
          value={selectedTimePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="Mois">Mois</option>
          <option value="Trimestre">Trimestre</option>
          <option value="Année">Année</option>
        </select>
        <select
          name=""
          id=""
          className="border-4 border-secondary rounded p-1 text-secondary"
          value={selectedYear}
          onChange={handleYearChange}
          disabled={isYearDisabled}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
      <canvas ref={chartRef} onClick={handleGraphClick}  className="cursor-pointer flex justify-center"/>
        
      </div>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                {/* body */}
                <div className="relative p-6 flex-auto">
                  <div className="flex justify-between mb-4">
                    <select
                      name=""
                      id=""
                      className="border-4 border-secondary rounded p-1 text-secondary"
                      value={selectedTimePeriod}
                      onChange={handleTimePeriodChange}
                    >
                      <option value="Mois">Mois</option>
                      <option value="Trimestre">Trimestre</option>
                      <option value="Année">Année</option>
                    </select>
                    <select
                      name=""
                      id=""
                      className="border-4 border-secondary rounded p-1 text-secondary"
                      value={selectedYear}
                      onChange={handleYearChange}
                      disabled={isYearDisabled}
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                  </div>
                  <canvas ref={chartRefModal} className="h-96 w-full" />
                </div>
                {/* footer */}
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white bg-secondary rounded-full font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-tertiary"
                    type="button"
                    onClick={handleModalClose}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default AttrByWeMoTriYe;
