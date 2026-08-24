// ===== DATOS DE LA GUÍA =====
const PASOS = {
  adulto: [
    "1. Verificá la escena: asegurate de que no haya peligros.",
    "2. Comprobá la conciencia: sacudí suavemente y preguntá '¿Estás bien?'.",
    "3. Si no responde, llamá al 107 o pedí ayuda.",
    "4. Abrí la vía aérea: incliná la cabeza hacia atrás y levantá el mentón.",
    "5. Verificá la respiración: mirá, escuchá y sentí durante 10 segundos.",
    "6. Si no respira, comenzá con 30 compresiones torácicas (5-6 cm de profundidad).",
    "7. Ritmo: 100-120 compresiones por minuto.",
    "8. Luego, 2 respiraciones de rescate (cada una de 1 segundo).",
    "9. Repetí ciclos de 30 compresiones y 2 ventilaciones.",
    "10. Continuá hasta que llegue la ayuda o la persona responda."
  ],
  nino: [
    "1. Verificá la escena: asegurate de que no haya peligros.",
    "2. Comprobá la conciencia: sacudí suavemente y preguntá '¿Estás bien?'.",
    "3. Si no responde, llamá al 107 o pedí ayuda.",
    "4. Abrí la vía aérea: incliná la cabeza y levantá el mentón (menos inclinación que en adultos).",
    "5. Verificá la respiración durante 10 segundos.",
    "6. Si no respira, realizá 30 compresiones con una o dos manos (4-5 cm).",
    "7. Ritmo: 100-120 compresiones por minuto.",
    "8. Luego, 2 respiraciones suaves (soplá con menos fuerza).",
    "9. Repetí ciclos de 30:2.",
    "10. Continuá hasta que llegue la ayuda o el niño responda."
  ],
  bebe: [
    "1. Verificá la escena: asegurate de que no haya peligros.",
    "2. Comprobá la conciencia: palmoteá suavemente la planta del pie.",
    "3. Si no responde, pedí ayuda y llamá al 107.",
    "4. Abrí la vía aérea: colocalo en posición neutral (no hiperextiendas).",
    "5. Verificá la respiración (mirá, escuchá y sentí) durante 10 segundos.",
    "6. Si no respira, realizá 30 compresiones con 2 dedos en el centro del pecho.",
    "7. Profundidad: 4 cm aproximadamente. Ritmo: 100-120/min.",
    "8. Luego, 2 respiraciones suaves (cubrí boca y nariz).",
    "9. Repetí ciclos de 30:2.",
    "10. Continuá hasta que llegue la ayuda o el bebé responda."
  ]
};

// ===== ESTADO =====
let tipoActual = 'adulto';
let pasoActual = 0;
let guiaIniciada = false;
let metroInterval = null;
let metroActivo = false;

// ===== DOM =====
const themeToggle = document.getElementById('themeToggle');
const typeCards = document.querySelectorAll('.type-card');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const stepText = document.getElementById('stepText');
const stepNumber = document.getElementById('stepNumber');
const progressFill = document.querySelector('.progress-fill');
const stepCounter = document.querySelector('.step-counter');
const stepPercent = document.querySelector('.step-percent');
const metronomeBox = document.getElementById('metronomeBox');
const metroStart = document.getElementById('metroStart');
const metroStop = document.getElementById('metroStop');
const pulseRing = document.getElementById('pulseRing');
const voiceBtn = document.getElementById('voiceBtn');

// ===== TEMAS =====
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// Cargar tema
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
themeToggle.addEventListener('click', toggleTheme);

// ===== SELECTOR DE TIPO (SIN CONFIRMACIÓN) =====
typeCards.forEach(card => {
  card.addEventListener('click', () => {
    const nuevoTipo = card.dataset.type;
    if (nuevoTipo === tipoActual) return;

    // Cambiar tipo sin preguntar
    tipoActual = nuevoTipo;
    typeCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Reiniciar guía silenciosamente
    if (guiaIniciada) {
      reiniciarGuia();
    } else {
      pasoActual = 0;
      actualizarPaso();
      startBtn.disabled = false;
      nextBtn.disabled = true;
    }
    // Detener metrónomo
    detenerMetronomo();
  });
});

