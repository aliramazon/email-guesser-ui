export const validateDomain = (domain: string): string | null => {
    const trimmed = domain.trim().toLowerCase();
    if (!trimmed) return "Domain is required.";

    if (trimmed.startsWith(".") || trimmed.includes("..")) {
        return "Enter a valid domain (e.g., company.com).";
    }

    const parts = trimmed.split(".");

    if (parts.length < 2 || parts.length > 3) {
        return "Enter a valid domain (e.g., company.com).";
    }

    const tld = parts[parts.length - 1];
    if (tld.length < 2) {
        return "Top-level domain must be at least 2 characters.";
    }

    return null;
};
