import { useMemo } from 'react';
import { 
  BarChart3, Package, QrCode, TrendingUp, 
  AlertTriangle, CheckCircle2, MapPin, 
  Activity, Recycle, Clock
} from 'lucide-react';
import { getAdminStats, mockProducts } from '../store/mockData';

// ====== Компонент SVG-графика (замена Recharts) ======

interface DailyStat {
  date: string;
  count: number;
  weight: number;
}

function SimpleBarChart({ data }: { data: DailyStat[] }) {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  return (
    <div className="w-full h-64 relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-xs text-gray-400">
        <span>{maxCount}</span>
        <span>{Math.round(maxCount / 2)}</span>
        <span>0</span>
      </div>
      
      {/* Chart area */}
      <div className="ml-10 h-full pb-8 flex items-end gap-1">
        {data.map((item, i) => {
          const heightPercent = (item.count / maxCount) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded absolute -top-8 pointer-events-none z-10">
                {item.count} шт.
              </div>
              {/* Bar */}
              <div 
                className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-md transition-all hover:from-green-600 hover:to-emerald-500"
                style={{ height: `${heightPercent}%`, minHeight: item.count > 0 ? '4px' : '0px' }}
              />
              {/* Label */}
              <span className="text-xs text-gray-500 mt-1">{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimplePieChart({ data, colors }: { data: { name: string; value: number }[]; colors: string[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-400 text-sm">Нет данных</p>
      </div>
    );
  }
  let cumulative = 0;
  
  const segments = data.map((item, i) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += item.value;
    const endAngle = (cumulative / total) * 360;
    
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
    
    return { path, color: colors[i], name: item.name, value: item.value };
  });
  
  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-48 h-48">
        {segments.map((seg, i) => (
          <path 
            key={i} 
            d={seg.path} 
            fill={seg.color} 
            className="hover:opacity-80 transition-opacity cursor-pointer"
          />
        ))}
        {/* Inner circle for donut effect */}
        <circle cx="50" cy="50" r="22" fill="white" />
      </svg>
    </div>
  );
}

function SimpleLineChart({ data }: { data: DailyStat[] }) {
  const maxWeight = Math.max(...data.map(d => d.weight), 1);
  const divisor = Math.max(data.length - 1, 1);
  const points = data.map((item, i) => {
    const x = data.length === 1 ? 50 : (i / divisor) * 100;
    const y = 100 - (item.weight / maxWeight) * 80 - 10;
    return { x, y, ...item };
  });
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  return (
    <div className="w-full h-48 relative">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="#f0f0f0" strokeWidth="0.3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#f0f0f0" strokeWidth="0.3" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#f0f0f0" strokeWidth="0.3" />
        
        {/* Line */}
        <path d={pathD} fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#10b981" className="hover:r-2 transition-all" />
        ))}
      </svg>
      {/* X-axis labels */}
      <div className="flex justify-between mt-1 px-1">
        {data.map((item, i) => (
          <span key={i} className="text-xs text-gray-400">{item.date}</span>
        ))}
      </div>
    </div>
  );
}

// ====== Основная страница ======

export default function AdminPage() {
  const stats = useMemo(() => getAdminStats(), []);

  const pieData = [
    { name: 'Успешные', value: stats.successfulTransactions },
    { name: 'Отклонённые', value: stats.rejectedTransactions },
  ];

  const pieColors = ['#10b981', '#ef4444'];

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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
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
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Принято упаковок</p>
                <p className="text-3xl font-bold text-gray-800">{stats.successfulTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.totalTransactions > 0 ? ((stats.successfulTransactions / stats.totalTransactions) * 100).toFixed(0) : 0}% успешных
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
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
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
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
          </div>
        </div>

        {/* Графики */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Столбчатая диаграмма */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Транзакции за последние дни
            </h3>
            <SimpleBarChart data={stats.dailyStats} />
          </div>

          {/* Pie-диаграмма */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              Статус транзакций
            </h3>
            <SimplePieChart data={pieData} colors={pieColors} />
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                  <span className="text-gray-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Статус автоматов */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
        </div>

        {/* Последние транзакции */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full inline-flex items-center gap-1">
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
        </div>

        {/* Линейный график по весу */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-green-500" />
            Динамика веса принятого сырья
          </h3>
          <SimpleLineChart data={stats.dailyStats} />
          <div className="flex gap-6 mt-4 justify-center">
            {materialStats.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: item.fill }} />
                <span className="text-sm text-gray-600">{item.name}: {item.value} позиций в базе</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
