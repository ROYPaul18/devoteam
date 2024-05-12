// import React, { useRef, useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import axios from 'axios';
// import { calcAttritionMale, calcAttritionFemale } from '../../../../../server/utils/attritionCalculator'; // make sure to replace with the correct path

// const AttrGenderGraph = () => {
//   const chartRef = useRef(null);
//   const [dataGenderChart, setDataGenderChart] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/attrition_rate_male_female');
//         const { maleCount, femaleCount, maleEndDateCount, femaleEndDateCount } = response.data;

//         // Implement attrition rate calculation logic here (previously in attritionCalculator.js)
//         const attrMale = calcAttritionMale(maleCount, maleEndDateCount);
//         const attrFemale = calcAttritionFemale(femaleCount, femaleEndDateCount);

//         setDataGenderChart({
//           labels: [""],
//           datasets: [
//             {
//               label: "homme",
//               data: [attrMale],
//               backgroundColor: ["rgba(255, 168, 125, 0.7)"],
//               borderColor: ["rgba(255, 168, 125, 1)"],
//               borderWidth: 1,
//             },
//             {
//               label: "femme",
//               data: [attrFemale],
//               backgroundColor: "rgba(96, 175, 94, 0.7)",
//               borderColor: "rgba(96, 175, 94, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (Object.keys(dataGenderChart).length === 0) return;

//     const chartInstance = new Chart(chartRef.current, {
//       type: 'bar',
//       data: dataGenderChart,
//       options: {
//         indexAxis: 'x',
//         responsive: true,
//         maintainAspectRatio: true,
//         aspectRatio: 2,
//         plugins: {
//           legend: {
//             display: true,
//           },
//         },
//         scales: {
//           y: {
//             grid: {
//               drawOnChartArea: false,
//             },
//           },
//           x: {
//             grid: {
//               drawOnChartArea: false,
//             },
//           },
//         },
//       },
//     });

//     return () => {
//       chartInstance.destroy();
//     };
//   }, [dataGenderChart]);

//   return (
//     <div>
//       <canvas ref={chartRef} />
//     </div>
//   );
// };

// export default AttrGenderGraph;
