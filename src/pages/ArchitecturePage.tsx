import { 
  Server, Database, Monitor, Cpu, 
  GitBranch, Layers, Shield, Zap,
  ArrowRight, FileCode, Box
} from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800">Архитектура системы «ЭкоЛоток»</h1>
          <p className="text-xs text-gray-500">Техническая документация MVP</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Схема архитектуры */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-green-500" />
            Общая архитектура
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Киоск */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 text-center">
              <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-800 text-sm">Киоск (Frontend)</p>
              <p className="text-xs text-blue-600 mt-1">React / Touch UI</p>
              <p className="text-xs text-gray-500 mt-2">Сенсорный экран автомата</p>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-400 mx-auto hidden md:block" />

            {/* API */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-4 text-center">
              <Server className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-800 text-sm">Backend (FastAPI)</p>
              <p className="text-xs text-green-600 mt-1">REST API / Python</p>
              <p className="text-xs text-gray-500 mt-2">Валидация, бизнес-логика</p>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-400 mx-auto hidden md:block" />

            {/* БД */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-4 text-center">
              <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-purple-800 text-sm">PostgreSQL</p>
              <p className="text-xs text-purple-600 mt-1">SQLAlchemy + Alembic</p>
              <p className="text-xs text-gray-500 mt-2">Хранение данных</p>
            </div>
          </div>

          {/* Hardware Mock */}
          <div className="mt-4 flex items-center justify-center">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-4 text-center max-w-xs">
              <Cpu className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="font-semibold text-amber-800 text-sm">Hardware Mock Service</p>
              <p className="text-xs text-amber-600 mt-1">Датчики веса / Пресс</p>
              <p className="text-xs text-gray-500 mt-2">Имитация работы «железа»</p>
            </div>
          </div>
        </section>

        {/* Схема БД */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-green-500" />
            Схема базы данных (SQLAlchemy модели)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Machine */}
            <div className="border-2 border-blue-200 rounded-xl overflow-hidden">
              <div className="bg-blue-50 px-4 py-2 border-b border-blue-200">
                <p className="font-bold text-blue-800 text-sm">Machine</p>
                <p className="text-xs text-blue-600">Автомат / Фандомат</p>
              </div>
              <div className="p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">id</span>
                  <span className="text-gray-400 ml-auto">PK</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">location</span>
                  <span className="text-gray-400 ml-auto">str</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">status</span>
                  <span className="text-gray-400 ml-auto">enum</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">current_fill_level</span>
                  <span className="text-gray-400 ml-auto">int</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div className="border-2 border-green-200 rounded-xl overflow-hidden">
              <div className="bg-green-50 px-4 py-2 border-b border-green-200">
                <p className="font-bold text-green-800 text-sm">Product</p>
                <p className="text-xs text-green-600">Тип упаковки</p>
              </div>
              <div className="p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">id</span>
                  <span className="text-gray-400 ml-auto">PK</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">barcode</span>
                  <span className="text-gray-400 ml-auto">str</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">brand</span>
                  <span className="text-gray-400 ml-auto">str</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">material_type</span>
                  <span className="text-gray-400 ml-auto">enum</span>
                </div>
              </div>
            </div>

            {/* Transaction */}
            <div className="border-2 border-purple-200 rounded-xl overflow-hidden">
              <div className="bg-purple-50 px-4 py-2 border-b border-purple-200">
                <p className="font-bold text-purple-800 text-sm">Transaction</p>
                <p className="text-xs text-purple-600">Транзакция приёма</p>
              </div>
              <div className="p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">id</span>
                  <span className="text-gray-400 ml-auto">PK</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
                  <span className="font-mono text-gray-700">machine_id</span>
                  <span className="text-gray-400 ml-auto">FK</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">barcode</span>
                  <span className="text-gray-400 ml-auto">str</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">weight</span>
                  <span className="text-gray-400 ml-auto">int</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">status</span>
                  <span className="text-gray-400 ml-auto">enum</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
                  <span className="font-mono text-gray-700">promo_code_id</span>
                  <span className="text-gray-400 ml-auto">FK</span>
                </div>
              </div>
            </div>

            {/* PromoCode */}
            <div className="border-2 border-amber-200 rounded-xl overflow-hidden">
              <div className="bg-amber-50 px-4 py-2 border-b border-amber-200">
                <p className="font-bold text-amber-800 text-sm">PromoCode</p>
                <p className="text-xs text-amber-600">Промокод скидки</p>
              </div>
              <div className="p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">id</span>
                  <span className="text-gray-400 ml-auto">PK</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">code</span>
                  <span className="text-gray-400 ml-auto">str</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">discount_percent</span>
                  <span className="text-gray-400 ml-auto">int</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">is_used</span>
                  <span className="text-gray-400 ml-auto">bool</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="font-mono text-gray-700">created_at</span>
                  <span className="text-gray-400 ml-auto">datetime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-500" />
            API Endpoints (FastAPI)
          </h2>

          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-colors">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">POST</span>
                <code className="text-sm font-mono text-gray-800">/api/v1/scan</code>
              </div>
              <p className="text-sm text-gray-600 mt-2">Принимает штрихкод, выполняет валидацию в БД. Возвращает статус: найден/не найден.</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">barcode: string</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">→ product_info | error</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-colors">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">POST</span>
                <code className="text-sm font-mono text-gray-800">/api/v1/confirm-accept</code>
              </div>
              <p className="text-sm text-gray-600 mt-2">Получает данные от датчиков веса, создаёт транзакцию, генерирует промокод.</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">barcode + weight</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">→ transaction + promo_code</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-colors">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">GET</span>
                <code className="text-sm font-mono text-gray-800">/api/v1/admin/stats</code>
              </div>
              <p className="text-sm text-gray-600 mt-2">Возвращает статистику для дашборда: кол-во транзакций, промокодов, статус автоматов.</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">→ stats_object</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-colors">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">GET</span>
                <code className="text-sm font-mono text-gray-800">/api/v1/machines</code>
              </div>
              <p className="text-sm text-gray-600 mt-2">Список всех автоматов с их статусами и уровнем заполнения.</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">→ Machine[]</span>
              </div>
            </div>
          </div>
        </section>

        {/* Структура проекта */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-green-500" />
            Структура проекта
          </h2>

          <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-gray-300 overflow-x-auto">
            <pre>{`ecolotok/
├── docker-compose.yml          # Контейнеризация всего стека
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── main.py                 # FastAPI приложение
│   ├── models/
│   │   ├── machine.py          # Модель автомата
│   │   ├── product.py          # Модель продукта
│   │   ├── transaction.py      # Модель транзакции
│   │   └── promo_code.py       # Модель промокода
│   ├── routers/
│   │   ├── scan.py             # POST /api/v1/scan
│   │   ├── confirm.py          # POST /api/v1/confirm-accept
│   │   └── admin.py            # GET /api/v1/admin/stats
│   ├── services/
│   │   ├── hardware_mock.py    # Mock датчиков веса
│   │   ├── promo_generator.py  # Генерация промокодов
│   │   └── validator.py        # Валидация штрихкодов
│   ├── database/
│   │   ├── config.py           # Настройки подключения
│   │   └── migrations/         # Alembic миграции
│   └── schemas/
│       └── pydantic_models.py  # Pydantic схемы
├── kiosk-frontend/
│   ├── index.html              # Интерфейс киоска
│   ├── style.css
│   └── app.js                  # Логика сканирования
├── admin-dashboard/
│   └── ...                     # React-приложение дашборда
└── tests/
    ├── test_scan.py
    └── test_confirm.py`}</pre>
          </div>
        </section>

        {/* Docker Compose */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Box className="w-5 h-5 text-green-500" />
            Docker Compose конфигурация
          </h2>

          <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-gray-300 overflow-x-auto">
            <pre>{`version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://ecolotok:secret@db:5432/ecolotok
    depends_on:
      - db
    volumes:
      - ./backend:/app

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ecolotok
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: ecolotok
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - db

volumes:
  pgdata`}</pre>
          </div>
        </section>

        {/* Бизнес-процесс */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-green-500" />
            Бизнес-процесс работы фандомата
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-700">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Сканирование</p>
                <p className="text-sm text-gray-500">Пользователь подносит штрихкод яичного лотка к сканеру киоска</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-green-700">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Валидация</p>
                <p className="text-sm text-gray-500">Backend проверяет штрихкод в базе данных продуктов</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-amber-700">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Аппаратная проверка</p>
                <p className="text-sm text-gray-500">Датчики измеряют вес и габариты, пресс фиксирует приём</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-purple-700">4</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Транзакция</p>
                <p className="text-sm text-gray-500">Создаётся запись о транзакции, обновляется уровень заполнения</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-pink-700">5</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Промокод</p>
                <p className="text-sm text-gray-500">Генерируется уникальный промокод на скидку 5% для партнёрских магазинов</p>
              </div>
            </div>
          </div>
        </section>

        {/* Безопасность */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Обработка ошибок и безопасность
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 text-sm mb-2">🛡️ Валидация входных данных</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Pydantic-модели для всех запросов</li>
                <li>• Проверка формата штрихкода (13 цифр EAN)</li>
                <li>• Rate limiting на API endpoints</li>
                <li>• Валидация диапазона веса</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 text-sm mb-2">⚠️ Обработка ошибок</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Штрихкод не найден → понятное сообщение</li>
                <li>• Вес вне диапазона → отклонение транзакции</li>
                <li>• Сбой датчика → повторная попытка</li>
                <li>• DB недоступна → graceful degradation</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
