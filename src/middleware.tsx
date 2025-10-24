import { NextRequest, NextResponse } from "next/server"


export const middleware = (request: NextRequest) => {
    const token = request.cookies.get("token")?.value

    if (token) {
        return NextResponse.next();
    } else {

        const url = new URL(request.url);
        url.pathname = "/login";
        return NextResponse.redirect(url.toString())

    }

};

export const config = {
    matcher: ["/dashboord/:path*"]
};

