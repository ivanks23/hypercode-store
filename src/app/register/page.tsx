import { RegisterForm } from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="container mx-auto flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[32px] border bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight">Create account</h1>

          <p className="mt-3 text-muted-foreground">Join HyperCode Store</p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
