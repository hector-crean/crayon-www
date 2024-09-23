import { Loader2 } from "lucide-react"

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
                <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
                <h2 className="mt-4 text-2xl font-semibold text-foreground">Loading...</h2>
                <p className="mt-2 text-muted-foreground">Please wait while we initialize the application.</p>
            </div>
        </div>
    )
}

export { LoadingOverlay }

