import { useState, useCallback, useEffect } from 'react';
import { QrCode, CheckCircle, XCircle, Loader2, RotateCcw, Package } from 'lucide-react';
import { processScan, mockProducts } from '../store/mockData';

type ScanStatus = 'idle' | 'scanning' | 'checking' | 'success' | 'error';

export default function KioskPage() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [barcode, setBarcode] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [productName, setProductName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  // Анимация появления
  useEffect(() => {
    setIsVisible(true);
  }, [status]);

  const handleScan = useCallback(async (inputBarcode?: string) => {
    const codeToScan = inputBarcode || barcode;
    if (!codeToScan.trim()) return;

    setIsVisible(false);
    setTimeout(() => {
      setStatus('scanning');
      setResultMessage('Сканирование штрихкода...');
      setPromoCode('');
      setProductName('');
      setIsVisible(true);
    }, 150);

    try {
      const result = await processScan(codeToScan.trim());

      setIsVisible(false);
      setTimeout(() => {
        if (result.success) {
          setStatus('success');
          setResultMessage(result.message);
          setPromoCode(result.promoCode || '');
          setProductName(result.product?.brand || '');
        } else {
          setStatus('error');
          setResultMessage(result.message);
        }
        setIsVisible(true);
      }, 150);
    } catch {
      setIsVisible(false);
      setTimeout(() => {
        setStatus('error');
        setResultMessage('⚠️ Ошибка соединения с сервером. Попробуйте позже.');
        setIsVisible(true);
      }, 150);
    }
  }, [barcode]);

  const handleReset = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStatus('idle');
      setBarcode('');
      setResultMessage('');
      setPromoCode('');
      setProductName('');
      setIsVisible(true);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col">
      {/* Заголовок киоска */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ЭкоЛоток</h1>
              <p className="text-sm text-gray-500">Фандомат для яичной упаковки</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Терминал #001</p>
            <p className="text-xs text-green-600 font-medium">● Онлайн</p>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {/* Экран ожидания */}
            {status === 'idle' && (
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                  <QrCode className="w-12 h-12 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Сдайте яичную упаковку
                </h2>
                <p className="text-gray-500 mb-6">
                  Поднесите штрихкод к сканеру или введите его вручную
                </p>

                {/* Ручной ввод штрихкода */}
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                      placeholder="Введите штрихкод (напр. 4810000123456)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <button
                    onClick={() => handleScan()}
                    disabled={!barcode.trim()}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    Принять упаковку
                  </button>
                </div>

                {/* Подсказки с тестовыми штрихкодами */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-3">Тестовые штрихкоды:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {mockProducts.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setBarcode(p.barcode);
                          handleScan(p.barcode);
                        }}
                        className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs rounded-lg transition-colors border border-green-200"
                      >
                        {p.brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Экран обработки */}
            {(status === 'scanning' || status === 'checking') && (
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 animate-spin">
                  <Loader2 className="w-20 h-20 text-green-500" />
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {status === 'scanning' ? 'Сканирование...' : 'Проверка датчиками...'}
                </h2>
                <p className="text-gray-500">
                  {status === 'scanning' 
                    ? 'Проверяем штрихкод в базе данных' 
                    : 'Измеряем вес и габариты упаковки'}
                </p>
                
                {/* Прогресс-бар */}
                <div className="mt-6 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: status === 'scanning' ? '40%' : '80%' }}
                  />
                </div>
              </div>
            )}

            {/* Экран успеха */}
            {status === 'success' && (
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Спасибо за переработку!
                </h2>
                <p className="text-gray-500 mb-6">{resultMessage}</p>
                
                {/* Промокод */}
                {promoCode && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6 animate-pulse">
                    <p className="text-sm text-green-600 mb-2">Ваш промокод на скидку 5%:</p>
                    <p className="text-3xl font-mono font-bold text-green-800 tracking-wider">
                      {promoCode}
                    </p>
                    <p className="text-xs text-green-500 mt-2">
                      Действителен в магазинах-партнёрах
                    </p>
                  </div>
                )}
                
                <button
                  onClick={handleReset}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  Сдать ещё
                </button>
              </div>
            )}

            {/* Экран ошибки */}
            {status === 'error' && (
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Не удалось принять
                </h2>
                <p className="text-gray-500 mb-6">{resultMessage}</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleScan()}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <RotateCcw className="w-5 h-5 inline mr-2" />
                    Попробовать снова
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Вернуться на главный экран
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Подвал */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-green-100 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-gray-400">
          <span>© 2026 ЭкоЛоток — Проект переработки</span>
          <span>Версия ПО: 1.0.0-MVP</span>
        </div>
      </footer>
    </div>
  );
}
