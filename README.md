# Taller_1-App-moviles

Repositorio con demos para un reto de JavaScript: ingreso de clave tipo keypad, menú con scroll en página única, animación con sonido y un campo de texto con contador en tiempo real.

## Contenido por carpeta

- `clave/`
	- Descripción: Demo de ingreso de clave usando un teclado numérico en pantalla (keypad) y soporte de teclado físico.
	- Archivos clave:
		- `index.html` — markup del input tipo password y teclado (botones).
		- `style.css` — estilos organizados y variables :root.
		- `script.js` — lógica para manejar clicks en las teclas (añadir dígitos, Borrar = backspace) y captura del teclado físico (0-9, Backspace).
	- Objetivo: practicar manejo de eventos, manipulación de input y usabilidad de teclado visual.

- `menu/`
	- Descripción: Menú de navegación en una sola página con scroll suave y detección de la sección activa.
	- Archivos clave:
		- `index.html` — topbar con enlaces hacia secciones (#home, #features, #security, #contact).
		- `style.css` — estilos del topbar y las secciones.
		- `script.js` — implementa smooth scroll (scrollIntoView) y resalta el enlace activo usando IntersectionObserver (con fallback por scroll).
	- Objetivo: practicar scroll programático y APIs modernas del navegador (IntersectionObserver).

- `anim/`
	- Descripción: Escena animada que usa GSAP para animaciones y Howler (o Web Audio) para sonido.
	- Archivos clave:
		- `index.html` — escena con imágenes posicionadas (nube, bici, sol, árbol, montañas) y controles (Iniciar/Detener/Mute).
		- `style.css` — estilos de escena y variables :root.
		- `script.js` — controla timelines de GSAP, parallax ligero y reproducción de sonidos (Howler si está disponible, Web Audio como fallback beep). Requiere interacción del usuario para reproducir audio en la mayoría de navegadores.
		- `Sonidos/` — carpeta con archivos de audio (ej. `bike-bell-173588.mp3`) usada por Howler.
	- Objetivo: aprender animación con GSAP y reproducción de audio con Howler/WebAudio.

- `texto/`
	- Descripción: Campo de texto con contador de caracteres en tiempo real.
	- Archivos clave:
		- `index.html` — textarea y zona donde se muestra la cuenta de caracteres.
		- `style.css` — estilos del panel y textarea.
		- `script.js` — actualiza el contador usando el evento `input` (sin límite impuesto).
	- Objetivo: práctica básica de DOM, eventos y actualización en tiempo real.

## Notas generales

- Rama: los cambios están preparados en la rama `reto` (por favor verifica con `git status` / `git branch` si trabajas desde otra máquina).
- Dependencias externas: las demos usan CDN para librerías (GSAP y Howler en `anim/index.html`) por comodidad; no es necesario instalar paquetes localmente para probar las páginas.
- Reproducción de audio: la mayoría de navegadores requieren una interacción del usuario (click) antes de permitir audio; use el botón "Iniciar animación & sonido" en `anim/index.html`.

## Ejecutar localmente

- Opción rápida: abrir los archivos HTML directamente en el navegador (file://). Algunas funciones de audio pueden requerir un servidor local.
- Servidor simple (PowerShell):

```powershell
# En el directorio del proyecto
# Opción 1: usar Python 3 (si está instalado)
python -m http.server 8000
# Opción 2: si tienes Node.js, puedes usar http-server (requiere instalación)
# npx http-server -p 8000
```

Después abre http://localhost:8000/ y navega a la carpeta que quieras ver (por ejemplo `/anim/`).

## Sugerencias y próximos pasos

- Integrar `clave` y `menu`: actualmente están separados; se puede implementar un flujo donde el menú queda oculto o bloqueado hasta que se ingrese la clave correcta.
- Añadir tests mínimos o una página de demostración que enlace a cada demo.
- Añadir un `README` más detallado por carpeta si se desea documentación técnica (APIs usadas, reasoning, pruebas).

## Contacto y créditos

- Creado como parte de un ejercicio/taller. Librerías usadas: GSAP (GreenSock), Howler.js. Las imágenes usadas son iconos de ejemplo desde iconarchive/CDNs.

---
README generado automáticamente por el asistente para describir el contenido del reto.