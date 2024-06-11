import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Chart from "chart.js/auto";
import axios from "axios";
import { Bars } from 'react-loader-spinner'; // Importer le loader

const AttrPartnerGraph = () => {
  const [showModal, setShowModal] = useState(false);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [displayPartners, setDisplayPartners] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const chartRefModal = useRef(null);

  const getAttritionByPartner = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/attrition_rates_by_partner');
      return response.data;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Début du chargement
      const attritionByPartner = await getAttritionByPartner();
      const partnersWithCounts = Object.keys(attritionByPartner).map(partner => ({
        partner, 
        attritionRate: attritionByPartner[partner],
      }));
     
      setFilteredPartners(partnersWithCounts);
      setDisplayPartners(partnersWithCounts.slice(0, 4));
      setLoading(false); // Fin du chargement
    };
    fetchData();
  }, []);

  const partnerData = {
    labels: displayPartners.map((partner) => partner.partner),
    datasets: [
      {
        label: 'Taux d\'attrition',
        data: displayPartners.map((partner) => partner.attritionRate),
        backgroundColor: '#FF496E',
        borderColor: '#FF496E',
        borderWidth: 1,
      },
    ],
  };

  const partnerOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          color: "rgba(0, 0, 0, 0.8)",
        },
      },
      y: {
        ticks: {
          color: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
  };

  const handleGraphClick = () => {
    setDisplayPartners(filteredPartners);
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal && chartRefModal.current) {
      const chartInstance = new Chart(chartRefModal.current, {
        type: "bar",
        data: {
          labels: filteredPartners.map((partner) => partner.partner),
          datasets: [
            {
              label: 'Taux d\'attrition',
              data: filteredPartners.map((partner) => partner.attritionRate),
              backgroundColor: '#FF496E',
              borderColor: '#FF496E',
              borderWidth: 1,
            },
          ],
        },
        options: partnerOptions,
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [showModal, filteredPartners, partnerOptions]);

  const handleModalClose = () => {
    setShowModal(false);
    setDisplayPartners(filteredPartners.slice(0, 4));
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
          <Bars
            height={80}
            width={80}
            color="#FF496E"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#FF496E"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      <div className={`w-full h-full ${loading ? 'opacity-50' : ''} p-`}>
        <Bar data={partnerData} options={partnerOptions} onClick={handleGraphClick} className="cursor-pointer" />
      </div>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/4 my-6 mx-auto max-w-7xl h-4/5">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <div className="overflow-y-auto max-h-[600px]">
                    <canvas ref={chartRefModal} className="w-full" />
                  </div>
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-00 rounded-b">
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

export default AttrPartnerGraph;