import { Box, Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../design-system/toaster";
import {
    guessEmail,
    type GuessEmailErrorResponse,
} from "../services/guess-email";
import { validateDomain } from "../utils/validation/validate-domain";
import { validateFullName } from "../utils/validation/validate-full-name";

export const EmailGuesser = () => {
    const [fullName, setFullName] = useState("");
    const [domain, setDomain] = useState("");
    const [errors, setErrors] = useState<{
        fullName?: string | null;
        domain?: string | null;
    }>({});
    const [loading, setLoading] = useState(false);
    const [guessedEmail, setGuessedEmail] = useState<string | null>(null);

    const handleGuess = () => {
        const fullNameError = validateFullName(fullName);
        const domainError = validateDomain(domain);

        const newErrors = { fullName: fullNameError, domain: domainError };
        setErrors(newErrors);

        if (fullNameError || domainError) return;

        setLoading(true);
        setGuessedEmail(null);

        guessEmail({ fullName, domain })
            .then((data) => {
                if (!data.email) {
                    setGuessedEmail(null);
                    toaster.create({
                        title: "No Match Found",
                        description:
                            "We could not guess the email address for this person.",
                        type: "info",
                        duration: 4000,
                    });
                } else {
                    setGuessedEmail(data.email);
                    toaster.create({
                        title: "Email Guessed",
                        description: `Guessed email: ${data.email}`,
                        type: "success",
                        duration: 4000,
                    });
                    setFullName("");
                    setDomain("");
                }
            })
            .catch(async (err: GuessEmailErrorResponse) => {
                toaster.create({
                    title: "Error",
                    description: err.message,
                    type: "error",
                    duration: 4000,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const copyToClipboard = () => {
        if (!guessedEmail) return;
        navigator.clipboard.writeText(guessedEmail).then(() => {
            toaster.create({
                title: "Copied",
                description: "Email copied to clipboard.",
                type: "success",
            });
        });
    };

    return (
        <Box className="section-container">
            <Stack gap={6} align="stretch">
                <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    textAlign="center"
                    className="section-title"
                >
                    Email Guesser
                </Text>

                <Field.Root required invalid={!!errors.fullName}>
                    <Field.Label>
                        Full Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        size="2xl"
                        disabled={loading}
                        onBlur={() =>
                            setErrors((prev) => ({
                                ...prev,
                                fullName: validateFullName(fullName),
                            }))
                        }
                    />
                    {errors.fullName && (
                        <Field.ErrorText>{errors.fullName}</Field.ErrorText>
                    )}
                </Field.Root>

                <Field.Root required invalid={!!errors.domain}>
                    <Field.Label>
                        Domain <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder="Enter domain (e.g., company.com)"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        size="2xl"
                        disabled={loading}
                        onBlur={() =>
                            setErrors((prev) => ({
                                ...prev,
                                domain: validateDomain(domain),
                            }))
                        }
                    />
                    {errors.domain && (
                        <Field.ErrorText>{errors.domain}</Field.ErrorText>
                    )}
                </Field.Root>

                <Button
                    colorPalette="blue"
                    onClick={handleGuess}
                    size="2xl"
                    disabled={loading}
                >
                    Guess Email
                </Button>
                {guessedEmail && (
                    <Box
                        textAlign="center"
                        mt={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text fontWeight="medium" mr={2}>
                            Guessed Email: {guessedEmail}
                        </Text>
                        <Text onClick={copyToClipboard} cursor="pointer">
                            Copy
                        </Text>
                    </Box>
                )}
            </Stack>
        </Box>
    );
};
