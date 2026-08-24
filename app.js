/* ===== Reset y variables ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Poppins', sans-serif;
  background: var(--bg);
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  transition: background 0.5s ease, color 0.3s ease;
}

:root {
  --bg: #f0f4f8;
  --bg-gradient: linear-gradient(145deg, #f0f4f8 0%, #e2e8f0 100%);
  --card-bg: rgba(255, 255, 255, 0.7);
  --card-border: rgba(255, 255, 255, 0.35);
  --text: #0b1a2e;
  --text-secondary: #4a5a72;
  --primary: #e63946;
  --primary-dark: #b71c1c;
  --primary-glow: rgba(230, 57, 70, 0.2);
  --secondary: #2d7d9a;
  --success: #22c55e;
  --shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  --radius: 28px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --glass-blur: blur(16px);
}

[data-theme="dark"] {
  --bg: #0b1424;
  --bg-gradient: linear-gradient(145deg, #0b1424 0%, #19233a 100%);
  --card-bg: rgba(26, 35, 53, 0.75);
  --card-border: rgba(255, 255, 255, 0.06);
  --text: #eef2f7;
  --text-secondary: #94a3b8;
  --shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

/* ===== Contenedor principal ===== */
.app-wrapper {
  width: 100%;
  max-width: 460px;
  background: var(--bg-gradient);
  border-radius: var(--radius);
  padding: 6px;
  box-shadow: var(--shadow);
  transition: background 0.5s ease;
}

.app-container {
  background: var(--card-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: calc(var(--radius) - 4px);
  padding: 24px 20px 28px;
  border: 1px solid var(--card-border);
  transition: background var(--transition), border var(--transition);
}

/* ===== Header ===== */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ecg-icon svg {
  width: 60px;
  height: 24px;
}

.app-header h1 {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.app-header h1 span {
  color: var(--primary);
  font-weight: 300;
}

.theme-toggle {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  font-size: 1.2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 40px;
  transition: all var(--transition);
}

.theme-toggle:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.subtitle {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 22px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* ===== Selector de tipo ===== */
.type-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.type-card {
  flex: 1;
  background: var(--card-bg);
  backdrop-filter: blur(6px);
  border: 2px solid var(--card-border);
  border-radius: 18px;
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all var(--transition);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.85rem;
}

.type-card i {
  font-size: 2rem;
  color: var(--text-secondary);
  transition: all var(--transition);
}

.type-card.active {
  border-color: var(--primary);
  background: rgba(230, 57, 70, 0.06);
  color: var(--primary);
  box-shadow: 0 4px 20px var(--primary-glow);
  transform: translateY(-3px);
}

.type-card.active i {
  color: var(--primary);
}

.type-card:hover:not(.active) {
  border-color: var(--secondary);
  transform: translateY(-2px);
}

/* ===== Status indicator ===== */
.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 16px;
  padding: 6px 12px;
  background: var(--card-bg);
  border-radius: 40px;
  border: 1px solid var(--card-border);
  backdrop-filter: blur(4px);
}

.status-indicator i {
  font-size: 0.6rem;
}

/* ===== Progreso circular + barra ===== */
.progress-area {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}

.progress-circle {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.progress-circle svg {
  transform: rotate(-90deg);
}

.progress-circle circle {
  transition: stroke-dashoffset 0.6s ease;
}

.progress-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text);
}

.progress-text {
  flex: 1;
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* ===== Tarjeta de paso ===== */
.step-card {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 22px 18px;
  margin: 6px 0 18px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.02);
  transition: all var(--transition);
  border-left: 6px solid var(--primary);
}

.step-number {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--primary);
  background: rgba(230, 57, 70, 0.08);
  display: inline-block;
  padding: 2px 14px;
  border-radius: 40px;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.step-text {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.6;
  color: var(--text);
  min-height: 56px;
  transition: opacity 0.2s ease;
}

.step-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.voice-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.3rem;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 40px;
  transition: all var(--transition);
}

.voice-btn:hover {
  background: rgba(230, 57, 70, 0.08);
  transform: scale(1.05);
}

.voice-btn.speaking {
  color: var(--success);
  animation: pulse-voice 0.8s infinite;
}

@keyframes pulse-voice {
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.6; transform: scale(1); }
}

/* ===== Controles ===== */
.controls {
  display: flex;
  gap: 12px;
  margin: 10px 0 16px;
}

.btn {
  flex: 1;
  padding: 14px 12px;
  border: none;
  border-radius: 60px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  box-shadow: 0 8px 30px var(--primary-glow);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px var(--primary-glow);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-outline {
  background: transparent;
  color: var(--text);
  border: 2px solid var(--card-border);
}

.btn-outline:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(230, 57, 70, 0.04);
}

.btn-outline:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ===== Metrónomo ===== */
.metronome-box {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 16px;
  margin: 10px 0 16px;
  text-align: center;
  transition: all var(--transition);
}

.metro-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.metro-header i {
  color: var(--primary);
  font-size: 1.2rem;
}

.metro-visual {
  width: 72px;
  height: 72px;
  margin: 8px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-ring {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--primary), var(--primary-dark));
  border-radius: 50%;
  box-shadow: 0 0 0 0 var(--primary-glow);
  transition: transform 0.1s, box-shadow 0.3s;
}

.pulse-ring.beating {
  animation: beat-glow 0.5s infinite alternate;
}

@keyframes beat-glow {
  0% { transform: scale(0.9); box-shadow: 0 0 0 0 var(--primary-glow); }
  100% { transform: scale(1.15); box-shadow: 0 0 30px 12px var(--primary-glow); }
}

.metro-controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 12px;
}

.metro-btn {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 6px 20px;
  border-radius: 40px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  transition: all var(--transition);
}

.metro-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.metro-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ===== Botón emergencia ===== */
.btn-emergency {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  padding: 16px 20px;
  border-radius: 60px;
  text-decoration: none;
  font-weight: 700;
  margin: 10px 0 8px;
  animation: emergencyPulse 2s infinite;
  transition: all var(--transition);
  border: none;
}

.btn-emergency:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(185, 28, 28, 0.4);
}

@keyframes emergencyPulse {
  0% { box-shadow: 0 0 0 0 rgba(185, 28, 28, 0.25); }
  70% { box-shadow: 0 0 0 16px rgba(185, 28, 28, 0); }
  100% { box-shadow: 0 0 0 0 rgba(185, 28, 28, 0); }
}

/* ===== Toast / Notificaciones internas ===== */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text);
  color: var(--bg);
  padding: 12px 24px;
  border-radius: 60px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  z-index: 999;
  max-width: 90%;
  text-align: center;
  transition: opacity 0.3s;
}

.toast.success {
  background: var(--success);
  color: white;
}

.toast.error {
  background: var(--primary);
  color: white;
}

/* ===== Disclaimer ===== */
.disclaimer {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 16px;
  border-top: 1px solid var(--card-border);
  padding-top: 14px;
  line-height: 1.6;
}

.disclaimer i {
  margin-right: 6px;
  color: var(--primary);
}

/* ===== Responsive ===== */
@media (max-width: 440px) {
  .app-container { padding: 18px 14px 22px; }
  .step-text { font-size: 1rem; }
  .controls { flex-direction: column; }
  .btn { padding: 14px; }
  .type-card { padding: 12px 0; }
  .type-card i { font-size: 1.6rem; }
  .progress-area { gap: 12px; }
                                 }
