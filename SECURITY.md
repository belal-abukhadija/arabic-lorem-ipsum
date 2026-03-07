# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Publicly Disclose

Please do not create a public GitHub issue for security vulnerabilities.

### 2. Contact Us Privately

Send an email to: **security@example.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Fix & Disclosure**: Coordinated with reporter

## Security Best Practices

### For Users

1. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm update
   ```

2. **Use HTTPS**: Always use HTTPS in production

3. **Environment Variables**: Never commit secrets to version control

4. **Rate Limiting**: Keep API rate limits enabled

### For Developers

1. **Input Validation**: All user inputs are validated with Zod

2. **CORS**: Configure appropriate CORS origins

3. **Dependencies**: Regularly update and audit dependencies

4. **Secrets Management**:
   - Use environment variables
   - Rotate JWT secrets regularly
   - Use strong random values

## Known Security Considerations

### API Rate Limiting
- Default: 100 requests per 15 minutes
- Configurable via environment variables
- Per-IP address tracking

### Data Storage
- Currently in-memory (no persistent storage)
- No sensitive user data collected
- API logs do not contain sensitive information

### Authentication (Future)
- JWT-based authentication planned
- bcrypt password hashing
- Secure session management

## Security Updates

Security updates will be:
1. Released as patch versions
2. Documented in CHANGELOG.md
3. Announced via GitHub releases
4. Tagged with `security` label

## Scope

This security policy applies to:
- Main application code
- API endpoints
- Dependencies
- Documentation

Out of scope:
- Third-party integrations
- User's deployment environments
- Social engineering attacks

## Acknowledgments

We appreciate responsible disclosure and will acknowledge reporters:
- In release notes (with permission)
- In SECURITY.md (with permission)

---

Thank you for helping keep Arabic Lorem Ipsum Generator secure! 🔒
