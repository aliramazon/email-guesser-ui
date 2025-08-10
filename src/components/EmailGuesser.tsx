import { Box, Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export const EmailGuesser = () => {
    const [fullName, setFullName] = useState("");
    const [domain, setDomain] = useState("");

    const handleGuess = () => {
        console.log("Guessing email for:", { fullName, domain });
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

                <Field.Root required>
                    <Field.Label>
                        Full Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        size="2xl"
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label>
                        Domain <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder="Enter domain (e.g., company.com)"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        size="2xl"
                    />
                </Field.Root>

                <Button colorPalette="blue" onClick={handleGuess} size="2xl">
                    Guess Email
                </Button>
            </Stack>
        </Box>
    );
};
