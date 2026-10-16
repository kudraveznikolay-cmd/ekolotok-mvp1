/**
 * Mock-данные и бизнес-логика для системы "ЭкоЛоток"
 * Имитирует работу backend-сервера и базы данных
 */

// ====== ТИПЫ ДАННЫХ (аналог Pydantic-моделей / SQLAlchemy) ======

export interface Machine {
  id: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  currentFillLevel: number; // процент заполнения (0-100)
  lastHeartbeat: Date;
}

export interface Product {
  id: string;
  barcode: string;
  brand: string;
  materialType: 'cardboard' | 'plastic';
  weightRange: { min: number; max: number }; // в граммах
}

export interface Transaction {
  id: string;
  machineId: string;
  barcode: string;
  weight: number;
  timestamp: Date;
  status: 'pending' | 'success' | 'rejected';
  promoCodeId?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  isUsed: boolean;
  createdAt: Date;
}

// ====== MOCK ДАННЫЕ ======

export const mockProducts: Product[] = [
  { id: '1', barcode: '4810000123456', brand: 'Деревенское', materialType: 'cardboard', weightRange: { min: 50, max: 150 } },
  { id: '2', barcode: '4810000234567', brand: 'Солнечное', materialType: 'cardboard', weightRange: { min: 50, max: 150 } },
  { id: '3', barcode: '4810000345678', brand: 'Фермерское', materialType: 'plastic', weightRange: { min: 30, max: 80 } },
  { id: '4', barcode: '4810000456789', brand: 'ЭкоФреш', materialType: 'cardboard', weightRange: { min: 50, max: 150 } },
  { id: '5', barcode: '4810000567890', brand: 'Куриное счастье', materialType: 'plastic', weightRange: { min: 30, max: 80 } },
  { id: '6', barcode: '4810000678901', brand: 'Белая птица', materialType: 'cardboard', weightRange: { min: 50, max: 150 } },
  { id: '7', barcode: '4810000789012', brand: 'Окское', materialType: 'cardboard', weightRange: { min: 50, max: 150 } },
  { id: '8', barcode: '4810000890123', brand: 'Рябушка', materialType: 'plastic', weightRange: { min: 30, max: 80 } },
];

export const mockMachines: Machine[] = [
  { id: 'm1', location: 'ТЦ "Галилео", Минск', status: 'online', currentFillLevel: 35, lastHeartbeat: new Date() },
  { id: 'm2', location: 'ТЦ "Замок", Минск', status: 'online', currentFillLevel: 72, lastHeartbeat: new Date() },
  { id: 'm3', location: 'Магазит "Евроопт", Брест', status: 'maintenance', currentFillLevel: 90, lastHeartbeat: new Date(Date.now() - 3600000) },
  { id: 'm4', location: 'ТЦ "Корона", Гомель', status: 'online', currentFillLevel: 15, lastHeartbeat: new Date() },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', machineId: 'm1', barcode: '4810000123456', weight: 85, timestamp: new Date(Date.now() - 86400000), status: 'success', promoCodeId: 'p1' },
  { id: 't2', machineId: 'm1', barcode: '4810000234567', weight: 92, timestamp: new Date(Date.now() - 72000000), status: 'success', promoCodeId: 'p2' },
  { id: 't3', machineId: 'm2', barcode: '4810000345678', weight: 45, timestamp: new Date(Date.now() - 50000000), status: 'success', promoCodeId: 'p3' },
  { id: 't4', machineId: 'm2', barcode: '9999999999999', weight: 0, timestamp: new Date(Date.now() - 40000000), status: 'rejected' },
  { id: 't5', machineId: 'm1', barcode: '4810000456789', weight: 78, timestamp: new Date(Date.now() - 30000000), status: 'success', promoCodeId: 'p4' },
  { id: 't6', machineId: 'm4', barcode: '4810000567890', weight: 55, timestamp: new Date(Date.now() - 20000000), status: 'success', promoCodeId: 'p5' },
  { id: 't7', machineId: 'm2', barcode: '4810000678901', weight: 110, timestamp: new Date(Date.now() - 10000000), status: 'success', promoCodeId: 'p6' },
  { id: 't8', machineId: 'm4', barcode: '4810000789012', weight: 67, timestamp: new Date(Date.now() - 5000000), status: 'success', promoCodeId: 'p7' },
];

