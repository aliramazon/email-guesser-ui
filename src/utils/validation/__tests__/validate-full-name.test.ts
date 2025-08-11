import { validateFullName } from "../validate-full-name";

describe("validateFullName", (): void => {
    describe("Valid full names", (): void => {
        test("should return null for valid two-word full name", (): void => {
            expect(validateFullName("John Doe")).toBeNull();
            expect(validateFullName("Jane Smith")).toBeNull();
            expect(validateFullName("Mary Johnson")).toBeNull();
        });

        test("should return null for valid three-word full name", (): void => {
            expect(validateFullName("John Michael Doe")).toBeNull();
            expect(validateFullName("Mary Jane Smith")).toBeNull();
            expect(validateFullName("Robert James Wilson")).toBeNull();
        });

        test("should return null for valid four or more word full name", (): void => {
            expect(validateFullName("John Michael Robert Doe")).toBeNull();
            expect(
                validateFullName("Mary Jane Elizabeth Smith Johnson")
            ).toBeNull();
        });

        test("should handle names with different cases", (): void => {
            expect(validateFullName("john doe")).toBeNull();
            expect(validateFullName("JANE SMITH")).toBeNull();
            expect(validateFullName("MaRy JoHnSoN")).toBeNull();
        });

        test("should handle names with hyphens", (): void => {
            expect(validateFullName("Mary-Jane Smith")).toBeNull();
            expect(validateFullName("John Smith-Johnson")).toBeNull();
            expect(validateFullName("Anne-Marie Van-Der-Berg")).toBeNull();
        });

        test("should handle names with apostrophes", (): void => {
            expect(validateFullName("John O'Connor")).toBeNull();
            expect(validateFullName("Mary D'Angelo")).toBeNull();
            expect(validateFullName("Patrick O'Brien")).toBeNull();
        });

        test("should handle names with periods", (): void => {
            expect(validateFullName("John J. Doe")).toBeNull();
            expect(validateFullName("Mary A. Smith")).toBeNull();
            expect(validateFullName("Dr. John Smith")).toBeNull();
        });

        test("should handle international names", (): void => {
            expect(validateFullName("José García")).toBeNull();
            expect(validateFullName("François Müller")).toBeNull();
            expect(validateFullName("李 明")).toBeNull();
        });
    });

    describe("Input normalization", (): void => {
        test("should trim leading whitespace", (): void => {
            expect(validateFullName("  John Doe")).toBeNull();
            expect(validateFullName("\tJane Smith")).toBeNull();
            expect(validateFullName("\nMary Johnson")).toBeNull();
        });

        test("should trim trailing whitespace", (): void => {
            expect(validateFullName("John Doe  ")).toBeNull();
            expect(validateFullName("Jane Smith\t")).toBeNull();
            expect(validateFullName("Mary Johnson\n")).toBeNull();
        });

        test("should trim both leading and trailing whitespace", (): void => {
            expect(validateFullName("  John Doe  ")).toBeNull();
            expect(validateFullName("\t Jane Smith \n")).toBeNull();
            expect(validateFullName("   Mary Johnson   ")).toBeNull();
        });

        test("should handle multiple spaces between words", (): void => {
            expect(validateFullName("John  Doe")).toBeNull();
            expect(validateFullName("Jane   Smith")).toBeNull();
            expect(validateFullName("Mary    Johnson")).toBeNull();
        });

        test("should handle mixed whitespace between words", (): void => {
            expect(validateFullName("John\tDoe")).toBeNull();
            expect(validateFullName("Jane\nSmith")).toBeNull();
            expect(validateFullName("Mary \t Johnson")).toBeNull();
        });
    });

    describe("Invalid full names - empty/required", (): void => {
        test("should return error for empty string", (): void => {
            expect(validateFullName("")).toBe("Full name is required.");
        });

        test("should return error for whitespace only", (): void => {
            expect(validateFullName("   ")).toBe("Full name is required.");
            expect(validateFullName("\t\t")).toBe("Full name is required.");
            expect(validateFullName("\n\n")).toBe("Full name is required.");
            expect(validateFullName(" \t \n ")).toBe("Full name is required.");
        });
    });

    describe("Invalid full names - insufficient words", (): void => {
        test("should return error for single word", (): void => {
            expect(validateFullName("John")).toBe(
                "Full name must contain at least two words."
            );
            expect(validateFullName("Smith")).toBe(
                "Full name must contain at least two words."
            );
            expect(validateFullName("Mary")).toBe(
                "Full name must contain at least two words."
            );
        });

        test("should return error for single word with leading/trailing spaces", (): void => {
            expect(validateFullName("  John  ")).toBe(
                "Full name must contain at least two words."
            );
            expect(validateFullName("\tSmith\t")).toBe(
                "Full name must contain at least two words."
            );
        });

        test("should return error for single character", (): void => {
            expect(validateFullName("J")).toBe(
                "Full name must contain at least two words."
            );
            expect(validateFullName("X")).toBe(
                "Full name must contain at least two words."
            );
        });
    });

    describe("Edge cases", (): void => {
        test("should handle very short valid names", (): void => {
            expect(validateFullName("A B")).toBeNull();
            expect(validateFullName("X Y")).toBeNull();
            expect(validateFullName("I Am")).toBeNull();
        });

        test("should handle very long valid names", (): void => {
            const longFirstName: string = "A".repeat(50);
            const longLastName: string = "B".repeat(50);
            expect(
                validateFullName(`${longFirstName} ${longLastName}`)
            ).toBeNull();
        });

        test("should handle names with numbers", (): void => {
            expect(validateFullName("John Doe2")).toBeNull();
            expect(validateFullName("Mary 3rd")).toBeNull();
            expect(validateFullName("King Henry VIII")).toBeNull();
        });

        test("should handle names with special characters", (): void => {
            expect(validateFullName("María José")).toBeNull();
            expect(validateFullName("François Müller")).toBeNull();
            expect(validateFullName("Østberg Hansen")).toBeNull();
        });

        test("should handle empty parts created by multiple spaces", (): void => {
            // Multiple spaces create empty parts when split, but still results in valid names
            expect(validateFullName("John     Doe")).toBeNull();
            expect(validateFullName("Mary          Smith")).toBeNull();
        });
    });

    describe("Real-world name patterns", (): void => {
        test("should handle common name formats", (): void => {
            expect(validateFullName("First Last")).toBeNull();
            expect(validateFullName("First Middle Last")).toBeNull();
            expect(validateFullName("First Middle1 Middle2 Last")).toBeNull();
        });

        test("should handle titles and suffixes", (): void => {
            expect(validateFullName("Dr. John")).toBeNull();
            expect(validateFullName("John Jr.")).toBeNull();
            expect(validateFullName("Mary Smith PhD")).toBeNull();
        });

        test("should handle compound names", (): void => {
            expect(validateFullName("Jean-Claude Van-Damme")).toBeNull();
            expect(validateFullName("Mary-Kate Ashley-Olsen")).toBeNull();
        });

        test("should handle names with prefixes", (): void => {
            expect(validateFullName("Van Der Berg")).toBeNull();
            expect(validateFullName("De La Cruz")).toBeNull();
            expect(validateFullName("Mac Donald")).toBeNull();
        });
    });
});
