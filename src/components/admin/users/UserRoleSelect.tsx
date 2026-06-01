"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { updateUserRoleAction } from "@/actions/update-user-role";

type Props = {
  userId: string;
  currentRole: UserRole;
};

export function UserRoleSelect({
  userId,
  currentRole,
}: Props) {

  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  return (
    <select
      disabled={isPending}
      value={currentRole}
      onChange={(e) => {

        const role =
          e.target.value as UserRole;

        startTransition(
          async () => {

            await updateUserRoleAction({
              userId,
              role,
            });

            router.refresh();
          }
        );
      }}
      className={`rounded-xl border px-4 py-2 text-sm font-medium ${
        currentRole === "ADMIN"
          ? "bg-violet-100 text-violet-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      <option value="CUSTOMER">
        CUSTOMER
      </option>

      <option value="ADMIN">
        ADMIN
      </option>
    </select>
  );
}