'use server'

import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

const SignInCard = () => {

    return (
        <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] z-50">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to your account using Google</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={async () => {
                    "use server"
                    await signIn("google")
                }}>
                    <Button type="submit" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Sign in with Google
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                {/* Error handling will be done in a client component */}
            </CardFooter>
        </Card>
    )
}

export default SignInCard