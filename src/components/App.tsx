import { SegmentGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster } from "../design-system/toaster";
import "../styles/App.css";
import { EmailEntry } from "./EmailEntry";
import { EmailGuesser } from "./EmailGuesser";

type ActiveScreen = "emailGuesser" | "emailEntry";

function App() {
    const [activeScreen, setActiveScreen] =
        useState<ActiveScreen>("emailGuesser");
    return (
        <>
            <div className="app-container">
                <div>
                    <SegmentGroup.Root
                        value={activeScreen}
                        onValueChange={(e) =>
                            setActiveScreen(e.value as ActiveScreen)
                        }
                    >
                        <SegmentGroup.Indicator />
                        <SegmentGroup.Items
                            items={[
                                {
                                    value: "emailGuesser",
                                    label: "Email Guesser",
                                },
                                { value: "emailEntry", label: "Email Entry" },
                            ]}
                        />
                    </SegmentGroup.Root>
                </div>

                {activeScreen === "emailGuesser" ? (
                    <EmailGuesser />
                ) : (
                    <EmailEntry />
                )}
            </div>
            <Toaster />
        </>
    );
}

export default App;
