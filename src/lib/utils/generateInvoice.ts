import dayjs from "dayjs";

export interface InvoiceData {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: {
    medicineName: string;
    quantity: number;
    unitPrice: number | string;
    totalPrice: number | string;
  }[];
  totalAmount: number | string;
  paymentMethod: string;
  paymentStatus: string;
}

export const generateInvoice = (order: InvoiceData) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice - ${order.orderNumber}</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #111827;
          line-height: 1.5;
          margin: 0;
          padding: 40px;
          background: #fff;
        }
        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 30px;
          margin-bottom: 30px;
        }
        .brand {
          font-size: 24px;
          font-weight: 900;
          color: #063c28;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .brand span {
          color: #fb6c08;
        }
        .invoice-info {
          text-align: right;
        }
        .invoice-info h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #d1d5db;
        }
        .details-grid {
          display: grid;
          grid-template-cols: 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .section-title {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin-bottom: 12px;
        }
        .info-content {
          font-weight: 600;
          font-size: 14px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        .table th {
          text-align: left;
          background: #f9fafb;
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 700;
          color: #4b5563;
          text-transform: uppercase;
          border-bottom: 1px solid #e5e7eb;
        }
        .table td {
          padding: 16px;
          font-size: 14px;
          border-bottom: 1px solid #f3f4f6;
        }
        .text-right {
          text-align: right;
        }
        .summary {
          margin-left: auto;
          width: 250px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          border-top: 2px solid #f3f4f6;
          margin-top: 8px;
          font-size: 18px;
          font-weight: 900;
          color: #063c28;
        }
        .footer {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid #f3f4f6;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="brand">MEDI<span>STORE</span></div>
          <div class="invoice-info">
            <h1>INVOICE</h1>
            <div style="font-weight: 800; color: #111827;">#${order.orderNumber}</div>
            <div style="font-size: 12px; color: #6b7280;">Date: ${dayjs(order.createdAt).format("MMM DD, YYYY")}</div>
          </div>
        </div>

        <div class="details-grid">
          <div>
            <div class="section-title">Billed To</div>
            <div class="info-content">${order.customerName}</div>
            <div style="font-size: 13px; color: #4b5563; margin-top: 4px;">
              ${order.customerEmail}<br>
              ${order.customerPhone}
            </div>
          </div>
          <div>
            <div class="section-title">Shipping Address</div>
            <div class="info-content" style="max-width: 280px;">
              ${order.shippingAddress}
            </div>
          </div>
        </div>

        <div class="details-grid">
          <div>
            <div class="section-title">Payment Method</div>
            <div class="info-content">${order.paymentMethod}</div>
          </div>
          <div>
            <div class="section-title">Payment Status</div>
            <div class="info-content" style="color: ${order.paymentStatus === 'COMPLETED' ? '#059669' : '#d97706'}">
              ${order.paymentStatus === 'COMPLETED' ? 'PAID' : 'PENDING'}
            </div>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th class="text-right">Price</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td style="font-weight: 700;">${item.medicineName}</td>
                <td class="text-right">৳${item.unitPrice}</td>
                <td class="text-right">${item.quantity}</td>
                <td class="text-right" style="font-weight: 700;">৳${item.totalPrice}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-row">
            <span style="color: #6b7280;">Subtotal</span>
            <span style="font-weight: 700;">৳${order.totalAmount}</span>
          </div>
          <div class="summary-row">
            <span style="color: #6b7280;">Shipping</span>
            <span style="color: #059669; font-weight: 700;">FREE</span>
          </div>
          <div class="total-row">
            <span>Total</span>
            <span style="color: #fb6c08;">৳${order.totalAmount}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for choosing MediStore for your healthcare needs.</p>
          <p style="margin-top: 4px;">If you have any questions about this invoice, please contact our support team.</p>
        </div>
      </div>
      <script>
        window.onload = function() {
          window.print();
          // Optional: close window after print
          // setTimeout(() => window.close(), 500);
        }
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
};
