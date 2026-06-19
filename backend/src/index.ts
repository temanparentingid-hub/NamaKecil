interface Env {
  DB: D1Database;
}

function handleCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: handleCorsHeaders()
  });
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...handleCorsHeaders()
    }
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === "OPTIONS") {
      return handleOptions();
    }

    try {
      // 1. GET /api/access-codes
      if (path === "/api/access-codes" && method === "GET") {
        const { results } = await env.DB.prepare(
          "SELECT * FROM access_codes ORDER BY createdAt DESC"
        ).all();
        return jsonResponse(results);
      }

      // 2. POST /api/access-codes
      if (path === "/api/access-codes" && method === "POST") {
        const body = await request.json() as { code?: string };
        const code = body.code?.trim();
        if (!code) {
          return jsonResponse({ error: "Missing access code" }, 400);
        }

        const now = new Date().toISOString();
        
        await env.DB.prepare(`
          INSERT INTO access_codes (code, createdAt)
          VALUES (?, ?)
          ON CONFLICT(code) DO NOTHING
        `).bind(code, now).run();

        return jsonResponse({ success: true });
      }

      // 3. DELETE /api/access-codes/:code
      if (path.startsWith("/api/access-codes/") && method === "DELETE") {
        const codeToDelete = decodeURIComponent(path.split("/")[3])?.trim();
        
        if (!codeToDelete) {
          return jsonResponse({ error: "Missing code in URL path" }, 400);
        }

        if (codeToDelete === "2425NK-1") {
          return jsonResponse({ error: "Cannot delete master admin access code" }, 400);
        }

        await env.DB.prepare(
          "DELETE FROM access_codes WHERE code = ?"
        ).bind(codeToDelete).run();

        return jsonResponse({ success: true });
      }

      return jsonResponse({ error: "Not Found" }, 404);
    } catch (err: any) {
      return jsonResponse({ error: "Server error", details: err.message }, 500);
    }
  }
};
