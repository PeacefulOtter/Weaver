



// export async function middleware(req: NextRequest, ev: NextFetchEvent) {
//     const session = await getToken({ req, secret: process.env.SECRET })
//     console.log('midd', session);
    
//     if ( !session || Math.floor(Date.now()) >= (session.user as any).expires_at * 1000) {
//         return {
//             redirect: {
//                 destination: "/login",
//                 permanent: false,
//             },
//         };
//      }
// }

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => { 
//         console.log('mid', token);
        
//         return true; // token?.userRole === "admin",
//     }
//   },
// })

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req: any) {
        const { token } = req.nextauth
        const allow = token && Math.floor(Date.now()) < (token as any).expires_at * 1000
        console.log(req, token, allow);
        
        return allow 
            ? NextResponse.next()
            : NextResponse.redirect("/login");
    }
)