// ===== FUNCIONES DE GUÍA =====
function actualizarPaso() {
  const pasos = PASOS[tipoActual];
  const total = pasos.length;
  const idx = Math.min(pasoActual, total - 1);
  const texto = pasos[idx] || 'Completaste todos los pasos. ¡Bien hecho!';
  
  // Animación de fade (opcional)
  stepText.style.opacity = '0';
  setTimeout(() => {
    stepText.textContent = texto;
    stepText.style.opacity = '1';
  }, 200);
  
  stepNumber.textContent = String(idx + 1).padStart(2, '0');
  const progress = ((idx + 1) / total) * 100;
  progressFill.style.width = `${Math.min(progress, 100)}%`;
  stepCounter.textContent = `Paso ${idx + 1} de ${total}`;
  stepPercent.textContent = `${Math.round(Math.min(progress, 100))}%`;
  
  nextBtn.disabled = (idx + 1 >= total);
  if (idx + 1 >= total) {
    nextBtn.innerHTML = '<i class="fas fa-check"></i> Completado';
  } else {
    nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Siguiente';
  }
  
  if (guiaIniciada) {
    leerVoz(texto);
  }
}

function iniciarGuia() {
  if (guiaIniciada) return;
  guiaIniciada = true;
  pasoActual = 0;
  actualizarPaso();
  startBtn.disabled = true;
  startBtn.innerHTML = '<i class="fas fa-redo"></i> Reiniciar';
  nextBtn.disabled = false;
  metronomeBox.style.display = 'block';
  detenerMetronomo();
}

function reiniciarGuia() {
  guiaIniciada = false;
  pasoActual = 0;
  startBtn.disabled = false;
  startBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar Guía';
  nextBtn.disabled = true;
  metronomeBox.style.display = 'none';
  detenerMetronomo();
  actualizarPaso();
}

function siguientePaso() {
  const pasos = PASOS[tipoActual];
  if (pasoActual + 1 < pasos.length) {
    pasoActual++;
    actualizarPaso();
  } else {
    // Guía completada → reinicio automático
    alert('¡Completaste todos los pasos! 🎉');
    reiniciarGuia();
  }
}

// ===== VOZ NATURAL =====
function getVozNatural() {
  if (!window.speechSynthesis) return null;
  const voces = window.speechSynthesis.getVoices();
  const preferidas = voces.filter(v => 
    v.lang.startsWith('es') && 
    (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium'))
  );
  return preferidas.length ? preferidas[0] : voces.find(v => v.lang.startsWith('es')) || null;
}

function leerVoz(texto) {
  if (!window.speechSynthesis) {
    console.warn('Voz no soportada');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'es-AR';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voz = getVozNatural();
  if (voz) utterance.voice = voz;
  window.speechSynthesis.speak(utterance);
}

voiceBtn.addEventListener('click', () => {
  const texto = stepText.textContent;
  if (texto && guiaIniciada) {
    leerVoz(texto);
  } else {
    alert('Iniciá la guía primero.');
  }
});

// ===== METRÓNOMO =====
function iniciarMetronomo() {
  if (metroActivo) return;
  metroActivo = true;
  metroStart.disabled = true;
  metroStop.disabled = false;
  pulseRing.classList.add('beating');
  metroInterval = setInterval(() => {
    pulseRing.style.transform = 'scale(1.2)';
    setTimeout(() => pulseRing.style.transform = 'scale(1)', 100);
    reproducirTic();
  }, 500);
}

function detenerMetronomo() {
  metroActivo = false;
  clearInterval(metroInterval);
  metroInterval = null;
  metroStart.disabled = false;
  metroStop.disabled = true;
  pulseRing.classList.remove('beating');
  pulseRing.style.transform = 'scale(1)';
}

function reproducirTic() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = 1200;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) { /* silencio */ }
}

metroStart.addEventListener('click', iniciarMetronomo);
metroStop.addEventListener('click', detenerMetronomo);

// ===== EVENTOS PRINCIPALES =====
startBtn.addEventListener('click', () => {
  if (guiaIniciada) {
    reiniciarGuia();
  } else {
    iniciarGuia();
  }
});

nextBtn.addEventListener('click', siguientePaso);

// ===== INICIALIZACIÓN =====
if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
actualizarPaso();
