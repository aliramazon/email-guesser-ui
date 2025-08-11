import { validateDomain } from "../validate-domain";

describe("validateDomain", (): void => {
    describe("Valid domains", (): void => {
        test("should return null for valid domain with com TLD", (): void => {
            expect(validateDomain("example.com")).toBeNull();
        });

        test("should return null for valid domain with different TLD", (): void => {
            expect(validateDomain("example.org")).toBeNull();
            expect(validateDomain("example.net")).toBeNull();
            expect(validateDomain("example.edu")).toBeNull();
        });

        test("should return null for single subdomain", (): void => {
            expect(validateDomain("www.example.com")).toBeNull();
            expect(validateDomain("api.company.org")).toBeNull();
            expect(validateDomain("mail.example.net")).toBeNull();
        });

        test("should handle domains with numbers", (): void => {
            expect(validateDomain("test123.com")).toBeNull();
            expect(validateDomain("123domain.org")).toBeNull();
            expect(validateDomain("www.test123.com")).toBeNull();
        });

        test("should handle domains with hyphens", (): void => {
            expect(validateDomain("my-company.com")).toBeNull();
            expect(validateDomain("test-site.org")).toBeNull();
            expect(validateDomain("www.my-company.com")).toBeNull();
        });

        test("should handle longer TLDs", (): void => {
            expect(validateDomain("example.info")).toBeNull();
            expect(validateDomain("company.travel")).toBeNull();
            expect(validateDomain("www.example.museum")).toBeNull();
        });

        test("should handle country code TLDs", (): void => {
            expect(validateDomain("example.uk")).toBeNull();
            expect(validateDomain("company.ca")).toBeNull();
            expect(validateDomain("site.de")).toBeNull();
            expect(validateDomain("www.example.co.uk")).toBe(
                "Enter a valid domain (e.g., company.com)."
            ); // This would be 4 parts
        });
    });

    describe("Input normalization", (): void => {
        test("should handle uppercase domains", (): void => {
            expect(validateDomain("EXAMPLE.COM")).toBeNull();
            expect(validateDomain("Company.ORG")).toBeNull();
            expect(validateDomain("WWW.EXAMPLE.COM")).toBeNull();
        });

        test("should handle mixed case domains", (): void => {
            expect(validateDomain("ExAmPlE.CoM")).toBeNull();
            expect(validateDomain("WwW.ExAmPlE.CoM")).toBeNull();
        });

        test("should trim whitespace", (): void => {
            expect(validateDomain("  example.com  ")).toBeNull();
            expect(validateDomain("\texample.com\n")).toBeNull();
            expect(validateDomain("  www.example.com  ")).toBeNull();
        });
    });

    describe("Invalid domains - empty/required", (): void => {
        test("should return error for empty string", (): void => {
            expect(validateDomain("")).toBe("Domain is required.");
        });

        test("should return error for whitespace only", (): void => {
            expect(validateDomain("   ")).toBe("Domain is required.");
            expect(validateDomain("\t\n")).toBe("Domain is required.");
        });
    });

    describe("Invalid domains - format violations", (): void => {
        test("should return error for single word without TLD", (): void => {
            expect(validateDomain("example")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("localhost")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });

        test("should return error for domain starting with dot", (): void => {
            expect(validateDomain(".example.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain(".www.example.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });

        test("should return error for multiple consecutive dots", (): void => {
            expect(validateDomain("example..com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("www..example.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("example...com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });

        test("should return error for multiple subdomains (more than 1)", (): void => {
            expect(validateDomain("mail.server.company.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("a.b.c.example.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("one.two.three.four.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });
    });

    describe("Invalid domains - TLD requirements", (): void => {
        test("should return error for single character TLD", (): void => {
            expect(validateDomain("example.c")).toBe(
                "Top-level domain must be at least 2 characters."
            );
            expect(validateDomain("company.x")).toBe(
                "Top-level domain must be at least 2 characters."
            );
            expect(validateDomain("www.example.z")).toBe(
                "Top-level domain must be at least 2 characters."
            );
        });

        test("should return error for empty TLD", (): void => {
            expect(validateDomain("example.")).toBe(
                "Top-level domain must be at least 2 characters."
            );
            expect(validateDomain("www.example.")).toBe(
                "Top-level domain must be at least 2 characters."
            );
        });
    });

    describe("Edge cases", (): void => {
        test("should handle domain with only dots", (): void => {
            expect(validateDomain(".")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("..")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("...")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });

        test("should handle very long valid domains", (): void => {
            const longDomain: string = "a".repeat(50) + ".com";
            expect(validateDomain(longDomain)).toBeNull();

            const longSubdomain: string =
                "a".repeat(30) + "." + "b".repeat(30) + ".com";
            expect(validateDomain(longSubdomain)).toBeNull();
        });

        test("should handle minimum valid domains", (): void => {
            expect(validateDomain("a.bc")).toBeNull();
            expect(validateDomain("x.y.zz")).toBeNull();
        });

        test("should reject domains with too many parts even if each part is valid", (): void => {
            expect(validateDomain("valid.sub.domain.example.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("a.b.c.d.e.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });

        test("should handle mixed invalid patterns", (): void => {
            expect(validateDomain(".example..com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("..example.com.")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });
    });

    describe("Boundary testing for subdomain limit", (): void => {
        test("should allow exactly 0 subdomains", (): void => {
            expect(validateDomain("domain.com")).toBeNull();
            expect(validateDomain("company.org")).toBeNull();
        });

        test("should allow exactly 1 subdomain", (): void => {
            expect(validateDomain("www.domain.com")).toBeNull();
            expect(validateDomain("api.company.org")).toBeNull();
        });

        test("should reject exactly 2 subdomains", (): void => {
            expect(validateDomain("sub1.sub2.domain.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("mail.api.company.org")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });

        test("should reject 3+ subdomains", (): void => {
            expect(validateDomain("a.b.c.domain.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
            expect(validateDomain("one.two.three.four.five.com")).toBe(
                "Enter a valid domain (e.g., company.com)."
            );
        });
    });
});
