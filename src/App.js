import React, { useMemo, useState, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Brain,
  Cloud,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Radar,
  Server,
  ShieldAlert,
  Thermometer,
  Waves,
  Wrench,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

const LoadingSpinner = () => (
  <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
    <div style={{ fontSize: "24px", marginBottom: "10px" }}>⏳ Loading...</div>
    <p>Charts and content loading...</p>
  </div>
);

const metrics = [
  { label: "Dataset Samples", value: "1200", sub: "Balanced: 400 per class" },
  { label: "TinyML Accuracy", value: "85%", sub: "Edge model performance" },
  { label: "Severe Recall", value: "83.3%", sub: "Safety focused" },
  { label: "Deployment Target", value: "ESP32", sub: "Edge device" },
];

const teamMembers = [
  { name: "Krishna Pansari", roll: "2023UCA1940" },
  { name: "Abhay Raj Yadav", roll: "2023UCA1942" },
  { name: "Hisham Siddiqui", roll: "2023UCA1961" },
];

const classData = [
  { name: "Healthy", value: 400 },
  { name: "Minor Damage", value: 400 },
  { name: "Severe Damage", value: 400 },
];

const featureTrend = [
  { state: "Healthy", strain: 9500, freq: 4.9, energy: 74, rms: 0.77 },
  { state: "Minor", strain: 12300, freq: 4.4, energy: 70, rms: 0.75 },
  { state: "Severe", strain: 17000, freq: 3.8, energy: 66, rms: 0.73 },
];

const accuracyHistory = [
  { epoch: 1, train: 0.45, val: 0.52 },
  { epoch: 5, train: 0.68, val: 0.71 },
  { epoch: 10, train: 0.78, val: 0.79 },
  { epoch: 15, train: 0.82, val: 0.82 },
  { epoch: 20, train: 0.84, val: 0.84 },
  { epoch: 30, train: 0.85, val: 0.85 },
  { epoch: 40, train: 0.86, val: 0.85 },
];

const featureImportance = [
  { name: "freq_mode1", value: 50.87 },
  { name: "strain", value: 35.35 },
  { name: "strain_temp_ratio", value: 19.83 },
  { name: "variance", value: 16.68 },
  { name: "rms", value: 15.27 },
];

const pipeline = [
  {
    icon: Database,
    title: "Ingest Data",
    desc: "Read SHM dataset and prepare features for training and inference.",
  },
  {
    icon: GitBranch,
    title: "Track Code",
    desc: "Version notebooks, model scripts, configs, and deployment files.",
  },
  {
    icon: Brain,
    title: "Train Model",
    desc: "Run the SHM notebook pipeline and produce updated model artifacts.",
  },
  {
    icon: GitBranch,
    title: "Log with MLflow",
    desc: "Track model accuracy, versions, and experiment runs.",
  },
  {
    icon: Server,
    title: "Serve API",
    desc: "Expose the trained model through Flask or FastAPI.",
  },
  {
    icon: Cloud,
    title: "Deploy",
    desc: "Deploy the dashboard and convert the model to TFLite for ESP32.",
  },
  {
    icon: Activity,
    title: "Monitor",
    desc: "Observe predictions, warnings, and system behavior in real time.",
  },
  {
    icon: Wrench,
    title: "Retrain",
    desc: "Use fresh data to improve the model and redeploy.",
  },
];

function predictState({ temp, strain, freq, rms, energy, ratio }) {
  let healthy = 0;
  let minor = 0;
  let severe = 0;

  if (strain < 11000) healthy += 2;
  else if (strain < 14500) minor += 2;
  else severe += 3;

  if (freq > 4.7) healthy += 2;
  else if (freq > 4.1) minor += 2;
  else severe += 3;

  if (rms > 0.755) healthy += 1;
  else if (rms > 0.735) minor += 1;
  else severe += 1;

  if (energy > 72) healthy += 1;
  else if (energy > 68) minor += 1;
  else severe += 1;

  if (ratio < 500) healthy += 1;
  else if (ratio < 650) minor += 1;
  else severe += 2;

  if (temp > 30) minor += 0.5;

  const scores = [
    { label: "Healthy", score: healthy },
    { label: "Minor Damage", score: minor },
    { label: "Severe Damage", score: severe },
  ].sort((a, b) => b.score - a.score);

  return scores[0].label;
}

function App() {
  const [temp, setTemp] = useState(24);
  const [strain, setStrain] = useState(11800);
  const [freq, setFreq] = useState(4.5);
  const [rms, setRms] = useState(0.75);
  const [energy, setEnergy] = useState(71);
  const [ratio, setRatio] = useState(560);

  const prediction = useMemo(
    () => predictState({ temp, strain, freq, rms, energy, ratio }),
    [temp, strain, freq, rms, energy, ratio]
  );

  const riskValue =
    prediction === "Healthy" ? 24 : prediction === "Minor Damage" ? 61 : 91;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="brand">
            <ShieldAlert size={24} />
            <span>SHM Sentinel</span>
          </div>
          <p className="muted">Structural Health Monitoring + DevOps for AI</p>
        </div>
        <div className="badges">
          <span className="badge">Unit V Capstone</span>
          <span className="badge">TinyML Ready</span>
          <span className="badge">MLflow + CI/CD</span>
        </div>
      </header>

      <section className="hero">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <p className="eyebrow">Netaji Subhash University of Technology</p>
            <h1>
              Structural Health Monitoring with
              <span className="accent"> DevOps for AI Deployment</span>
            </h1>
          </motion.div>
          <p className="hero-text">
            This website presents your SHM project as a full Unit V capstone:
            dataset, model behavior, TinyML workflow, API serving, and DevOps
            lifecycle for deployment and monitoring.
          </p>

          <div className="team-grid">
            {teamMembers.map((m) => (
              <div key={m.roll} className="team-card">
                <div className="team-name">{m.name}</div>
                <div className="team-roll">{m.roll}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">
            <Radar size={18} /> Live System Snapshot
          </h3>
          <div className="metrics-grid">
            {metrics.map((m) => (
              <div key={m.label} className="metric-card">
                <p className="metric-label">{m.label}</p>
                <p className="metric-value">{m.value}</p>
                <p className="metric-sub">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cards3">
        <div className="info-card">
          <h3><Waves size={18} /> Multi-Sensor Inputs</h3>
          <p>Vibration, strain, and temperature are fused into one compact feature set.</p>
        </div>
        <div className="info-card">
          <h3><Brain size={18} /> TinyML Model</h3>
          <p>A lightweight neural network is optimized for edge inference on ESP32.</p>
        </div>
        <div className="info-card">
          <h3><GitBranch size={18} /> DevOps Pipeline</h3>
          <p>Training, tracking, serving, monitoring, and retraining are handled as one lifecycle.</p>
        </div>
      </section>

      <section className="section-grid">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="panel">
            <h3 className="panel-title">Balanced Class Distribution</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={classData} dataKey="value" nameKey="name" outerRadius={95} innerRadius={50} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <div className="panel">
            <h3 className="panel-title">Feature Trend Across Damage States</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="strain" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Suspense>
      </section>

      <section className="section-grid">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="panel">
            <h3 className="panel-title">Training Trend</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="train" />
                  <Line type="monotone" dataKey="val" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <div className="panel">
            <h3 className="panel-title">Feature Importance</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={110} />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Suspense>
      </section>

      <section className="pipeline-section">
        <h2>DevOps for AI Pipeline</h2>
        <div className="pipeline-grid">
          {pipeline.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="pipe-card">
                <h3>
                  <Icon size={18} /> {i + 1}. {step.title}
                </h3>
                <p>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="demo-grid">
        <div className="panel">
          <h3 className="panel-title">Interactive SHM Prediction Demo</h3>
          <div className="form-grid">
            <div>
              <label>Temperature (°C)</label>
              <input type="number" value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
            </div>
            <div>
              <label>Strain</label>
              <input type="number" value={strain} onChange={(e) => setStrain(Number(e.target.value))} />
            </div>
            <div>
              <label>Frequency Mode 1</label>
              <input type="number" step="0.1" value={freq} onChange={(e) => setFreq(Number(e.target.value))} />
            </div>
            <div>
              <label>RMS</label>
              <input type="number" step="0.001" value={rms} onChange={(e) => setRms(Number(e.target.value))} />
            </div>
            <div>
              <label>Energy</label>
              <input type="number" value={energy} onChange={(e) => setEnergy(Number(e.target.value))} />
            </div>
            <div>
              <label>Strain / Temp Ratio</label>
              <input type="number" value={ratio} onChange={(e) => setRatio(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">Predicted State</h3>
          <div className="prediction-box">
            <div className="pred-title">
              {prediction === "Healthy" ? (
                <Gauge size={22} />
              ) : prediction === "Minor Damage" ? (
                <AlertTriangle size={22} />
              ) : (
                <ShieldAlert size={22} />
              )}
              <span>{prediction}</span>
            </div>
            <p className="muted">
              This is a frontend demo placeholder. Later, you can connect it to your real Flask or FastAPI backend.
            </p>
          </div>

          <div className="risk">
            <div className="risk-row">
              <span>Risk Score</span>
              <span>{riskValue}%</span>
            </div>
            <div className="risk-bar">
              <div className="risk-fill" style={{ width: `${riskValue}%` }} />
            </div>
          </div>

          <div className="chart-box small-chart">
            <Suspense fallback={<LoadingSpinner />}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={featureTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="freq" fillOpacity={0.25} />
                </AreaChart>
              </ResponsiveContainer>
            </Suspense>
          </div>
        </div>
      </section>

      <section className="footer-panel">
        <div>
          <h2>Why this satisfies Unit V</h2>
          <p>
            This website shows the full DevOps for AI lifecycle applied to your SHM project:
            dataset handling, model training, experiment tracking, backend serving,
            TinyML export, deployment readiness, monitoring, and retraining.
          </p>
        </div>
        <div className="footer-points">
          <div><Cpu size={18} /> AI + TinyML</div>
          <div><Thermometer size={18} /> Sensor Fusion</div>
          <div><Activity size={18} /> Monitoring Dashboard</div>
          <div><Cloud size={18} /> Deployable Pipeline</div>
        </div>
      </section>
    </div>
  );
}

export default App;