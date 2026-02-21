# Contributing to RemitLend

First off, thank you for considering contributing to RemitLend! It's people like you who make RemitLend a powerful tool for providing fair lending access to migrant workers worldwide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Branching Strategy](#branching-strategy)
- [Development Workflow](#development-workflow)
- [Style Guides](#style-guides)
- [Project Structure](#project-structure)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and harassment-free environment for everyone. We are committed to providing a welcoming experience for contributors of all backgrounds and skill levels.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title** for the issue
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots or animated GIFs** if relevant
- **Include your environment details**: OS, Node version, browser, wallet extension

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to RemitLend users

## Branching Strategy

To keep our repository organized, please follow this naming convention for your branches:
- **Features**: `feat/short-description` (e.g., `feat/lender-dashboard`)
- **Bug Fixes**: `fix/short-description` (e.g., `fix/nft-minting-error`)
- **Documentation**: `docs/short-description` (e.g., `docs/update-architecture-diagram`)
- **Refactoring**: `refactor/short-description` (e.g., `refactor/loan-state-machine`)

*Note: Always branch off of the latest `main` branch.*

## Development Workflow

1. **Fork the repository** and create your branch from `main`
2. **Setup your environment** (see README.md)
3. **Write clear, commented code** following our style guides
4. **Add tests** if you've added new features or logic
5. **Update documentation** if you've changed APIs or functionality
6. **Ensure all tests pass** before submitting
7. **Run linters** (`npm run lint`, `cargo fmt`)
8. **Write a clear PR description** explaining your changes

### Local Quality Standards

Before submitting a Pull Request, verify:
- **Frontend**: `npm run lint` and `npm run format` (if available).
- **Backend**: `npm run lint` and `npm run test`.
- **Contracts**: `cargo fmt`, `cargo clippy`, and `cargo test`.

## Style Guides

### Git Commit Messages

We strictly follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

Format: `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
- `feat(contracts): add flash loan prevention to lending pool`
- `fix(frontend): resolve wallet connection timeout`
- `docs(readme): add docker setup instructions`

### Code Style
- **TypeScript**: Use functional components and hooks. Prefer `interface` over `type`. Ensure strict typing.
- **Rust**: Follow standard Rust naming conventions and run `cargo fmt`.

## Project Structure

Refer to the `README.md` for a detailed breakdown of the monorepo structure.

## Review Process

Once you submit your PR, a maintainer will review it. Be prepared to engage in discussion and make requested changes. Once approved, a maintainer will merge your code into `main`.

Thank you for contributing to RemitLend! 🚀
