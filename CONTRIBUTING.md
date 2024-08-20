# Contributing to E-commerce Backend

We welcome contributions to the E-commerce Backend project! By contributing, you help make this project better for everyone. Please take a moment to review this document to make the contribution process easy and effective for everyone involved.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Setup](#development-setup)
- [Style Guides](#style-guides)
  - [Git Commit Messages](#git-commit-messages)
  - [Code Style](#code-style)
- [License](#license)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [email@example.com](mailto:email@example.com).

## How to Contribute

### Reporting Bugs

If you find a bug in the project, please create an issue on GitHub with the following information:

- A clear and descriptive title.
- A detailed description of the problem.
- Steps to reproduce the issue.
- Any relevant logs or screenshots.

### Suggesting Enhancements

If you have an idea for an enhancement, please create an issue on GitHub with the following information:

- A clear and descriptive title.
- A detailed description of the enhancement.
- Any relevant examples or mockups.

### Submitting Pull Requests

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Ensure that your code adheres to the project's style guides.
5. Write tests for your changes, if applicable.
6. Commit your changes with a descriptive commit message.
7. Push your changes to your fork.
8. Create a pull request to the main repository.

## Development Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/venkateshramkumarg/ecommerce_backend.git
    cd ecommerce_backend
    ```

2. **Install dependencies**:
    ```sh
    bun install
    ```

3. **Set up the environment variables**:
    Create a `.env` file in the root directory and add your database connection string:
    ```plaintext
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database>?schema=public"
    ```

4. **Run Prisma migrations**:
    ```sh
    npx prisma migrate dev
    ```

5. **Start the development server**:
    ```sh
    bun run dev
    ```

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally.

### Code Style

- Follow the existing code style in the project.
- Use meaningful variable and function names.
- Write comments to explain complex logic.
- Ensure your code is properly formatted and linted.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
