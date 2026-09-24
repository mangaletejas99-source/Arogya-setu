const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const demoPatients = [
  {
    id: "PAT-1001",
    name: "Ramesh D. Jadhav",
    abhaId: "91-4829-1048-2910",
    age: 52,
    gender: "Male",
    bloodGroup: "O+",
    village: "Trimbakeshwar",
    phone: "+91 98220 14829",
    chronicConditions: ["Type 2 Diabetes", "Hypertension"],
    emergencyContact: "+91 98220 90011",
    insurance: "Ayushman Bharat / PM-JAY",
    schemeEligibility: ["Ayushman Bharat", "Senior Citizen Support"]
  }
];

const demoAppointments = [
  { id: "APT-001", patientName: "Ramesh D. Jadhav", doctorName: "Dr. Ananya Patil", facility: "District Civil Hospital, Nashik", date: "2026-09-24", time: "10:30 AM", status: "confirmed" },
  { id: "APT-002", patientName: "Kavita Shinde", doctorName: "Dr. S. K. Joshi", facility: "PHC Trimbak", date: "2026-09-25", time: "09:00 AM", status: "pending" }
];

const demoQueue = [{ token: 14, serving: 8, room: "OPD Room 4", hospital: "District Civil Hospital, Nashik", waitMinutes: 17 }];

const demoReferrals = [{ id: "REF-101", from: "PHC Trimbak", to: "District Civil Hospital, Nashik", status: "Accepted", reason: "Diabetes review" }];

const demoDiagnostics = [{ id: "LAB-201", test: "Lipid Profile", facility: "Civil Hospital Laboratory", status: "reported", price: "₹350" }];

const demoMedicines = [{ id: "MED-301", name: "Metformin 500mg", status: "In Stock", facility: "PHC Trimbak Pharmacy", price: "₹18", requiresPrescription: true }];

const demoFacilities = [{ id: "FAC-01", name: "PHC Trimbak", type: "PHC", district: "Nashik", services: ["Teleconsultation", "OPD", "Diagnostics"], emergencyAvailable: false }];

const demoSchemes = [{ id: "SCH-01", name: "Ayushman Bharat PM-JAY", status: "Eligible", benefits: ["Cashless secondary care", "Free hospitalization"] }];

const demoFollowUps = [{ id: "FU-01", patient: "Kavita Shinde", condition: "High-risk ANC", due: "2026-09-26", status: "Due" }];

const demoAssistantSummary = [{ patientId: "PAT-1001", complaint: "Fever and cough", symptoms: "fever, cough", duration: "2 days", severity: "Moderate", urgency: "Moderate", recommendedAction: "Consult PHC/doctor" }];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AROGYA SETU Backend is running!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AROGYA SETU API is working",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/patients", (req, res) => {
  res.json({ success: true, data: demoPatients });
});

app.get("/api/patients/:id", (req, res) => {
  const patient = demoPatients.find((item) => item.id === req.params.id) || demoPatients[0];
  res.json({ success: true, data: patient });
});

app.get("/api/appointments", (req, res) => {
  res.json({ success: true, data: demoAppointments });
});

app.post("/api/appointments", (req, res) => {
  const appointment = { id: `APT-${Date.now()}`, ...req.body };
  demoAppointments.unshift(appointment);
  res.status(201).json({ success: true, data: appointment });
});

app.get("/api/queue", (req, res) => {
  res.json({ success: true, data: demoQueue });
});

app.get("/api/referrals", (req, res) => {
  res.json({ success: true, data: demoReferrals });
});

app.post("/api/referrals", (req, res) => {
  const referral = { id: `REF-${Date.now()}`, ...req.body };
  demoReferrals.unshift(referral);
  res.status(201).json({ success: true, data: referral });
});

app.get("/api/diagnostics", (req, res) => {
  res.json({ success: true, data: demoDiagnostics });
});

app.get("/api/medicines", (req, res) => {
  res.json({ success: true, data: demoMedicines });
});

app.get("/api/facilities", (req, res) => {
  res.json({ success: true, data: demoFacilities });
});

app.get("/api/schemes", (req, res) => {
  res.json({ success: true, data: demoSchemes });
});

app.get("/api/followups", (req, res) => {
  res.json({ success: true, data: demoFollowUps });
});

app.post("/api/assistant/summary", (req, res) => {
  const summary = { id: `ASM-${Date.now()}`, ...req.body };
  demoAssistantSummary.unshift(summary);
  res.status(201).json({ success: true, data: summary });
});

app.listen(PORT, () => {
  console.log(`AROGYA SETU Backend running on http://localhost:${PORT}`);
});