SF Food Trucks App

This is a React + TypeScript frontend app that uses the San Francisco Mobile Food Facility dataset to let users explore food trucks across the city.

---------------------------------------------------------------------------------------------------------------------

Features
	•	Search by applicant name with an optional status filter
	•	Search by street name or part of an address — for example, typing “SAN” will match “SANSOME ST”
	•	Find the 5 nearest food trucks by latitude and longitude
	•	Defaults to status APPROVED
	•	Option to include all statuses

The app directly queries the public SF Open Data API, so there’s no backend required.

---------------------------------------------------------------------------------------------------------------------

How it works
	•	Uses Socrata’s SoQL parameters ($where, $order, $limit) for flexible searching.
	•	Escapes single quotes automatically so user queries like O'FARRELL don’t break.
	•	For nearest trucks, it fetches a list and uses the Haversine formula client-side to calculate real distances in kilometers, then sorts and displays the closest 5.

---------------------------------------------------------------------------------------------------------------------

Tech Stack
	•	React + TypeScript
	•	TailwindCSS for styling
	•	Vite for fast dev environment
	•	Vitest + React Testing Library for automated tests
 
---------------------------------------------------------------------------------------------------------------------

Design Choices
	•	Went with a frontend-only approach to keep setup simple — no backend or auth layer needed since the data is public.
	•	Used client-side distance calculation for flexibility and quick iteration.
	•	Escaped user input to avoid SoQL query errors.
	•	Used modular components (SearchBar, TruckList, and haversineKm) for clarity and easy maintenance.

---------------------------------------------------------------------------------------------------------------------

How to Run:

npm install
npm run dev

Then visit http://localhost:5173

---------------------------------------------------------------------------------------------------------------------

Build for production:

npm run build
npm run preview

---------------------------------------------------------------------------------------------------------------------

Tests

How to run tests:

npm run test

Tests cover:
	•	The Haversine distance utility (correctness + symmetry)
	•	TruckList component (renders results, handles “no results” case)

---------------------------------------------------------------------------------------------------------------------

Critique & Trade-offs

What I’d add with more time:
	•	A Node/Express backend for caching and cleaner API routes
	•	Swagger / OpenAPI docs for API endpoints
	•	Pagination or infinite scroll for larger datasets
	•	Map visualization (Google Maps or Leaflet)
	•	Dockerfile for easier setup

Trade-offs made:
	•	Fetching directly from Socrata is easy but not scalable if API rate limits are hit.
	•	Client-side filtering is simple but could be slower with very large datasets.

Scaling plan:
	•	Move to a backend with PostGIS or MongoDB geospatial indexing for efficient nearest-truck queries.
	•	Cache frequent queries on the backend or via CDN.
	•	Add monitoring and logging for production.

---------------------------------------------------------------------------------------------------------------------

Summary
	•	Meets all Frontend Challenge requirements
	•	Includes bonus “nearest trucks” feature from the backend spec
	•	Clean code, modular structure, and automated tests