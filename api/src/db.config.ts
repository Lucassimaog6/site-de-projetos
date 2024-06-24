import { createClient } from "@libsql/client";

export const db = createClient({
  url: "libsql://site-projetos-carlosg2011.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTkyNjM3ODgsInAiOnsicnciOnsibnMiOlsiY2FlYTVjNzktZTQxOC00Yjc1LWE2YmItNWEzY2Q5YTE1MDQ2Il19fX0.q_oQMRitIdb1X7NpOsftZcR5ZvQ88kQW6967X0Z9VWkJaPjwQwM0soSEP8TKqm-94llIaaQdSNheVgpeA5geCA",
});
