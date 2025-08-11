# Email Guesser UI

This is the frontend application for the Email Guesser tool, built with React and Vite, styled using Chakra UI.

## Prerequisites

-   Node.js (v23.10.0 recommended)
-   npm

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173) by default.

## Testing

Run tests:

```bash
npm run test
```

Run tests with coverage report:

```bash
npm run test:coverage
```

## Scripts

-   **dev**: Starts Vite development server
-   **test**: Runs Jest tests
-   **test:coverage**: Runs Jest tests with coverage

## Features

-   **Email Guesser** section: Enter a full name and a company domain to guess the email address (integrates with backend API).
-   **Email Entry** section: Allows entering a new company contact with full name and email address.
    -   This UI is ready, but backend integration to store the data in `contacts.json` is still pending.

## Bonus

-   When a new company contact is found with a full name and email address, the `Email Entry` section can be used to enter the data.
-   Once integrated, this will allow adding entries to the backend `contacts.json` file.
