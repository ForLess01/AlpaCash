import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ROLE_TO_ROUTE, type Role } from "@/lib/supabase/types";
import { CompleteProfileForm } from "./CompleteProfileForm";

export default async function CompleteProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: existing } = await supabase
    .from("profiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (existing?.rol) {
    redirect(ROLE_TO_ROUTE[existing.rol as Role]);
  }

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    "";
  const avatarUrl = (user.user_metadata?.avatar_url as string | undefined) ?? null;

  return (
    <CompleteProfileForm
      userId={user.id}
      email={user.email ?? ""}
      fullName={fullName}
      avatarUrl={avatarUrl}
    />
  );
}
