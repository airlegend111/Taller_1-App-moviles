# Taller 1 - App Móviles

## Descripción del Proyecto

Repositorio para el desarrollo de aplicaciones móviles como parte del Taller 1.

## Especificaciones del Repositorio

### Información General
- **Nombre del Proyecto**: taller_1-app-moviles
- **Versión**: 1.0.0
- **Tipo de Módulo**: CommonJS
- **Licencia**: ISC
- **Repositorio**: [GitHub - Taller_1-App-moviles](https://github.com/airlegend111/Taller_1-App-moviles)

## Configuraciones Técnicas

### Dependencias Principales
- **locomotive-scroll** (^5.0.1): Biblioteca para animaciones y scroll suave

### Dependencias de Desarrollo
- **Sass** (^1.97.3): Preprocesador CSS para estilos avanzados
- **PostCSS** (^8.5.6): Herramienta para transformar CSS
- **Autoprefixer** (^10.4.23): Plugin para agregar prefijos de navegadores automáticamente

## Scripts Disponibles

### Desarrollo
```bash
npm run sass:watch
```
Monitorea cambios en archivos SCSS y compila automáticamente a CSS en tiempo real.

### Build
```bash
npm run sass:build
```
Compila todos los archivos SCSS a un único archivo CSS optimizado.

### Test
```bash
npm test
```
Ejecuta pruebas (actualmente no configuradas).

## Estructura del Proyecto

```
proyecto/
├── package.json              # Configuración del proyecto
├── package-lock.json         # Versiones exactas de dependencias
├── .gitignore               # Archivos ignorados por git
├── node_modules/            # Dependencias instaladas
└── src/
    ├── index.html           # Archivo HTML principal
    ├── main.js              # Archivo JavaScript principal
    ├── styles.css           # Estilos compilados
    ├── assets/              # Recursos estáticos
    │   ├── images/          # Imágenes del proyecto
    │   └── videos/          # Videos del proyecto
    ├── js/
    │   └── main.js          # Lógica principal de JavaScript
    └── scss/                # Estilos SCSS
        ├── _header.scss     # Estilos del header
        ├── _mixins.scss     # Mixins reutilizables
        ├── _reset.scss      # Reset/normalización de estilos
        ├── _variables.scss  # Variables de Sass
        └── styles.scss      # Archivo principal de estilos
```

## Configuración de Estilos

### Arquitectura SCSS
El proyecto utiliza una arquitectura modular SCSS con los siguientes módulos:

- **_variables.scss**: Define colores, tamaños, fuentes y otras variables globales
- **_mixins.scss**: Contiene mixins reutilizables para media queries, flexbox, etc.
- **_reset.scss**: Normalización de estilos por defecto del navegador
- **_header.scss**: Estilos específicos del header/navegación
- **styles.scss**: Archivo principal que importa todos los módulos

### Compilación CSS
Los archivos SCSS se compilan automáticamente a `src/styles.css` sin mapas de origen.

## Requisitos Previos

- **Node.js** (versión recomendada: 14+)
- **npm** (incluido con Node.js)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/airlegend111/Taller_1-App-moviles.git
cd proyecto
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el desarrollo:
```bash
npm run sass:watch
```

## Flujo de Trabajo

1. **Editar estilos**: Modificar archivos `.scss` en `src/scss/`
2. **Compilación automática**: El script `sass:watch` compila los cambios automáticamente
3. **Verificar resultados**: Abrir `src/index.html` en el navegador para ver los cambios

## Navegadores Soportados

Gracias a Autoprefixer, el proyecto soporta navegadores modernos con prefijos automáticos para:
- Chrome (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Edge (últimas versiones)

## Recursos y Animaciones

El proyecto incluye **Locomotive Scroll** para:
- Scroll suave y fluido
- Animaciones basadas en scroll
- Mejora de la experiencia de usuario en móviles

## Notas Importantes

- Los archivos compilados (CSS) no incluyen source maps
- El proyecto está configurado con `.gitignore` para no versionar `node_modules/`
- Los cambios en SCSS se compilan automáticamente durante el desarrollo

## Contacto y Soporte

Para reportar problemas o sugerencias, visita:
[Issues - Taller_1-App-moviles](https://github.com/airlegend111/Taller_1-App-moviles/issues)

---

**Última actualización**: 24 de enero de 2026
