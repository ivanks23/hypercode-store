import { notFound } from "next/navigation";
import { getAdminUserById } from "@/services/user.service";
import { UserRoleSelect } from "@/components/admin/users/UserRoleSelect";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminUserPage({ params }: Props) {
  const { id } = await params;

  const user = await getAdminUserById(id);

  if (!user) {
    notFound();
  }

  const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black">{user.name}</h1>

        <p className="mt-2 text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[32px] border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Summary</h2>

          <div className="space-y-3">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Role</p>

              <UserRoleSelect userId={user.id} currentRole={user.role} />
            </div>

            <p>Orders: {user.orders.length}</p>

            <p>Total Spent: ${totalSpent}</p>
          </div>
        </div>

        <div className="rounded-[32px] border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Billing</h2>

          {user.billingProfile ? (
            <div className="space-y-2">
              <p>RFC: {user.billingProfile.rfc}</p>

              <p>Business: {user.billingProfile.businessName}</p>

              <p>Regime: {user.billingProfile.taxRegime}</p>
            </div>
          ) : (
            <p>No billing profile</p>
          )}
        </div>

        <div className="rounded-[32px] border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Addresses</h2>

          <p>{user.addresses.length} address(es)</p>
        </div>
      </div>

      <div className="mt-8 rounded-[32px] border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Orders</h2>

        <div className="space-y-4">
          {user.orders.map((order) => (
            <div key={order.id} className="rounded-2xl border p-4">
              <p className="font-mono text-sm">{order.id}</p>

              <p className="mt-2">Status: {order.status}</p>

              <p>Total: ${order.total}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
