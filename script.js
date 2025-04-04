document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const domainInput = document.getElementById('domain-input');
    const searchBtn = document.getElementById('search-btn');
    const googleResults = document.getElementById('google-results');
    const githubResults = document.getElementById('github-results');
    const googleEngineCheckbox = document.getElementById('google-engine');
    const githubEngineCheckbox = document.getElementById('github-engine');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Update active class on tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active class on tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabName}-results`).classList.add('active');
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', () => {
        performSearch();
    });
    
    // Also trigger search on Enter key
    domainInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const domain = domainInput.value.trim();
        
        if (!domain) {
            alert('Please enter a domain name');
            return;
        }
        
        // Clear previous results
        if (googleEngineCheckbox.checked) {
            generateGoogleDorks(domain);
        } else {
            googleResults.innerHTML = '<div class="no-results">Google Dorking is currently disabled</div>';
        }
        
        if (githubEngineCheckbox.checked) {
            generateGithubDorks(domain);
        } else {
            githubResults.innerHTML = '<div class="no-results">GitHub Dorking is currently disabled</div>';
        }
    }
    
    function generateGoogleDorks(domain) {
        // Show loading indicator
        googleResults.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
        
        // Define Google dork queries categorized by type of vulnerability/info
        const googleDorks = [
            // Sensitive Files
            {
                category: 'Sensitive Files',
                query: `site:${domain} ext:log | ext:txt | ext:conf | ext:cnf | ext:ini | ext:env | ext:sh | ext:bak | ext:backup | ext:swp | ext:old | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:htaccess`
            },
            {
                category: 'Configuration Files',
                query: `site:${domain} inurl:wp-config.php | inurl:configuration.php | inurl:config.php | inurl:settings.php | inurl:database.yml`
            },
            {
                category: 'Database Files',
                query: `site:${domain} ext:sql | ext:db | ext:dbf | ext:mdb | ext:sqlite | ext:sqlite3 | ext:pdb`
            },
            {
                category: 'Backup Files',
                query: `site:${domain} ext:bak | ext:backup | ext:bkp | ext:bck | ext:old | ext:save | ext:~ | ext:.save`
            },
            {
                category: 'Log Files',
                query: `site:${domain} ext:log | ext:logs | inurl:log | inurl:logs | inurl:history`
            },
            {
                category: 'Password Files',
                query: `site:${domain} inurl:passwd | inurl:password | inurl:credentials | inurl:auth | inurl:authentication | inurl:login | inurl:pwd`
            },
            
            // Access Points
            {
                category: 'Login Pages',
                query: `site:${domain} inurl:login | inurl:signin | inurl:authenticate | inurl:admin | inurl:backend | inurl:dashboard`
            },
            {
                category: 'Admin Panels',
                query: `site:${domain} inurl:admin | inurl:administrator | inurl:adminpanel | inurl:admindashboard | inurl:control | inurl:panel | inurl:webadmin | inurl:backend`
            },
            {
                category: 'User Portals',
                query: `site:${domain} inurl:user | inurl:account | inurl:profile | inurl:member | inurl:customer | inurl:portal | inurl:private`
            },
            
            // Open Directories & Information Disclosure
            {
                category: 'Open Directories',
                query: `site:${domain} intitle:index.of | intitle:"directory listing" | intitle:"directory of" | intitle:"parent directory"`
            },
            {
                category: 'Exposed Documents',
                query: `site:${domain} ext:pdf | ext:doc | ext:docx | ext:xls | ext:xlsx | ext:ppt | ext:pptx | ext:csv | ext:odt | ext:rtf`
            },
            {
                category: 'Financial Documents',
                query: `site:${domain} filetype:xls | filetype:xlsx intext:"credit card" | intext:"invoice" | intext:"payment" | intext:"financial" | intext:"account"`
            },
            {
                category: 'Employee Information',
                query: `site:${domain} filetype:pdf | filetype:doc | filetype:xls intext:"employee" | intext:"staff" | intext:"salary" | intext:"phone" | intext:"address" | intext:"personnel"`
            },
            
            // API & Development
            {
                category: 'API Documentation',
                query: `site:${domain} inurl:api | inurl:swagger | inurl:api-docs | inurl:developer | inurl:graphql | inurl:endpoint | inurl:method`
            },
            {
                category: 'API Keys & Tokens',
                query: `site:${domain} intext:"api_key" | intext:"api key" | intext:"apikey" | intext:"client_id" | intext:"client_secret" | intext:"access_token" | intext:"secret_key"`
            },
            {
                category: 'Development Files',
                query: `site:${domain} ext:json | ext:xml | ext:yaml | ext:yml | ext:toml | ext:wsdl | ext:wadl | ext:xsd`
            },
            {
                category: 'Git Repositories',
                query: `site:${domain} inurl:.git | inurl:.gitignore | inurl:readme.md | inurl:contributing.md`
            },
            
            // Server & Infrastructure
            {
                category: 'Server Status',
                query: `site:${domain} inurl:server-status | inurl:status | inurl:stats | inurl:phpinfo | inurl:monitor | inurl:monitoring`
            },
            {
                category: 'Server Configuration',
                query: `site:${domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini | ext:env`
            },
            {
                category: 'Database Exposure',
                query: `site:${domain} intext:"sql syntax near" | intext:"syntax error has occurred" | intext:"incorrect syntax near" | intext:"unexpected end of SQL command" | intext:"Warning: mysql_" | intext:"ORA-" | intext:"PostgreSQL query failed:"`
            },
            {
                category: 'Error Pages',
                query: `site:${domain} intext:"error" | intext:"warning" | intext:"syntax error" | intext:"fatal" | intext:"exception" | intext:"stack trace"`
            },
            
            // Vulnerabilities & Security
            {
                category: 'SQL Injection',
                query: `site:${domain} inurl:id= | inurl:pid= | inurl:category= | inurl:page= | inurl:view= | inurl:news= | inurl:main= | inurl:file= | inurl:index= | inurl:show= | inurl:item=`
            },
            {
                category: 'File Upload',
                query: `site:${domain} inurl:upload | inurl:file | inurl:uploader | inurl:attachments | inurl:documents | inurl:downloads`
            },
            {
                category: 'Security Misconfiguration',
                query: `site:${domain} intext:"Unexpected error" | intext:"Fatal error" | intext:"Warning" | intext:"Error occurred" | intext:"uncaught exception" | intext:"Debug"`
            },
            {
                category: 'Test/Staging Environments',
                query: `site:${domain} inurl:test | inurl:dev | inurl:staging | inurl:beta | inurl:demo | inurl:sandbox | inurl:uat | inurl:qa`
            },
            
            // Cloud & Storage
            {
                category: 'Cloud Storage',
                query: `site:${domain} inurl:s3.amazonaws.com | inurl:storage.googleapis.com | inurl:amazonaws.com | inurl:blob.core.windows.net`
            },
            {
                category: 'Exposed Storage',
                query: `site:amazonaws.com | site:blob.core.windows.net | site:digitaloceanspaces.com ${domain}`
            },
            
            // Mail & Communication
            {
                category: 'Mail Server',
                query: `site:${domain} inurl:email | inurl:mail | inurl:webmail | inurl:imap | inurl:smtp | inurl:exchange | inurl:owa | inurl:outlook`
            },
            {
                category: 'Internal Communications',
                query: `site:${domain} inurl:chat | inurl:forum | inurl:board | inurl:message | inurl:internal | inurl:private | inurl:employee | inurl:staff`
            }
        ];
        
        // Generate HTML for Google dorks
        setTimeout(() => { // Simulate loading delay for better UX
            let html = '';
            
            googleDorks.forEach(dork => {
                html += `
                <div class="dork-item" onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(dork.query)}', '_blank')">
                    <span class="dork-category">${dork.category}</span>
                    <div class="dork-query">${dork.query}</div>
                </div>
                `;
            });
            
            googleResults.innerHTML = html;
        }, 500);
    }
    
    function generateGithubDorks(domain) {
        // Show loading indicator
        githubResults.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
        
        // Define GitHub dork queries categorized by type of vulnerability/info
        const githubDorks = [
            // Credentials & Secrets
            {
                category: 'Passwords & Secrets',
                query: `"${domain}" (password OR secret OR credentials OR token OR config OR apikey OR api_key) extension:json extension:xml extension:yml extension:properties extension:env extension:ini`
            },
            {
                category: 'Hard-coded Credentials',
                query: `"${domain}" (password OR passwd OR pwd OR login OR credentials) (filename:config OR filename:settings OR filename:properties OR filename:ini)`
            },
            {
                category: 'API Keys',
                query: `"${domain}" (api_key OR apikey OR api_secret OR apisecret OR client_secret OR client_id OR api_token OR auth_token OR secret_key OR token) NOT example NOT sample`
            },
            {
                category: 'AWS Keys',
                query: `"${domain}" (AKIA OR AKID OR aws_access_key_id OR aws_secret_access_key) -example -test`
            },
            {
                category: 'Google Cloud/Firebase',
                query: `"${domain}" ("AIza" OR "GOCSPX" OR "firebaseConfig" OR "FIREBASE_API_KEY" OR "AAAAm" OR "project_id") extension:js extension:json extension:yml`
            },
            {
                category: 'Azure Secrets',
                query: `"${domain}" ("AZURE_STORAGE_ACCOUNT" OR "AZURE_STORAGE_KEY" OR "AZURE_CONNECTION_STRING" OR "DefaultEndpointsProtocol=https" OR "AccountKey=")`
            },
            {
                category: 'JWT Tokens',
                query: `"${domain}" "eyJ" NOT example NOT test NOT documentation`
            },

            // Connection Strings & Keys
            {
                category: 'Database Connection Strings',
                query: `"${domain}" (jdbc:mysql OR mongodb:// OR redis:// OR postgres:// OR sqlite:// OR dbname= OR username= OR password= OR connectionstring) -example`
            },
            {
                category: 'MongoDB Connection',
                query: `"${domain}" ("mongodb://" OR "mongodb+srv://") -example -test`
            },
            {
                category: 'SQL Connection',
                query: `"${domain}" ("mysql://" OR "postgresql://" OR "sqlserver://" OR "jdbc:mysql" OR "Server=" OR "Database=" OR "Driver=") (password OR pwd OR username OR user)`
            },
            {
                category: 'Private SSH Keys',
                query: `"${domain}" ("BEGIN RSA PRIVATE KEY" OR "BEGIN DSA PRIVATE KEY" OR "BEGIN EC PRIVATE KEY" OR "BEGIN OPENSSH PRIVATE KEY" OR "BEGIN PGP PRIVATE KEY") -example -test`
            },
            {
                category: 'Authorization Tokens',
                query: `"${domain}" ("authorization: Bearer" OR "auth:" OR "token:" OR "access_token:" OR "refresh_token:" OR "apikey:" OR "api_key:")`
            },
            {
                category: 'Certificate Files',
                query: `"${domain}" (extension:pem OR extension:key OR extension:crt OR extension:cer OR extension:p12 OR extension:pfx OR extension:p7b) NOT example NOT test`
            },

            // Configuration Files
            {
                category: 'Environment Files',
                query: `"${domain}" (filename:.env OR filename:.env.local OR filename:.env.development OR filename:.env.production OR filename:.npmrc OR filename:.dockercfg) NOT example NOT test`
            },
            {
                category: 'Web Configuration',
                query: `"${domain}" (filename:web.config OR filename:applicationhost.config OR filename:httpd.conf OR filename:nginx.conf OR filename:sites-available)`
            },
            {
                category: 'App Configuration',
                query: `"${domain}" (filename:config.js OR filename:config.json OR filename:settings.json OR filename:application.json OR filename:appsettings.json) NOT example NOT sample`
            },
            {
                category: 'Kubernetes/Docker Configs',
                query: `"${domain}" (filename:docker-compose.yml OR filename:Dockerfile OR filename:kubernetes.yml OR filename:deployment.yml OR filename:k8s.yml)`
            },
            {
                category: 'WordPress Config',
                query: `"${domain}" filename:wp-config.php`
            },

            // Platform-specific tokens
            {
                category: 'Slack Tokens',
                query: `"${domain}" ("xoxp-" OR "xoxb-" OR "xoxa-" OR "xoxr-") NOT example NOT test`
            },
            {
                category: 'Stripe API Keys',
                query: `"${domain}" ("sk_live_" OR "pk_live_" OR "rk_live_") NOT example NOT test`
            },
            {
                category: 'GitHub/OAuth Tokens',
                query: `"${domain}" ("gho_" OR "ghp_" OR "ghu_" OR "github_token" OR "oauth_token") NOT documentation NOT example`
            },
            {
                category: 'Twilio API Keys',
                query: `"${domain}" "SK" "AC" NOT example (intext:twilio OR intext:TWILIO_AUTH)`
            },
            {
                category: 'SendGrid API Keys',
                query: `"${domain}" ("SG." OR "sendgrid" OR "smtp") (password OR apikey OR api_key OR token)`
            },
            {
                category: 'PayPal/Braintree',
                query: `"${domain}" ("braintree" OR "paypal" OR "merchantId" OR "sandbox") (key OR token OR password OR id)`
            },

            // Internal information
            {
                category: 'Internal URLs',
                query: `"${domain}" ("inurl:internal" OR "inurl:admin" OR "inurl:staging" OR "inurl:dev" OR "inurl:test" OR "inurl:qa" OR "inurl:sandbox" OR "inurl:local" OR "inurl:jenkins" OR "inurl:jira")`
            },
            {
                category: 'Server IPs & Hosts',
                query: `"${domain}" ("ip_addr" OR "ip address" OR "internal_ip" OR "private_ip" OR "host:" OR "hostname:") (192.168 OR 10.0 OR 172.16)`
            },
            {
                category: 'Email/User Data',
                query: `"${domain}" (filename:users.txt OR filename:emails.txt OR filename:credentials.txt OR filename:users.csv OR filename:emails.csv) extension:txt extension:csv extension:xls`
            },
            {
                category: 'Infrastructure Info',
                query: `"${domain}" (intext:"infrastructure" OR intext:"servers" OR intext:"database") (intext:"config" OR intext:"architecture" OR intext:"setup" OR intext:"admin")`
            },

            // Development & Code
            {
                category: 'Source Code',
                query: `"${domain}" extension:php extension:js extension:py extension:java extension:go extension:cs NOT example NOT test`
            },
            {
                category: 'Mobile App Source',
                query: `"${domain}" (extension:swift OR extension:kt OR extension:java OR extension:gradle OR extension:plist extension:xml "android")`
            },
            {
                category: 'Backend APIs',
                query: `"${domain}" (route OR routes OR api OR controller OR handler OR endpoint) (function OR class OR def OR async) extension:js extension:php extension:py extension:java extension:go`
            },
            {
                category: 'Common Vulnerabilities',
                query: `"${domain}" ("sql injection" OR "xss" OR "csrf" OR "rce" OR "cross-site" OR "vulnerability" OR "CVE" OR "exploit" OR "hack" OR "bypass" OR "overflow")`
            },
            {
                category: 'WordPress Vulnerabilities',
                query: `"${domain}" (wp-content OR wp-admin OR wp-includes OR wp-config.php) (vulnerability OR plugin OR theme) file:php`
            },
            {
                category: 'Debug/Dev Information',
                query: `"${domain}" ("debug" OR "development" OR "staging" OR "test" OR "todo" OR "fixme") (username OR password OR token OR key OR secret)`
            }
        ];
        
        // Generate HTML for GitHub dorks
        setTimeout(() => { // Simulate loading delay for better UX
            let html = '';
            
            githubDorks.forEach(dork => {
                html += `
                <div class="dork-item" onclick="window.open('https://github.com/search?q=${encodeURIComponent(dork.query)}&type=code', '_blank')">
                    <span class="dork-category">${dork.category}</span>
                    <div class="dork-query">${dork.query}</div>
                </div>
                `;
            });
            
            githubResults.innerHTML = html;
        }, 500);
    }
});