import React, { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { TruckList } from "./components/TruckList";
import type { FoodTruck } from "./types";
import { haversineKm } from "./utils/haversineKm";

const API_URL = "https://data.sfgov.org/resource/rqzj-sfat.json";

function App() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"applicant" | "address">("applicant");

   // state for “nearest 5”
  const [nearLat, setNearLat] = useState("");
  const [nearLon, setNearLon] = useState("");
  const [nearStatus, setNearStatus] = useState("APPROVED");
  

  const handleSearch = async () => {
    const raw = query.trim();
    if (!raw) {
      alert("Please enter a search query");
      setResults([]);      
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();

      // regex to escape single quotes in query
      const q = raw.replace(/'/g, "''"); 
      //$where=upper(address) like upper('%O''FARRELL%')
      // bc if i have O'FARRELL in the query, it will be escaped to O''FARRELL
      // so the final query becomes upper(address) like upper('%O''FARRELL%')
      // and not upper(address) like upper('%O'FARRELL%') which would break the query

      if (q) {
        params.append(
            "$where",
            `upper(${mode}) like upper('%${q}%')`
          );
      }

      if (status) {
        // equality filter is fine as a normal param
        params.append("status", status);
      }

      params.append("$order", "applicant ASC, address ASC");
      params.append("$limit", "100");

      const res = await fetch(`${API_URL}?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResults(data);
      console.log(params.toString());
      console.log("Fetched data:", data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Find 5 nearest to given lat/lon 
  const handleFindNearest = async () => {
    const lat = Number(nearLat);
    const lon = Number(nearLon);
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      alert("Enter valid latitude and longitude");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("$select", "applicant,address,status,fooditems,latitude,longitude");
      params.append("$limit", "1000");
      if (nearStatus && nearStatus !== "ALL") {
        params.append("status", nearStatus);
      }



      const res = await fetch(`${API_URL}?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const rows: FoodTruck[] = await res.json();

      const nearest5: FoodTruck[] = rows
        .filter(truck => truck.latitude && truck.longitude)
        .map(truck => ({
          ...truck,
          distance_km: haversineKm(lat, lon, Number(truck.latitude), Number(truck.longitude)),
        }))
        .sort((a, b) => (a.distance_km! - b.distance_km!))
        .slice(0, 5);

      setResults(nearest5);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch nearest trucks");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">San Francisco Food Trucks</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        mode={mode}
        setMode={setMode}
        status={status}
        setStatus={setStatus}
        onSearch={handleSearch}

        // lat and lon for nearest
        nearLat={nearLat}
        setNearLat={setNearLat}
        nearLon={nearLon}
        setNearLon={setNearLon}
        nearStatus={nearStatus}
        setNearStatus={setNearStatus}
        onFindNearest={handleFindNearest}
      />
    
      {loading ? <p>Loading...</p> : <TruckList trucks={results} />}
    </div>
  );
}

export default App;