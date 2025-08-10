export const validateFullName = (fullName: string): string | null => {
    const trimmed = fullName.trim();
    if (!trimmed) return "Full name is required.";

    const parts = trimmed.split(" ");
    if (parts.length < 2) {
        return "Full name must contain at least two words.";
    }

    return null;
};