export const mockPromoCodes: PromoCode[] = [
  { id: 'p1', code: 'ECO-X7K2M9', discountPercent: 5, isUsed: true, createdAt: new Date(Date.now() - 86400000) },
  { id: 'p2', code: 'ECO-R3N8P1', discountPercent: 5, isUsed: false, createdAt: new Date(Date.now() - 72000000) },
  { id: 'p3', code: 'ECO-W5J4L6', discountPercent: 5, isUsed: true, createdAt: new Date(Date.now() - 50000000) },
  { id: 'p4', code: 'ECO-T9B2Q7', discountPercent: 5, isUsed: false, createdAt: new Date(Date.now() - 30000000) },
  { id: 'p5', code: 'ECO-Y1F6H3', discountPercent: 5, isUsed: false, createdAt: new Date(Date.now() - 20000000) },
  { id: 'p6', code: 'ECO-A8D5G0', discountPercent: 5, isUsed: true, createdAt: new Date(Date.now() - 10000000) },
  { id: 'p7', code: 'ECO-C4E7K2', discountPercent: 5, isUsed: false, createdAt: new Date(Date.now() - 5000000) },
];

// ====== БИЗНЕС-ЛОГИКА (имитация Backend API) ======

/**
 * Генерация уникального промокода
 * Формат: ECO-XXXXXX (6 символов)
 */
function generatePromoCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'ECO-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/**
 * Mock-функция проверки веса и габаритов (имитация датчиков "железа")
 * Возвращает случайный вес в диапазоне для данного типа материала
 */
function mockHardwareCheck(product: Product): { success: boolean; weight: number; message: string } {
  // Имитация задержки работы датчиков
  const weight = Math.floor(
    Math.random() * (product.weightRange.max - product.weightRange.min) + product.weightRange.min
  );
  
  // 90% шанс успешной проверки (реалистичная имитация)
  const success = Math.random() > 0.1;
  
  return {
    success,
    weight,
    message: success 
      ? `Вес: ${weight}г — в допустимых пределах для ${product.materialType === 'cardboard' ? 'картонной' : 'пластиковой'} упаковки`
      : `Ошибка датчика: вес ${weight}г не соответствует ожидаемому диапазону`
  };
}

/**
 * Имитация полного процесса приёма упаковки:
 * 1. Валидация штрихкода
 * 2. Проверка веса датчиками
 * 3. Генерация промокода
 */
export async function processScan(barcode: string): Promise<{
  success: boolean;
  message: string;
  promoCode?: string;
  product?: Product;
  weight?: number;
}> {
  // Шаг 1: Имитация задержки сети (валидация штрихкода)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Поиск продукта по штрихкоду
  const product = mockProducts.find(p => p.barcode === barcode);
  
  if (!product) {
    return {
      success: false,
      message: '❌ Штрихкод не распознан. Убедитесь, что упаковка является яичным лотком.',
    };
  }
  
  // Шаг 2: Проверка веса датчиками (имитация задержки "железа")
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const hardwareResult = mockHardwareCheck(product);
  
  if (!hardwareResult.success) {
    return {
      success: false,
      message: `⚠️ ${hardwareResult.message}. Попробуйте ещё раз.`,
      product,
    };
  }
  
  // Шаг 3: Успех — генерируем промокод
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const promoCode = generatePromoCode();
  
  return {
    success: true,
    message: `✅ Упаковка принята! ${product.brand} (${product.materialType === 'cardboard' ? 'картон' : 'пластик'}), вес: ${hardwareResult.weight}г`,
    promoCode,
    product,
    weight: hardwareResult.weight,
  };
}

/**
 * Статистика для админ-панели
 */
export function getAdminStats() {
  const totalTransactions = mockTransactions.length;
  const successfulTransactions = mockTransactions.filter(t => t.status === 'success').length;
  const rejectedTransactions = mockTransactions.filter(t => t.status === 'rejected').length;
  const totalPromoCodes = mockPromoCodes.length;
  const usedPromoCodes = mockPromoCodes.filter(p => p.isUsed).length;
  const totalWeight = mockTransactions.reduce((sum, t) => sum + t.weight, 0);
  
  // Статистика по дням (последние 7 дней)
  const dailyStats = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));
    
    const dayTransactions = mockTransactions.filter(t => 
      t.timestamp >= dayStart && t.timestamp <= dayEnd
    );
    
    return {
      date: dayStart.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' }),
      count: dayTransactions.length,
      weight: dayTransactions.reduce((sum, t) => sum + t.weight, 0),
    };
  });
  
  return {
    totalTransactions,
    successfulTransactions,
    rejectedTransactions,
    totalPromoCodes,
    usedPromoCodes,
    totalWeight,
    dailyStats,
    machines: mockMachines,
    recentTransactions: [...mockTransactions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10),
  };
}
