import { ApiClient } from './ApiClient';

const api = new ApiClient();

export const PaymentsService = {
  createCheckout(orderId: string) {
    return api.post<{
      id: string;
      status: string;
      transactionId?: string | null;
      checkoutUrl?: string | null;
    }>('/payments/checkout', {
      orderId,
      method: 'PIX',
    });
  },
  getStatusByOrder(orderId: string) {
    return api.get<{ id: string; status: string; transactionId: string | null }>(
      '/payments/status',
      { order_id: orderId },
    );
  },
};
