# Calculadora de Índices Corporales Web

Esta aplicación es una versión web moderna y responsiva del Proyecto M1 "Calculadora de Índices Corporales". Permite calcular múltiples métricas de salud en un solo lugar.

## Características

- **Diseño Moderno**: Interfaz con estilo "Glassmorphism" y modo oscuro.
- **Cálculo Unificado**: Ingresa tus datos una vez y obtén todos los índices automáticamente.
- **Métricas Incluidas**:
  - **IMC** (Índice de Masa Corporal) + Categoría (Norma, Sobrepeso, etc.)
  - **% Grasa Corporal** (Basado en la fórmula del proyecto)
  - **TMB** (Tasa Metabólica Basal - Fórmula de Mifflin-St Jeor simplificada del proyecto)
  - **TMB Activa** (Calorías diarias según nivel de actividad)
  - **Recomendación para Adelgazar** (Rango calórico para déficit saludable)

## Cómo Usar

1. Abre el archivo `index.html` en tu navegador web.
2. Ingresa tu Peso (kg), Altura (m), Edad y Género.
3. Selecciona tu nivel de actividad física semanal.
4. Presiona "Calcular".
5. Los resultados aparecerán instantáneamente en las tarjetas de la derecha.

## Tecnologías

- HTML5 Semántico
- CSS3 (Variables, Flexbox, Grid, Animaciones)
- JavaScript (ES6+ para la lógica de cálculo)

## Cómo Publicar en GitHub (Guía Paso a Paso)

Como no tienes Git instalado en la consola, la forma más fácil es usar la web:

1.  **Crea una Cuenta**: Ve a [github.com](https://github.com/) y regístrate si no tienes cuenta.
2.  **Nuevo Repositorio**:
    -   Haz clic en el botón **+** (arriba a la derecha) y selecciona **New repository**.
    -   Nombre: `calculadora-indices` (o el que gustes).
    -   Asegúrate de que sea **Public**.
    -   Haz clic en **Create repository**.
3.  **Subir Archivos**:
    -   En la pantalla siguiente, busca el enlace que dice **uploading an existing file** (está en el recuadro "Quick setup").
    -   Arrastra todos los archivos de tu carpeta `IMC` (`index.html`, `style.css`, `script.js`) a esa ventana.
    -   Escribe un mensaje como "Versión inicial" y pulsa **Commit changes**.

### Activar la Web (GitHub Pages)

Para que cualquiera pueda usar la calculadora entrando a una dirección web:

1.  En tu repositorio, ve a la pestaña **Settings** (Configuración).
2.  En el menú de la izquierda, busca y haz clic en **Pages**.
3.  En "Source", selecciona **Deploy from a branch**.
4.  En "Branch", selecciona **main** y carpeta **/(root)**. Pulsa **Save**.
5.  Espera unos segundos (recarga la página) y aparecerá el link de tu web (ej: `https://usuario.github.io/calculadora-indices/`).

¡Listo! Comparte ese link con quien quieras.
