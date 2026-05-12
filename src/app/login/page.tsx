import { LoginForm } from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="container mx-auto flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[32px] border bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight">
            Welcome back
          </h1>

          <p className="mt-3 text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}