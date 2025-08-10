import { Toaster } from "../design-system/toaster";
import "../styles/App.css";
import { EmailEntry } from "./EmailEntry";
import { EmailGuesser } from "./EmailGuesser";

function App() {
    return (
        <>
            <div className="app-container">
                <div className="left-section">
                    <EmailGuesser />
                </div>
                <div className="right-section">
                    <EmailEntry />
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default App;
