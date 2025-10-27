import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  mode: "applicant" | "address";
  setMode: React.Dispatch<React.SetStateAction<"applicant" | "address">>;
  status: string;
  setStatus: (val: string) => void;
  onSearch: () => void;

   // for nearest
  nearLat: string;
  setNearLat: (v: string) => void;
  nearLon: string;
  setNearLon: (v: string) => void;
  nearStatus: string;
  setNearStatus: (val: string) => void;
  onFindNearest: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query, setQuery,
  mode, setMode,
  status, setStatus,
  onSearch,
  nearLat, setNearLat,
  nearLon, setNearLon,
  nearStatus, setNearStatus,
  onFindNearest,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Row 1: Text search */}
      <div className="flex gap-3 mb-4">
        
        <input
          type="text"
          placeholder="Search applicant or street..."
          value={query}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "applicant" | "address")}
          className="border px-3 py-2 rounded"
        >
          <option value="applicant">Applicant</option>
          <option value="address">Address</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All statuses</option>
          <option value="APPROVED">Approved</option>
          <option value="REQUESTED">Requested</option>
          <option value="EXPIRED">Expired</option>
          <option value="ISSUED">Issued</option>
          <option value="SUSPEND">Suspend</option>
        </select>
        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/*  Row 2 Nearest 5 row */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          step="any"
          placeholder="Lat"
          value={nearLat}
          onChange={(e) => setNearLat(e.target.value)}
          onKeyDown={(e) => {
            if (["e", "E"].includes(e.key)) e.preventDefault();
          }}
          className="border px-3 py-2 rounded w-40"
        />
        <input
          type="number"
          step="any"
          placeholder="Lon"
          value={nearLon}
          onChange={(e) => setNearLon(e.target.value)}
          onKeyDown={(e) => {
            if (["e", "E"].includes(e.key)) e.preventDefault();
          }}
          className="border px-3 py-2 rounded w-40"
        />
        <select
          value={nearStatus}
          onChange={(e) => setNearStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="APPROVED">Approved</option>
          <option value="REQUESTED">Requested</option>
          <option value="EXPIRED">Expired</option>
          <option value="ISSUED">Issued</option>
          <option value="SUSPEND">Suspend</option>
          <option value="ALL">All statuses</option>
        </select>
        <button
          onClick={onFindNearest}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Nearest 5
        </button>
      </div>
    </div>
  );
};