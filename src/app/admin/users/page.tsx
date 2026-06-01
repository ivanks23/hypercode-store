import { getAdminUsers } from "@/services/user.service";
import Link from "next/link";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();
  const totalSpent = users.reduce(
    (sum, user) =>
      sum + user.orders.reduce((orderSum, order) => orderSum + order.total, 0),
    0,
  );

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Users</h1>

        <p className="mt-2 text-muted-foreground">
          Manage customers and administrators
        </p>
      </div>

      <div className="overflow-hidden rounded-[32px] border bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b bg-muted/30">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Orders</th>
              <th className="px-6 py-4 text-left">Total Spent</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-5">{user.name}</td>
                <td className="px-6 py-5">{user.email}</td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5">{user.orders.length}</td>
                <td className="px-6 py-5 font-semibold">${totalSpent}</td>
                <td className="px-6 py-5">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-5">
                  <Link href={`/admin/users/${user.id}`}>
                    <button className="rounded-xl border px-4 py-2 text-sm font-medium">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
