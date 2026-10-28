import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "orders.json");

// Helper to read orders from the file
function readOrders() {
  if (!fs.existsSync(dataFile)) return [];
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw || "[]");
}

// Helper to write orders to the file
function writeOrders(orders) {
  fs.writeFileSync(dataFile, JSON.stringify(orders, null, 2));
}

export function createOrder(data, userId) {
  const orders = readOrders();
  const id = "ord_" + Math.random().toString(36).slice(2, 8);
  const order = {
    id,
    userId,
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  writeOrders(orders);
  return order;
}

export function getOrder(id) {
  return readOrders().find((o) => o.id === id) || null;
}

export function getOrdersFor(userId) {
  return readOrders()
    .filter((o) => o.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getAllOrders() {
  return readOrders().sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
}

export function markCancelled(id) {
  const orders = readOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;
  orders[index].status = "cancelled";
  writeOrders(orders);
  return orders[index];
}

export function getAllOrdersForDashboard() {
  const orders = readOrders();

  const byCity = {};
  orders.forEach((o) => {
    byCity[o.city] = (byCity[o.city] || 0) + 100;
  });

  const chartData = Object.keys(byCity).map((city) => ({
    city,
    revenue: byCity[city],
  }));

  return { orders, chartData };
}