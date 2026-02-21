# Contributing to RemitLend

First off, thank you for considering contributing to RemitLend! It's people like you who make RemitLend a powerful tool for financial inclusion for migrant workers worldwide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
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
- **Describe the exact steps to reproduce the problem** with as much detail as possible
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots or animated GIFs** if relevant
- **Include your environment details**: OS, Node version, browser, wallet extension
- **Include error messages and stack traces** if applicable

**Bug Report Template:**
```markdown
**Description:**
A clear description of the bug.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Environment:**
- OS: [e.g., macOS 13.0]
- Node: [e.g., v18.17.0]
- Browser: [e.g., Chrome 120]
- Wallet: [e.g., Freighter 5.0]

**Additional Context:**
Any other relevant information.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to RemitLend users
- **List any similar features** in other applications if applicable
- **Include mockups or examples** if relevant

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues perfect for newcomers
- `help wanted` - Issues where we need community help
- `documentation` - Documentation improvements

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the development workflow** outlined below
3. **Write clear, commented code** following our style guides
4. **Add tests** if you've added code that should be tested
5. **Update documentation** if you've changed APIs or functionality
6. **Ensure all tests pass** before submitting
7. **Run linters** and fix any issues
8. **Write a clear PR description** explaining your changes

**Pull Request Template:**
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests for new features
- [ ] Updated existing tests

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Development Workflow

### Setting Up Your Development Environment

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/remitlend.git
   cd remitlend
   ```

2. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/original-repo/remitlend.git
   ```

3. **Install dependencies:**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   
   # Contracts
   cd ../contracts && cargo build
   ```

4. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Making Changes

1. **Keep your fork synced:**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Make your changes** in your feature branch

3. **Test your changes:**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Contract tests
   cd contracts && cargo test
   
   # Linting
   cd backend && npm run lint
   cd frontend && npm run lint
   ```

4. **Commit your changes** (see commit guidelines below)

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** from your fork to the main repository

## Style Guides

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(frontend): add loan request form
fix(backend): resolve CORS issue with API endpoints
docs(readme): update installation instructions
test(contracts): add tests for NFT minting
```

**Rules:**
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line
- Provide detailed explanation in the body for complex changes

### TypeScript Style Guide

**General Principles:**
- Use TypeScript strict mode
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names
- Keep functions small and focused on a single task

**React/Frontend:**
```typescript
// Use functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

**Backend/Express:**
```typescript
// Use async/await with proper error handling
import { Request, Response, NextFunction } from 'express';

export const getScore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const score = await scoreService.getScore(userId);
    res.json({ score });
  } catch (error) {
    next(error);
  }
};
```

**Naming Conventions:**
- Use `PascalCase` for types, interfaces, and classes
- Use `camelCase` for variables, functions, and methods
- Use `UPPER_SNAKE_CASE` for constants
- Prefix interfaces with `I` only when necessary for clarity
- Use descriptive names: `getUserById` not `getUser`

**Code Organization:**
- One component/class per file
- Group related functionality together
- Keep imports organized (external, internal, types)
- Export at the bottom of the file when possible

### Rust/Soroban Style Guide

**Follow Rust conventions:**
```rust
// Use snake_case for functions and variables
pub fn mint_nft(env: Env, owner: Address, score: u32) -> Result<(), Error> {
    // Implementation
}

// Use PascalCase for types and structs
pub struct RemittanceData {
    pub score: u32,
    pub history_hash: BytesN<32>,
}

// Use SCREAMING_SNAKE_CASE for constants
const MAX_SCORE: u32 = 1000;
```

**Best Practices:**
- Run `cargo fmt` before committing
- Run `cargo clippy` and address warnings
- Write comprehensive tests for all contract functions
- Document public functions with doc comments
- Use `Result` types for error handling
- Avoid panics in production code

**Documentation:**
```rust
/// Mints a new remittance NFT for the given owner.
///
/// # Arguments
/// * `env` - The contract environment
/// * `owner` - The address that will own the NFT
/// * `score` - The initial credit score (0-1000)
///
/// # Returns
/// * `Ok(())` if successful
/// * `Err(Error)` if minting fails
pub fn mint_nft(env: Env, owner: Address, score: u32) -> Result<(), Error> {
    // Implementation
}
```

## Project Structure

Understanding the project structure helps you navigate and contribute effectively:

```
remitlend/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── schemas/        # Zod validation schemas
│   │   ├── config/         # Configuration files
│   │   └── errors/         # Custom error classes
│   ├── __tests__/          # Backend tests
│   └── package.json
│
├── frontend/               # Next.js web application
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   │   ├── components/ # React components
│   │   │   └── page.tsx   # Main page
│   └── package.json
│
├── contracts/              # Soroban smart contracts
│   ├── remittance_nft/    # NFT contract
│   ├── loan_manager/      # Loan lifecycle contract
│   ├── lending_pool/      # Liquidity pool contract
│   └── Cargo.toml
│
├── ARCHITECTURE.md         # System architecture documentation
├── CONTRIBUTING.md         # This file
├── README.md              # Project overview
└── docker-compose.yml     # Docker configuration
```

## Testing Guidelines

### Backend Testing

Tests are located in `backend/src/__tests__/` and use Jest:

```typescript
import request from 'supertest';
import app from '../app';

describe('GET /api/score/:userId', () => {
  it('should return user score', async () => {
    const response = await request(app)
      .get('/api/score/test-user')
      .expect(200);
    
    expect(response.body).toHaveProperty('score');
  });
});
```

**Run tests:**
```bash
cd backend
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # With coverage
```

### Contract Testing

Tests are located in `contracts/*/src/test.rs`:

```rust
#[test]
fn test_mint_nft() {
    let env = Env::default();
    let contract_id = env.register_contract(None, RemittanceNFT);
    let client = RemittanceNFTClient::new(&env, &contract_id);
    
    let owner = Address::generate(&env);
    let score = 750;
    
    client.mint_nft(&owner, &score);
    
    let retrieved_score = client.get_score(&owner);
    assert_eq!(retrieved_score, score);
}
```

**Run tests:**
```bash
cd contracts
cargo test                  # Run all tests
cargo test -- --nocapture  # Show println! output
```

### Testing Checklist

- [ ] Write unit tests for new functions
- [ ] Write integration tests for API endpoints
- [ ] Test error cases and edge conditions
- [ ] Ensure tests are deterministic (no flaky tests)
- [ ] Mock external dependencies
- [ ] Aim for >80% code coverage on new code

## Commit Message Guidelines

Good commit messages help maintain a clear project history:

**Structure:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Example:**
```
feat(loan-manager): add loan approval workflow

Implement the loan approval process including:
- Validation of borrower credit score
- Check for sufficient pool liquidity
- Transfer funds to borrower wallet
- Update loan status in contract storage

Closes #123
```

**Tips:**
- Keep subject line under 72 characters
- Separate subject from body with a blank line
- Use the body to explain what and why, not how
- Reference issues and PRs in the footer

## Questions?

Don't hesitate to ask questions! You can:
- Open an issue with the `question` label
- Reach out to maintainers
- Check existing issues and discussions

## Recognition

Contributors will be recognized in our README and release notes. Thank you for helping make RemitLend better!

---

Happy coding! 🚀
