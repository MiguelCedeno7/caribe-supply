"use client";
import { useState, useEffect } from "react";

const provincias = [
  { name: "Azua", query: "Azua,DO" },
  { name: "Bahoruco", query: "Bahoruco,DO" },
  { name: "Barahona", query: "Barahona,DO" },
  { name: "Dajabón", query: "Dajabon,DO" },
  { name: "Distrito Nacional", query: "Distrito Nacional,DO" },
  { name: "Duarte", query: "Duarte,DO" },
  { name: "Elías Piña", query: "Elias Pina,DO" },
  { name: "El Seibo", query: "El Seibo,DO" },
  { name: "Espaillat", query: "Espaillat,DO" },
  { name: "Hato Mayor", query: "Hato Mayor,DO" },
  { name: "Hermanas Mirabal", query: "Hermanas Mirabal,DO" },
  { name: "Independencia", query: "Independencia,DO" },
  { name: "La Altagracia", query: "La Altagracia,DO" },
  { name: "La Romana", query: "La Romana,DO" },
  { name: "La Vega", query: "La Vega,DO" },
  { name: "María Trinidad Sánchez", query: "Maria Trinidad Sanchez,DO" },
  { name: "Monseñor Nouel", query: "Monseñor Nouel,DO" },
  { name: "Monte Cristi", query: "Monte Cristi,DO" },
  { name: "Monte Plata", query: "Monte Plata,DO" },
  { name: "Pedernales", query: "Pedernales,DO" },
  { name: "Peravia", query: "Peravia,DO" },
  { name: "Puerto Plata", query: "Puerto Plata,DO" },
  { name: "Samaná", query: "Samana,DO" },
  { name: "San Cristóbal", query: "San Cristobal,DO" },
  { name: "San José de Ocoa", query: "San Jose de Ocoa,DO" },
  { name: "San Juan", query: "San Juan,DO" },
  { name: "San Pedro de Macorís", query: "San Pedro de Macoris,DO" },
  { name: "Sánchez Ramírez", query: "Sanchez Ramirez,DO" },
  { name: "Santiago", query: "Santiago,DO" },
  { name: "Santiago Rodríguez", query: "Santiago Rodriguez,DO" },
  { name: "Valverde", query: "Valverde,DO" }
];

const API_KEY = "9d570c0fb1f443a782013545250112";

export default function WeatherWidget() {
  const [open, setOpen] = useState(false);
  const [provincia, setProvincia] = useState(provincias[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(provincia.query)}&lang=es`)
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          wind: data.current.wind_kph,
          humidity: data.current.humidity,
          icon: data.current.condition.icon
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setWeather(null);
        setLoading(false);
      });
  }, [provincia]);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-orange-600 text-white font-bold shadow-lg flex items-center justify-center z-50 hover:bg-orange-500 transition-colors"
      >
        Clima
      </button>

      {/* Panel desplegable */}
      {open && (
        <div className="fixed bottom-20 right-4 w-72 max-h-[400px] bg-white rounded-lg shadow-lg p-4 z-50 overflow-y-auto">
          
          {/* Dropdown personalizado */}
          <div className="relative mb-4">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border p-2 rounded cursor-pointer text-gray-700 bg-white"
            >
              {provincia.name}
            </div>
            {dropdownOpen && (
              <div className="absolute top-full left-0 w-full max-h-50 overflow-y-auto border rounded mt-1 bg-white z-50 shadow-lg">
                {provincias.map(p => (
                  <div
                    key={p.name}
                    className="p-2 hover:bg-orange-100 cursor-pointer"
                    onClick={() => {
                      setProvincia(p);
                      setDropdownOpen(false);
                    }}
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <h3 className="font-semibold mb-2 text-center text-gray-700">Provincia: {provincia.name}</h3>

          {loading ? (
            <p className="text-center text-gray-500">Cargando clima...</p>
          ) : weather ? (
            <div className="text-center text-gray-700 space-y-1">
              <div className="flex justify-center items-center space-x-2">
                <img src={weather.icon} alt={weather.condition} />
                <p className="text-xl font-bold">{weather.temp}°C</p>
              </div>
              <p>🌥️ {weather.condition}</p>
              <p>💨 Viento: {weather.wind} km/h</p>
              <p>💧 Humedad: {weather.humidity}%</p>
            </div>
          ) : (
            <p className="text-center text-red-500">No se pudo cargar el clima</p>
          )}
        </div>
      )}
    </>
  );
}
