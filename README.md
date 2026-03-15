# tiic-coursework
# TIIC AR Maintenance – Frontend

This is the React/Vite frontend for the AR‑Enhanced Maintenance Support System prototype. It provides the AR fault view, tool check interface, and dashboard UI described in the coursework brief.[file:5][file:6]

## Tech Stack

- React 19 (Vite)
- React Router
- Context API for basic auth state
- Browser camera access via `getUserMedia` (for AR view and tool check)[file:6]

## Features (current prototype)

- Login screen (placeholder auth)
- AR Maintenance page:
  - Uses device camera as a live view.
  - Placeholder area where AR fault overlays will be rendered.
  - Form and list components to create and view fault tickets (FR1–FR8).[file:6]
- Tool Check page:
  - Uses camera view while the user checks tools.
  - Interactive checklist of tools, with “scanned” status to simulate verification (FR9–FR13, US6).[file:6]
- Dashboard page:
  - Placeholder cards for fault statistics, tool usage, and alerts (FR17–FR18).[file:6]

## Project Structure

```text
frontend/
  src/
    main.jsx           # App entry, wraps App with BrowserRouter + AuthProvider
    App.jsx            # Defines routes and protected areas
    context/
      AuthContext.jsx  # Simple auth state (user + login/logout)
    components/
      Layout.jsx       # Header, nav, and main layout shell
      ProtectedRoute.jsx
      ArScanner.jsx    # Camera view for AR maintenance
      ToolScanner.jsx  # Camera + tool checklist
      FaultForm.jsx    # Create / annotate fault
      FaultList.jsx    # Display mock fault list
    pages/
      LoginPage.jsx
      ArMaintenancePage.jsx
      ToolCheckPage.jsx
      DashboardPage.jsx
    styles.css         # Basic styling
  package.json
  vite.config.js



----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



AR maintenance web app (React + WebXR/Three.js) for:
•	Scanning infrastructure markers and showing AR fault overlays (FR1–FR3, FR7).
•	Creating and editing fault tickets with description, severity, images (FR4–FR6).
•	Tool scanning + checklist/verification UI (FR9–FR13).
•	Authentication and role based UI behaviour on the frontend (FR14–FR15, NFR7).
•	Basic dashboard pages in React that will later be powered by the data analytics teammates (FR17–FR18).

Frontend features you should implement first:
•	Login and role aware shell:
•	Secure login form, talking to /api/auth (FR14, NFR7).
•	Different menus depending on role: Maintenance Engineer, Technician, Admin, Security, Data Analyst (stakeholders list).
•	AR maintenance screen (core of your mark for “Computing pathway”):
•	Camera view with marker detection (FR1–FR3).
•	When a marker is detected, show an overlay card with:
•	Fault ID/name, severity, status, description (FR4, FR7).
•	Buttons: “Mark new fault”, “Update status”, “Add photo”.
•	Fault ticket form:
•	Form fields exactly matching FR4 (description, severity, images), mapped to FR5–FR6 storage via backend.
•	Status dropdown open/in progress/resolved (FR8).
•	Tool check screen:
•	Camera view that scans tool markers (FR9–FR10).
•	A checklist UI of required tools per job, with ticks as you scan (FR11–FR13).
•	Simple dashboard skeleton:
•	Fault list and basic charts placeholders for “faults by severity”, “open vs closed”, etc. (FR17–FR18).
•	The data analytics teammate can later plug in real analytics and predictive models (FR19).
For each of these, keep linking back to FR/US IDs in comments so your report is easy later.
3. Set up the React project and repo structure
In the shared GitHub repo, propose a structure like:
•	/frontend
•	/src
•	/components
•	ArScanner.tsx / .jsx
•	ToolScanner.tsx
•	FaultForm.tsx
•	FaultList.tsx
•	DashboardCharts.tsx
•	/pages
•	LoginPage.tsx
•	ArMaintenancePage.tsx
•	ToolCheckPage.tsx
•	DashboardPage.tsx
•	/context
•	AuthContext.tsx (handles JWT, roles).
•	/api
•	faultsApi.ts
•	toolsApi.ts
•	authApi.ts
•	/styles
•	main.css
•	package.json
•	README_frontend.md
In README_frontend.md, document:
•	How to run the frontend (npm install, npm run dev).
•	Required env vars (e.g. VITE_API_BASE_URL).
•	Link each main screen to the FR/US it covers (e.g. “ArMaintenancePage implements US1–US5, FR1–FR8”).
This directly contributes to “Code Quality” and “Setup Documentation” marks.
4. Frontend technical approach (React + AR + security)
•	React + Vite (or CRA) for the app shell and routing.
•	WebXR / Three.js or a higher level wrapper (e.g. mind ar js, A Frame React wrapper) for marker based AR.
•	Context + hooks for auth:
•	Store JWT in httpOnly cookie (backend side) or in memory/localStorage with CSRF protection (coordinate with cyber teammate) to meet NFR1 and NFR7.
•	UI patterns to satisfy usability NFRs:
•	High contrast overlays, big text, clear icons for AR overlays (NFR6, NFR11).
•	Render AR overlays quickly and efficiently (NFR5, NFR13).
•	Mobile first design:
•	Must work via mobile browsers supporting WebXR (NFR8).
build the AR components, keep them simple and focused on demonstrating TRL 3 feasibility, not production level AR.
________________________________________
1. How the frontend implements the user stories and FRs
Think of it as four main areas:
A) Authentication and roles
React parts
•	LoginPage.jsx
•	AuthContext.jsx
•	ProtectedRoute.jsx
•	Layout.jsx (shows different nav for logged-in users)
User stories / FRs covered
•	US14: “As a user, I want a secure login so that my account cannot be accessed by unauthorised users.”
•	FR14: User authentication (login required).
•	FR15: Role-based access control (different roles later).
•	NFR7: Multi-factor auth (to be added on backend; frontend supports basic login).
How
•	LoginPage calls login from AuthContext, which will call /auth/login on the backend and store { username, role }.
•	ProtectedRoute blocks access to /ar, /tools, /dashboard, /users unless a user is set.
•	Layout reads user.role so you can later hide/show pages per role (e.g. only Admin sees /users).
________________________________________
B) AR fault detection and ticketing
React parts
•	ArMaintenancePage.jsx
•	ArScanner.jsx (camera + simulated ArUco marker ID)
•	FaultForm.jsx
•	FaultList.jsx
•	api/faultsApi.js
User stories / FRs
•	US1–US5: Engineer scans infrastructure, marks faults, creates tickets so others can see them.
•	FR1–FR3: AR infrastructure scanning and marker detection.
•	FR3–FR6, FR7–FR8: Fault annotation, metadata, storage, retrieval, status management.
How
•	ArScanner opens the camera and lets the user enter a simulated ArUco marker ID (e.g. 101) which represents a physical marker on a wall or asset.
•	FaultForm shows the current marker ID and, when you submit, creates a fault with:
•	title, description, severity
•	markerId (binds the fault to that physical location)
•	FaultList displays all faults and their markerId, so a second engineer can filter by marker and see the faults for “that wall”.
•	api/faultsApi.js defines getFaultsApi() and createFaultApi() that will talk to the Express backend.
This matches your overview: first engineer marks a fault at a wall using AR (marker ID), creates a ticket, second engineer uses AR and the same marker to see where the fault is.
________________________________________
C) Tool accountability
React parts
•	ToolCheckPage.jsx
•	ToolScanner.jsx
User stories / FRs
•	US6: “As a maintenance engineer, I want to scan my tools before starting a job so that the system verifies I have the correct equipment.”
•	FR9–FR13: Tool scanning, recognition, checklist, verification, logging.
How
•	ToolScanner:
•	Shows a live camera view.
•	Has a “Start tool scan” button that simulates a 3 second scan (matching “point camera at tools for a few seconds”).
•	After the countdown, it marks all required tools as scanned = true and shows a checklist of required vs scanned tools.
•	This directly mirrors your overview story, and later you or data analytics teammates can:
•	Push scan events to the backend for logging.
•	Use those logs for dashboards / proof of tool accountability.
________________________________________
D) User management and role access
React parts
•	UserManagementPage.jsx
•	UserForm.jsx
•	UserList.jsx
•	AccessControlInfo.jsx
•	api/usersApi.js
User stories / FRs
•	Admin / System Administrator stakeholder: “Access to everything.”
•	Security/Admin/Data/Engineer/Authorised roles from your stakeholders doc.
•	FR14–FR15: Manage users and enforce role-based access to features.
How
•	UserManagementPage:
•	Uses UserForm to create or edit a user (name, email, role, password).
•	Uses UserList to show existing users with edit/delete buttons.
•	AccessControlInfo describes, for documentation:
•	Who can see AR maintenance, tool checks, dashboards, and user management (secure design / access control).
•	api/usersApi.js defines getUsersApi, createUserApi, updateUserApi, deleteUserApi that the backend team can implement.
________________________________________
2. Backend endpoints: paths and payloads
Here is a simple Express API spec that fits your frontend and requirements.
A) Auth endpoints
1. POST /auth/login
•	Request body:
json
{
  "username": "engineer1",
  "password": "secret123"
}
•	Response (200):
json
{
  "username": "engineer1",
  "role": "MaintenanceEngineer"
}
•	Behaviour:
•	Validates credentials, returns 401 if invalid.
•	Sets a secure cookie with a JWT (or returns token) to support NFR1 (TLS) and NFR23 (password hashing).
Optional 2. POST /auth/logout
•	Clears the auth cookie / invalidates token.
________________________________________
B) Faults endpoints
1. GET /faults
•	Used by getFaultsApi().
•	Response example:
json
[
  {
    "id": "f-001",
    "title": "Crack in tunnel wall",
    "description": "Visible crack near marker 101",
    "severity": "high",
    "markerId": 101,
    "status": "open",
    "createdBy": "engineer1",
    "createdAt": "2026-03-15T00:00:00Z"
  }
]
Matches FR5–FR6 (fault storage + retrieval) and supports dashboard analytics (FR17–FR19).
2. POST /faults
•	Request body (from FaultForm):
json
{
  "title": "Crack in tunnel wall",
  "description": "Near marker 101, lower left corner",
  "severity": "high",
  "markerId": 101
}
•	Response:
json
{
  "id": "f-001",
  "title": "Crack in tunnel wall",
  "description": "Near marker 101, lower left corner",
  "severity": "high",
  "markerId": 101,
  "status": "open",
  "createdBy": "engineer1",
  "createdAt": "2026-03-15T00:00:00Z"
}
Supports US1–US3, FR3–FR6.
3. PATCH /faults/:id
•	For updating status or details (FR8).
Request body (example):
json
{
  "status": "resolved"
}
Backend should:
•	Check role (only Engineers/Technicians or Admin can change status).
•	Log changes for audit (FR20–FR21).
________________________________________
C) Tool accountability endpoints
Even though your current frontend simulates scanning, backend can still log events.
1. POST /tool-checks
•	Called at the end of a scan (from ToolScanner when countdown finishes).
Request body:
json
{
  "userId": "engineer1",
  "tools": [
    { "name": "Torque Wrench", "required": true, "scanned": true },
    { "name": "Voltage Tester", "required": true, "scanned": true },
    { "name": "Inspection Camera", "required": false, "scanned": false }
  ],
  "timestamp": "2026-03-15T00:05:00Z"
}
Backend can:
•	Save this to a ToolCheck collection/table.
•	Use it for dashboards and proof of accountability (FR13, FR17–FR19).
2. GET /tool-checks
•	For Data Analyst / Dashboard page to view tool use patterns.
________________________________________
D) Users and roles endpoints
1. GET /users
•	Returns list of users for UserList, only if role === "SystemAdministrator" or similar.
Response:
json
[
  {
    "id": "u-001",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "role": "MaintenanceEngineer"
  }
]
2. POST /users
•	From UserForm (create mode):
json
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "role": "MaintenanceEngineer",
  "password": "secret123"
}
Backend:
•	Hashes password (FR23).
•	Enforces RBAC (only Admin can create users).
3. PUT /users/:id
•	From UserForm (edit mode):
json
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "role": "SecurityAnalyst",
  "password": ""
}
Backend:
•	Updates name/email/role.
•	Only updates password if non-empty.
4. DELETE /users/:id
•	Remove user; log action for audit (FR21, NFR4).
________________________________________
E) Activity and security logging
To satisfy FR20–FR25 and your security user stories (security admin/analyst watching logs):
1. GET /logs/security
•	Only for roles: SecurityAdministrator, SecurityAnalyst.
•	Returns login attempts, account lockouts, suspicious activity.
2. GET /logs/ar-usage
•	High level AR usage and fault interactions for analytics.
You don’t need a full UI now, but defining these endpoints shows you understand the integration and supports your cyber security teammates.
________________________________________
3. How to present this in your report
You can copy and adapt this structure into a short section called, for example, “Frontend–Backend Integration Design”, with two subsections:
1.	Frontend implementation of user stories and requirements
•	Summarise the mapping like I did in part 1, referencing US/FR IDs and components (ArMaintenancePage, ToolCheckPage, etc.).
2.	REST API design for Express backend
•	Include a small table listing each endpoint, method, purpose, and main fields, e.g.:
Endpoint	Method	Used by (frontend)	FRs/User stories covered
/auth/login	POST	AuthContext.login()	FR14, FR15, US14 

/faults	GET	ArMaintenancePage	FR5, FR6, FR7 

/faults	POST	FaultForm	FR3–FR6, US1–US3 

/tool-checks	POST	ToolScanner	FR9–FR13, US6 
/users	CRUD	UserManagementPage	FR14–FR15 

