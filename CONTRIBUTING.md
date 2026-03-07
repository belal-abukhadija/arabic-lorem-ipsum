# Contributing to Arabic Lorem Ipsum Generator

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating a new issue
3. **Include**:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS, Node version)

### Suggesting Features

1. **Check existing feature requests**
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Consider alternatives** you've explored

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Ensure all tests pass**: `npm test`
6. **Follow code style** guidelines
7. **Commit with clear messages**: `git commit -m "Add amazing feature"`
8. **Push to your fork**: `git push origin feature/amazing-feature`
9. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/arabic-lorem.git
cd arabic-lorem

# Install dependencies
npm install
cd api && npm install && cd ..

# Start development
npm run dev           # Frontend
cd api && npm run dev # Backend (in another terminal)

# Run tests
npm test
```

## Code Style

### TypeScript/JavaScript
- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for public functions
- Keep functions small and focused

### React Components
- Use functional components with hooks
- Keep components under 200 lines
- Extract reusable logic into custom hooks
- Use proper TypeScript types for props

### CSS/Styling
- Use Tailwind utility classes
- Follow mobile-first approach
- Ensure RTL support for Arabic text
- Test responsive design

## Testing Guidelines

### Unit Tests
```typescript
// Test file naming: ComponentName.test.tsx
describe('Component Name', () => {
  it('should do something specific', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Test Coverage
- Aim for 70%+ coverage
- Focus on critical business logic
- Test edge cases and error handling

## Commit Messages

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(generator): add French language support

Add vocabulary and grammar rules for French text generation.
Includes new theme options specific to French content.

Closes #123
```

## Project Structure

```
src/
├── components/       # React components
├── lib/             # Core business logic
├── __tests__/       # Test files
└── types/           # TypeScript type definitions

api/
└── src/
    ├── routes/      # API endpoints
    ├── middleware/  # Express middleware
    └── types/       # API type definitions
```

## Adding New Features

### New Text Generation Theme

1. Add vocabulary in `src/lib/textGenerator.ts`:
```typescript
const ARABIC_WORDS = {
  nouns: {
    // ... existing themes
    newtheme: [
      'word1', 'word2', 'word3'
    ]
  }
};
```

2. Update type definitions
3. Add tests
4. Update documentation

### New Output Format

1. Add format type in `textGenerator.ts`
2. Implement formatting logic in `formatOutput()`
3. Add UI option in `ControlPanel.tsx`
4. Add tests
5. Update API documentation

## Documentation

- Update README.md for user-facing changes
- Update API_DOCS.md for API changes
- Add JSDoc comments to new functions
- Include code examples

## Review Process

1. **Automated checks** must pass (tests, linting)
2. **Code review** by maintainer(s)
3. **Testing** in various environments
4. **Documentation** review
5. **Merge** when approved

## Release Process

1. Version bump in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag release: `git tag v1.x.x`
5. Deploy to production

## Getting Help

- **Questions**: Open a discussion on GitHub
- **Chat**: Join our Discord/Slack (if available)
- **Email**: dev@example.com

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing! 🎉
