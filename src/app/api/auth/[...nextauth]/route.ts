import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/authOptions"; // ✅ Import authOptions iz posebnog fajla

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
