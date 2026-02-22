function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            璀璨宝石
          </h1>
          <p className="text-xl text-gray-600">Splendor</p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              开发中...
            </h2>
            <p className="text-gray-600 mb-6">
              游戏正在开发中，敬请期待！
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 bg-gem-diamond rounded-lg border-2 border-gray-300">
                <div className="text-2xl mb-2">💎</div>
                <div className="text-sm font-medium">钻石</div>
              </div>
              <div className="p-4 bg-gem-sapphire rounded-lg text-white">
                <div className="text-2xl mb-2">💠</div>
                <div className="text-sm font-medium">蓝宝石</div>
              </div>
              <div className="p-4 bg-gem-emerald rounded-lg text-white">
                <div className="text-2xl mb-2">💚</div>
                <div className="text-sm font-medium">祖母绿</div>
              </div>
              <div className="p-4 bg-gem-ruby rounded-lg text-white">
                <div className="text-2xl mb-2">❤️</div>
                <div className="text-sm font-medium">红宝石</div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-600">
          <p>© 2026 feiziranyuyan | MIT License</p>
        </footer>
      </div>
    </div>
  )
}

export default App
