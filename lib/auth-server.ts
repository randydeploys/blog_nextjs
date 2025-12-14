import { auth } from "./auth";
import { headers } from "next/headers";

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    return session
}

export const getUser = async () => {
    const session = await getSession()
    return session?.user
}
