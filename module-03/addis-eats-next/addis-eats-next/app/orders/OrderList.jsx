"use client";

import useSWR from "swr";
import Link from "next/link";
import CancelButton from "./CancelButton";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function OrderList({ initialOrders }) {
  const { data, error } = useSWR("/api/orders", fetcher, {
    fallbackData: { data: initialOrders }, // Start with server data
    refreshInterval: 5000,
    revalidateOnMount: false, // Don't aggressively refetch immediately on load
    revalidateOnFocus: false, // Don't refetch just because you clicked the window
  });

  if (error) return <p className="form-error">Failed to load orders.</p>;
  if (!data || !data.data) return <p className="form-error">No data available.</p>;

  // Use the data from SWR, but fallback to initialOrders if SWR returns an empty array
  const orders = data.data.length > 0 ? data.data : initialOrders;

  if (orders.length === 0) {
    return <p className="empty-cart">No orders yet.</p>;
  }

  return (
    <ul className="cart-list">
      {orders.map((order) => (
        <li key={order.id} className="cart-item">
          <div className="cart-item-info">
            <span className="cart-item-name">
              {order.id} — <strong>{order.status.toUpperCase()}</strong>
            </span>
            <span className="cart-item-price">
              {order.fullName}, {order.city}
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Link
              href={`/track/${order.id}`}
              className="delete-btn"
              style={{
                color: "#ffd700",
                borderColor: "#ffd700",
                textDecoration: "none",
              }}
            >
              Track
            </Link>
            {order.status === "pending" && <CancelButton orderId={order.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
}