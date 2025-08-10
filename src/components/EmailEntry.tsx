import { Box, Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export const EmailEntry = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        console.log("Submitting email entry:", { name, email });
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
                    Email Entry
                </Text>

                <Field.Root required>
                    <Field.Label>
                        Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size="2xl"
                    />
                </Field.Root>

                <Field.Root required>
                    <Field.Label>
                        Email <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        type="email"
                        placeholder="Enter full email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="2xl"
                    />
                </Field.Root>

                <Button colorPalette="green" onClick={handleSubmit} size="2xl">
                    Submit Email
                </Button>
            </Stack>
        </Box>
    );
};
