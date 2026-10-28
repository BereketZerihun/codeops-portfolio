import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/orders";
import OrderList from "./OrderList";

// Forces the page to always run on the server for every request
export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  // Fetch the orders directly from the "database" (our memory)
  const initialOrders = getOrdersFor(user.id);

  return (
    <main className="form-page">
      <h1 className="form-title">Your Orders</h1>
      <OrderList initialOrders={initialOrders} />
    </main>
  );
}