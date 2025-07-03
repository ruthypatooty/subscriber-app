/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // These paths are crucial for Tailwind to find your classes
    // Scan all files within the 'app' directory (for App Router)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Scan all files within the 'pages' directory (if you use Pages Router or mix)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // Scan all files within the 'components' directory (if you have a shared components folder)
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // If you have other specific directories where you use Tailwind classes, add them here.
    // For example, if your backend 'src' folder contains frontend components (less common but possible):
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // <<<--- Add this line
  ],
  // Optional: DaisyUI configuration (themes, dark mode, etc.)
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"], // Example themes
    darkTheme: "dark", // Default dark theme
    base: true, // Applies background color and foreground color for root element by default
    styled: true, // Adds daisyUI's base styles for all components
    utils: true, // Adds daisyUI's utility classes
    prefix: "", // Prefix for daisyUI classes (e.g., "du-btn" instead of "btn")
    logs: true, // Shows daisyUI logs in console (for debugging)
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}
