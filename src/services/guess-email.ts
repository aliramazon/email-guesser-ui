export interface GuessEmailRequest {
    fullName: string;
    domain: string;
}

export interface GuessEmailResponse {
    email: string | null;
}

export interface GuessEmailErrorResponse {
    message: string;
}

export async function guessEmail(
    payload: GuessEmailRequest
): Promise<GuessEmailResponse> {
    try {
        const query = new URLSearchParams({
            fullName: payload.fullName,
            domain: payload.domain,
        });

        const res = await fetch(
            `http://localhost:3000/api/email-guesser/guess?${query.toString()}`,
            {
                method: "GET",
            }
        );

        if (!res.ok) {
            const errorBody = await res.json().catch(() => null);
            throw new Error(
                errorBody?.message ||
                    `Failed to guess email: ${res.status} ${res.statusText}`
            );
        }

        return res.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
    }
}
