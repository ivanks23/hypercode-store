import { getCoupons } from "@/services/coupon.service";
import { CreateCouponDialog } from "@/components/admin/coupons/CreateCouponDialog";
import { ToggleCouponButton } from "@/components/admin/coupons/ToggleCouponButton";

export default async function CouponsPage() {
  const coupons = await getCoupons();

  return (
    <main className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-black">Coupons</h1>
        <CreateCouponDialog />
      </div>

      <div className="rounded-[32px] border bg-white p-6 shadow-sm">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="mb-4 rounded-2xl border p-4">
            <p className="font-bold">{coupon.code}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {coupon.discountType === "PERCENTAGE"
                ? `${coupon.value}%`
                : `$${coupon.value}`}
            </p>

            <div className="mt-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  coupon.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {coupon.active ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
            <div className="mt-3">
              <ToggleCouponButton couponId={coupon.id} active={coupon.active} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
