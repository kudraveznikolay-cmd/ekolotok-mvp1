import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Package, QrCode, TrendingUp, 
  AlertTriangle, CheckCircle2, MapPin, 
  Activity, Recycle, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';
import { getAdminStats, mockProducts } from '../store/mockData';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];

export default function AdminPage() {
  const stats = useMemo(() => getAdminStats(), []);

  const pieData = [
    { name: 'Успешные', value: stats.successfulTransactions },
    { name: 'Отклонённые', value: stats.rejectedTransactions },
  ];

  const materialStats = useMemo(() => {
    const cardboard = mockProducts.filter(p => p.materialType === 'cardboard').length;
    const plastic = mockProducts.filter(p => p.materialType === 'plastic').length;
    return [
      { name: 'Картон', value: cardboard, fill: '#10b981' },
      { name: 'Пластик', value: plastic, fill: '#f59e0b' },
    ];
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ЭкоЛоток — Админ-панель</h1>
              <p className="text-xs text-gray-500">Мониторинг системы фандоматов</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              {stats.machines.filter(m => m.status === 'online').length} из {stats.machines.length} онлайн
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* KPI Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Всего транзакций</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% за неделю
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Принято упаковки</p>
                <p className="text-3xl font-bold text-gray-800">{stats.successfulTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {((stats.successfulTransactions / stats.totalTransactions) * 100).toFixed(0)}% успешных
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Промокодов выдано</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalPromoCodes}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.usedPromoCodes} использовано
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Общий вес сырья</p>
                <p className="text-3xl font-bold text-gray-800">{(stats.totalWeight / 1000).toFixed(1)}кг</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Recycle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Экология: +{stats.successfulTransactions} лотков спасено
            </p>
          </motion.div>
        </div>

        {/* Графики */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Столбчатая диаграмма транзакций */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Транзакции за последние дни
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  formatter={(value: number) => [`${value} шт.`, 'Транзакции']}
                />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie-диаграмма */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              Статус транзакций
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Статус автоматов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            Статус автоматов
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.machines.map((machine) => (
              <div
                key={machine.id}
                className="border border-gray-100 rounded-lg p-4 hover:border-green-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{machine.location}</p>
                    <p className="text-xs text-gray-500 mt-1">ID: {machine.id}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    machine.status === 'online' 
                      ? 'bg-green-100 text-green-700' 
                      : machine.status === 'offline'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {machine.status === 'online' ? '● Онлайн' : machine.status === 'offline' ? '● Офлайн' : '● ТО'}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Заполнение</span>
                    <span>{machine.currentFillLevel}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        machine.currentFillLevel > 80 ? 'bg-red-500' :
                        machine.currentFillLevel > 50 ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${machine.currentFillLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Последние транзакции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-500" />
            Последние транзакции
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 text-gray-500 font-medium">Время</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-medium">Штрихкод</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-medium">Автомат</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-medium">Вес</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-medium">Статус</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-medium">Промокод</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentTransactions.map((tx) => {
                  const machine = stats.machines.find(m => m.id === tx.machineId);
                  const product = mockProducts.find(p => p.barcode === tx.barcode);
                  return (
                    <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-2 text-gray-600">
                        {tx.timestamp.toLocaleString('ru-RU', { 
                          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' 
                        })}
                      </td>
                      <td className="py-3 px-2">
                        <span className="font-mono text-xs">{tx.barcode}</span>
                        {product && <span className="ml-2 text-xs text-gray-400">({product.brand})</span>}
                      </td>
                      <td className="py-3 px-2 text-gray-600 text-xs">
                        {machine?.location.split(',')[0] || tx.machineId}
                      </td>
                      <td className="py-3 px-2 text-gray-600">
                        {tx.weight > 0 ? `${tx.weight}г` : '—'}
                      </td>
                      <td className="py-3 px-2">
                        {tx.status === 'success' ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            Успех
                          </span>
                        ) : tx.status === 'rejected' ? (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3" /> Отказ
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                            Ожидание
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {tx.promoCodeId ? (
                          <span className="font-mono text-xs text-green-600">
                            {tx.promoCodeId}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Материалы */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-green-500" />
            Распределение по материалам
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stats.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value: number) => [`${value}г`, 'Вес']}
              />
              <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-4 justify-center">
            {materialStats.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: item.fill }} />
                <span className="text-sm text-gray-600">{item.name}: {item.value} позиций в базе</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
