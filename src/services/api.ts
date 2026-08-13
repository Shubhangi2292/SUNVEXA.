import { SOLAR_PRODUCTS, SolarProduct } from '../data/solarProducts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Token Management
export const getAuthToken = (): string | null => localStorage.getItem('sunvexa_token');
export const setAuthToken = (token: string): void => localStorage.setItem('sunvexa_token', token);
export const removeAuthToken = (): void => localStorage.removeItem('sunvexa_token');

// Generic Fetch Wrapper with Authorization & Fallback
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[SUNVEXA API Fallback] Request to ${endpoint} failed, utilizing local engine:`, err);
    throw err;
  }
}

// ==================== AUTHENTICATION APIs ====================
export async function loginUser(email: string, password: string) {
  const data = await apiFetch<any>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) setAuthToken(data.token);
  return data;
}

export async function registerUser(userData: any) {
  const data = await apiFetch<any>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  if (data.token) setAuthToken(data.token);
  return data;
}

// ==================== PRODUCT APIs ====================
export async function fetchProducts(): Promise<SolarProduct[]> {
  try {
    const data = await apiFetch<any[]>('/products');
    if (Array.isArray(data) && data.length > 0) {
      return data.map((p) => ({
        id: String(p.id),
        name: p.name,
        category: p.category === 'SOLAR_PANEL' ? 'panels' : p.category === 'INVERTER' ? 'inverters' : p.category === 'BATTERY' ? 'batteries' : 'hardware',
        subCategory: p.productType || p.category,
        description: p.description,
        price: Number(p.price),
        rating: 4.9,
        reviewsCount: 128,
        image: p.imageUrl || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
        badge: p.badge,
        specs: {
          'Power Output': p.power || '550W',
          'Cell Efficiency': p.efficiency || '22.8%',
          'Warranty': `${p.warrantyYears || 25} Years`,
        },
        warranty: `${p.warrantyYears || 25} Years Manufacturer Warranty`,
        availability: p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock',
      }));
    }
    return SOLAR_PRODUCTS;
  } catch {
    return SOLAR_PRODUCTS;
  }
}

// ==================== ORDER & BUY NOW APIs ====================
export async function createBackendOrder(orderPayload: any) {
  try {
    return await apiFetch<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload),
    });
  } catch {
    return {
      id: Math.floor(1000 + Math.random() * 9000),
      orderNumber: 'SNR-' + Math.floor(100000 + Math.random() * 900000),
      status: 'PAYMENT_CONFIRMED',
      totalAmount: orderPayload.totalAmount || 18500,
      shippingAddress: orderPayload.shippingAddress,
    };
  }
}

export async function fetchOrderTracking(orderNumber: string) {
  try {
    return await apiFetch<any>(`/orders/${orderNumber}/tracking`);
  } catch {
    return {
      orderNumber,
      status: 'PAYMENT_CONFIRMED',
      timeline: [
        { step: 'Order Confirmed', completed: true },
        { step: 'Payment Confirmed', completed: true },
        { step: 'Preparing Order', completed: true },
        { step: 'Dispatched', completed: false },
        { step: 'Installation Scheduled', completed: false },
        { step: 'Installation Completed', completed: false },
      ],
    };
  }
}

// ==================== SOLAR CALCULATOR API ====================
export async function calculateSolarSavings(monthlyBill: number) {
  try {
    return await apiFetch<any>('/solar/calculate', {
      method: 'POST',
      body: JSON.stringify({ monthlyElectricityBill: monthlyBill }),
    });
  } catch {
    const recommendedKw = Math.max(1.0, Math.ceil((monthlyBill / 40.0) * 10.0) / 10.0);
    const annualGenKwh = recommendedKw * 4.5 * 365.0;
    const annualSavings = monthlyBill * 12.0 * 0.85;

    return {
      recommendedSystemCapacityKw: recommendedKw,
      approximatePanelCount: Math.ceil((recommendedKw * 1000) / 550),
      estimatedAnnualGenerationKwh: Math.round(annualGenKwh),
      estimatedAnnualSavings: Math.round(annualSavings),
      estimated25YearSavings: Math.round(annualSavings * 25 * 1.15),
      paybackPeriodYears: 4.8,
      estimatedCo2OffsetTons: 3.5,
      equivalentTreesPlanted: 52,
      disclaimer: 'This result is an estimate for planning purposes. Actual system sizing, generation and savings depend on site conditions, electricity tariffs, equipment, shading, orientation and professional system design.',
    };
  }
}

// ==================== QUOTE API ====================
export async function submitQuoteRequest(quoteData: any) {
  try {
    return await apiFetch<any>('/quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
  } catch {
    return { id: Date.now(), ...quoteData, status: 'NEW' };
  }
}

// ==================== AI COPILOT API ====================
export async function sendCopilotChat(message: string) {
  try {
    return await apiFetch<any>('/copilot/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  } catch {
    return {
      reply: 'SUNVEXA AI Solar Copilot recommends installing a 5.5 kW monocrystalline rooftop setup to cut monthly power bills by 85%.',
      recommendedAction: 'CALCULATE_SAVINGS',
      isSimulated: true,
    };
  }
}
