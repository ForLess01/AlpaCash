import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { ROLE_TO_ROUTE, ROUTE_TO_ROLE, type Role } from "@/lib/supabase/types";

export async function proxy(request: NextRequest) {
  // Ajustamos request.nextUrl para reflejar el host público detrás de proxies reversos (Render, Vercel)
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || process.env.RENDER_EXTERNAL_URL?.trim();

  if (envUrl) {
    try {
      const publicUrl = new URL(envUrl.startsWith("http") ? envUrl : `https://${envUrl}`);
      request.nextUrl.protocol = publicUrl.protocol;
      request.nextUrl.host = publicUrl.host;
      request.nextUrl.hostname = publicUrl.hostname;
      request.nextUrl.port = publicUrl.port;
    } catch {
      // Ignorar URLs inválidas
    }
  } else if (host && !host.includes("localhost")) {
    request.nextUrl.protocol = proto.endsWith(":") ? proto : `${proto}:`;
    request.nextUrl.host = host;
    const [hostname, port] = host.split(":");
    request.nextUrl.hostname = hostname;
    request.nextUrl.port = port || "";
  }

  const env = getSupabaseEnv();

  if (!env.isConfigured) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      loginUrl.searchParams.set("error", "supabase-config");
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    env.url!,
    env.anonKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      return NextResponse.redirect(loginUrl);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("rol, estado")
      .eq("id", user.id)
      .single();

    if (!profile) {
      const completeUrl = request.nextUrl.clone();
      completeUrl.pathname = "/auth/complete-profile";
      completeUrl.searchParams.delete("error");
      return NextResponse.redirect(completeUrl);
    }

    if (profile.estado === "pendiente" || profile.estado === "suspendido" || profile.estado === "rechazado") {
      await supabase.auth.signOut();
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      loginUrl.searchParams.set("error", "cuenta-" + profile.estado);
      return NextResponse.redirect(loginUrl);
    }

    const routeSegment = pathname.split("/")[2];
    const expectedRole = ROUTE_TO_ROLE[routeSegment];
    const userRole = profile.rol as Role;

    if (expectedRole) {
      if (userRole == null || userRole !== expectedRole) {
        const correctRoute = userRole ? ROLE_TO_ROUTE[userRole] : undefined;
        if (correctRoute) {
          const redirectUrl = request.nextUrl.clone();
          redirectUrl.pathname = correctRoute;
          return NextResponse.redirect(redirectUrl);
        }
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/auth/login";
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
