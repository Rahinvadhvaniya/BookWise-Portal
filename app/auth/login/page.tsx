import { LoginForm } from "@/components/auth/login-form";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <LoginForm callbackUrl={params.callbackUrl} />
    </main>
  );
}
