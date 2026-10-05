export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#111215',
        card: '#1e1f24',
        card2: '#282a30',
        line: '#2c2e36',
        mute: '#9aa0a6',
        blue: {
          gpay: '#0b57d0',
          light: '#8ab4f8',
          pill: '#1a73e8'
        },
        mint: '#24a148',
        plum: '#2a0a3d',
        ok: '#1b7f3a'
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
}
