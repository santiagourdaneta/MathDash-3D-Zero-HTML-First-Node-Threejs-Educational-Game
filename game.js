// Al no usar 'import', usamos la variable global THREE
let scene, camera, renderer, player;
let level = 1;
let timeLeft = 10;
let currentAnswer = null;
let isPaused = false;
let gameClock;

function init() {
  // 1. Escena y Cámara
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 2. Iluminación
  const light = new THREE.PointLight(0x00ff00, 100, 50);
  light.position.set(0, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // 3. Personaje (Cubo)
  player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x003300 }),
  );
  player.position.y = 0.5;
  scene.add(player);

  // 4. Suelo (Grid para dar sensación de 3D)
  const grid = new THREE.GridHelper(200, 100, 0x00ff00, 0x222222);
  scene.add(grid);

  camera.position.set(0, 3, 6);
  camera.lookAt(player.position);

  setupLogic();
  animate();
}

function setupLogic() {
  const input = document.getElementById("answer-input");

  // Validación contra XSS y caracteres no deseados
  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9\-]/g, "");

    // Verificación instantánea
    if (parseInt(e.target.value) === currentAnswer) {
      processWin();
    }
  });

  startLevel();
}

function startLevel() {
  if (level > 10) {
    alert("¡HAS GANADO EL JUEGO!");
    location.reload();
    return;
  }

  isPaused = false;
  timeLeft = 11 - level; // Nivel 1 = 10s, Nivel 2 = 9s...
  generateMath();

  if (gameClock) clearInterval(gameClock);
  gameClock = setInterval(updateTimer, 100);
}

function generateMath() {
  const ops = ["+", "-", "*", "/"];
  // Solo sumas y restas niveles 1-3, luego introducimos mult y div
  let maxOp = level > 6 ? 4 : level > 3 ? 3 : 2;
  const op = ops[Math.floor(Math.random() * maxOp)];

  let a = Math.floor(Math.random() * (10 + level));
  let b = Math.floor(Math.random() * (5 + level)) + 1;

  if (op === "/") {
    a = a * b;
  } // Asegurar entero

  const questionStr = `${a} ${op} ${b}`;
  // Usamos una función de cálculo manual en vez de eval() por seguridad
  currentAnswer = calculateSafe(a, b, op);

  document.getElementById("question").textContent =
    `Nivel ${level}: ¿${questionStr}?`;
  document.getElementById("level-display").textContent = `Nivel: ${level}`;
}

function calculateSafe(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return a / b;
}

function updateTimer() {
  if (isPaused) return;

  timeLeft -= 0.1;
  const timerEl = document.getElementById("timer-display");
  timerEl.textContent = `Tiempo: ${Math.max(0, timeLeft).toFixed(1)}s`;

  if (timeLeft <= 0) {
    isPaused = true;
    alert(`¡TIEMPO AGOTADO! Te quedaste en el nivel ${level}`);
    location.reload();
  }
}

function processWin() {
  isPaused = true;
  document.getElementById("feedback").textContent = "¡CORRECTO!";
  document.getElementById("answer-input").value = "";

  // Animación de cámara y jugador
  const targetZ = player.position.z - 5;
  const animateMove = () => {
    if (player.position.z > targetZ) {
      player.position.z -= 0.2;
      camera.position.z -= 0.2;
      requestAnimationFrame(animateMove);
    } else {
      document.getElementById("feedback").textContent = "";
      level++;
      startLevel();
    }
  };
  animateMove();
}

function animate() {
  requestAnimationFrame(animate);
  player.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Iniciar al cargar
window.onload = init;
