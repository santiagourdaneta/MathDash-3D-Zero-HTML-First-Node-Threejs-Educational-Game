# ⚡ MathDash 3D

**MathDash 3D** es un juego de plataformas y lógica matemática en tres dimensiones diseñado para ejecutarse directamente en el navegador sin necesidad de compiladores, servidores de aplicaciones o gestores de paquetes como npm/node.

## 🎮 El Desafío
Controlas a un ente geométrico en un vacío digital. Para avanzar, debes procesar ecuaciones aritméticas que aparecen en tu camino. Tienes **10 niveles** para demostrar tu agilidad mental:
* **Nivel 1:** 10 segundos de tiempo.
* **Nivel 10:** Solo 1 segundo para responder.
* **Dificultad progresiva:** A medida que avanzas, se integran multiplicaciones y divisiones.

## 🛠️ Tecnologías "Zero-Node"
Este proyecto utiliza un enfoque **HTML-First**:
* **Three.js (CDN):** Renderizado 3D de alto rendimiento.
* **Vanilla JavaScript:** Lógica de juego pura sin frameworks pesados.
* **CSS3:** Interfaz de usuario con estética de terminal hacker.

## 🔒 Seguridad y Validaciones
El código ha sido estructurado siguiendo principios de seguridad web:
1.  **Content Security Policy (CSP):** Bloqueo estricto de scripts inyectados (XSS).
2.  **Sanitización de Entradas:** Validación en tiempo real de caracteres no numéricos.
3.  **Sin `eval()`:** Los cálculos matemáticos se realizan mediante una lógica de procesamiento propia para evitar ejecuciones de código arbitrario.
4.  **Aislamiento:** No requiere backend, eliminando vectores de ataque como CSRF o Inyecciones SQL.

## 🚀 Instalación y Uso
Al ser un proyecto sin Node.js, la ejecución es instantánea:

1. Clona o descarga este repositorio.
2. Abre el archivo `index.html` en tu navegador. 

## 📜 Licencia
Este proyecto es de código abierto. ¡Siéntete libre de mejorarlo o añadir nuevos niveles de terror psicológico!