export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#161616', card: '#212121', card2: '#2a2a2a', line: '#333',
        mint: '#22d081', plum: '#2a0a3d', ok: '#1b7f3a', mute: '#9a9a9a'
      },
      fontFamily: { sans: ['Poppins', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'] }
    }
  },
  plugins: []
}
