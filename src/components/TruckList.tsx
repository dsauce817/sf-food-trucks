import React from "react";
import type { FoodTruck } from "../types";

interface Props {
    trucks: FoodTruck[];
}

export const TruckList: React.FC<Props> = ({ trucks }) => {
    if (!trucks.length) return <p>No results found.</p>;

    return (
        <table className="table-auto border-collapse w-full">
        <thead>
            <tr className="bg-gray-600">
            <th className="border px-3 py-2">Applicant</th>
            <th className="border px-3 py-2">Address</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Food Items</th>
            <th className="border px-3 py-2">Latitude</th>
            <th className="border px-3 py-2">Longitude</th>
            <th className="border px-3 py-2">Distance (km)</th>
            </tr>
        </thead>
        <tbody>
            {trucks.map((t, i) => (
            <tr key={i} className="hover:bg-gray-800">
                <td className="border px-3 py-2"
                >{t.applicant}</td>
                <td className="border px-3 py-2">{t.address}</td>
                <td className="border px-3 py-2">{t.status}</td>
                <td className="border px-3 py-2">{t.fooditems || "N/A"}</td>
                <td className="border px-3 py-2">{t.latitude || "—"}</td>
                <td className="border px-3 py-2">{t.longitude || "—"}</td>
                <td className="border px-3 py-2">
                {typeof t.distance_km === "number" ? t.distance_km.toFixed(2) : "—"}
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};