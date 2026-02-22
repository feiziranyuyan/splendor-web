/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gem: {
          diamond: '#E8F4F8',    // 钻石 - 白色
          sapphire: '#3B82F6',   // 蓝宝石 - 蓝色
          emerald: '#10B981',    // 祖母绿 - 绿色
          ruby: '#EF4444',       // 红宝石 - 红色
          onyx: '#1F2937',       // 黑玛瑙 - 黑色
          gold: '#F59E0B',       // 黄金 - 金色
        },
      },
      animation: {
        'card-flip': 'flip 0.6s ease-in-out',
        'gem-collect': 'collect 0.4s ease-out',
        'noble-arrive': 'arrive 0.8s ease-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        collect: {
          '0%': { transform: 'scale(1) translateY(0)', opacity: '1' },
          '100%': { transform: 'scale(0.5) translateY(-100px)', opacity: '0' },
        },
        arrive: {
          '0%': { transform: 'translateY(-100%) scale(0.5)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
