# DorkHunter - Advanced Dorking Tool for Bug Bounty Hunters

A web-based tool for bug bounty hunters and security researchers to quickly generate Google and GitHub dorking queries for a target domain. DorkHunter helps streamline the reconnaissance phase by providing ready-to-use dorks that can uncover sensitive information, potential vulnerabilities, and entry points.

## Enhanced Features

- **Comprehensive Google Dorking**: Generate specialized Google dork queries categorized into 8 major vulnerability types
- **Advanced GitHub Dorking**: Powerful GitHub dork queries to find sensitive information in code repositories with specialized categories
- **Matrix-style Cybersecurity UI**: Immersive hacker-themed user interface with matrix animation
- **One-Click Search**: Click on any dork to open the search results directly in Google or GitHub
- **Category-Based Organization**: Dorks organized into logical categories for better reconnaissance workflow
- **Pro Dorking Tips**: Helpful tips for effective dorking techniques
- **Mobile-Friendly Design**: Clean, responsive design that works on all devices

## Categories of Dorks

### Google Dorking Categories:
- Sensitive Files
- Configuration Files
- Database Files
- Backup Files
- Log Files
- Password Files
- Login Pages
- Admin Panels
- User Portals
- Open Directories
- Exposed Documents
- Financial Documents
- API Documentation
- API Keys & Tokens
- Git Repositories
- Server Status
- Server Configuration
- Database Exposure
- Error Pages
- SQL Injection
- File Upload
- Security Misconfiguration
- Test/Staging Environments
- Cloud Storage
- Exposed Storage
- Mail Server
- Internal Communications

### GitHub Dorking Categories:
- Passwords & Secrets
- Hard-coded Credentials
- API Keys
- AWS Keys
- Google Cloud/Firebase
- Azure Secrets
- JWT Tokens
- Database Connection Strings
- MongoDB Connection
- SQL Connection
- Private SSH Keys
- Authorization Tokens
- Certificate Files
- Environment Files
- Web Configuration
- App Configuration
- Kubernetes/Docker Configs
- WordPress Config
- Slack Tokens
- Stripe API Keys
- GitHub/OAuth Tokens
- Twilio API Keys
- SendGrid API Keys
- PayPal/Braintree
- Internal URLs
- Server IPs
- Email/User Data
- Infrastructure Info
- Source Code
- Mobile App Source
- Backend Code
- Security Issues

## How to Use

1. Enter a target domain (e.g., example.com) in the input field
2. Select which dorking engines you want to use (Google, GitHub, or both)
3. Click the "Hunt" button to generate dorking queries
4. Click on any of the generated dorks to open the search results in a new tab
5. Use the tabs to switch between Google and GitHub dorks
6. Refer to the Pro Dorking Tips section for advanced techniques

## Host on GitHub Pages

This project is designed to be easily hosted on GitHub Pages:

1. Push the code to a GitHub repository
2. Go to repository Settings > Pages
3. Select the branch you want to deploy from (usually `main`)
4. Your DorkHunter tool will be available at https://[your-username].github.io/[repo-name]/

## Disclaimer

This tool is created for **educational purposes only**. It is intended for ethical security research, bug bounty hunting, and improving the security posture of systems you have proper authorization to test.

**Do NOT use this tool to:**
- Access unauthorized information
- Perform illegal activities
- Target systems without proper authorization

The creator of this tool is not responsible for any misuse or damage caused by using this tool.

## Credits

Developed by CyberTechAjju

## License

This project is licensed under the MIT License - see the LICENSE file for details. 