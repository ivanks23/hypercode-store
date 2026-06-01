"use client";

import {
  useState,
  useTransition,
} from "react";

import { updateProfileAction } from "@/actions/update-profile";

type Props = {
  name: string;
  email: string;
};

export function ProfileForm({
  name,
  email,
}: Props) {

  const [
    currentName,
    setCurrentName,
  ] = useState(name);

  const [
    currentEmail,
    setCurrentEmail,
  ] = useState(email);

  const [
    isPending,
    startTransition,
  ] = useTransition();

  return (
    <div className="space-y-6">

      <div>

        <label className="mb-2 block text-sm font-medium">
          Name
        </label>

        <input
          value={currentName}
          onChange={(e) =>
            setCurrentName(
              e.target.value
            )
          }
          className="w-full rounded-2xl border px-4 py-3"
        />
      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          value={currentEmail}
          onChange={(e) =>
            setCurrentEmail(
              e.target.value
            )
          }
          className="w-full rounded-2xl border px-4 py-3"
        />
      </div>

      <button
        disabled={isPending}
        onClick={() =>
          startTransition(
            async () => {

              await updateProfileAction({
                name:
                  currentName,
                email:
                  currentEmail,
              });

              alert(
                "Profile updated"
              );
            }
          )
        }
        className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
      >
        {isPending
          ? "Saving..."
          : "Save Changes"}
      </button>
    </div>
  );
}