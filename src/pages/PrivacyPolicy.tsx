import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <article className="space-y-8">
          <header className="space-y-2 mb-12">
            <h1 className="text-3xl font-bold">Privacy Policy - ChimpDAO</h1>
            <p className="text-muted-foreground">Last Updated: January 2026 • Effective: January 2026</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Consulting Manao GmbH ("Company", "we", "us", "our") operates the ChimpDAO platform, which includes the nft.chimpdao.xyz website ("Website", "Service") and the Chimp iOS application ("App", "Service"). We are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) and Austrian data protection laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Minimal Data Collection:</strong> Our Services involve minimal personal data collection. We do not operate backend servers or databases for user data storage. All user data is stored locally on your device (browser storage for the Website, iOS Keychain and UserDefaults for the App) or on-chain (Stellar blockchain). We do not use analytics, tracking, or third-party data collection services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Contact Information:</strong><br />
              Consulting Manao GmbH<br />
              FN 571029z<br />
              Email: <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Related Documents:</strong> For information about intellectual property rights and licensing for ChimpDAO NFTs, please see our <Link to="/terms" className="text-primary hover:underline">Intellectual Property Rights & Licensing Guidelines</Link> (or <Link to="/terms" className="text-primary hover:underline">Terms</Link>).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Data Controller</h2>
            <p className="text-muted-foreground leading-relaxed">
              Consulting Manao GmbH is the data controller responsible for processing your personal data in connection with our Services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Types of Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important:</strong> We do not operate backend servers or databases for user data storage. All data is either:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Stored locally on your device using browser storage (Website) or iOS Keychain (encrypted, device-only) and UserDefaults (local preferences) (App)</li>
              <li>Stored on-chain via the Stellar blockchain (publicly visible and permanent)</li>
              <li>Stored on decentralized IPFS networks (publicly accessible for NFT metadata)</li>
            </ul>

            <h3 className="text-lg font-medium mt-6">3.1 Data You Provide Directly</h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Wallet Information:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Stellar wallet private keys (stored in browser storage for Website, iOS Keychain for App, encrypted, device-only)</li>
              <li>Stellar wallet public addresses (stored in browser local storage for Website, UserDefaults for App)</li>
              <li>Wallet connection preferences</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Service Configuration:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Network selection (testnet/mainnet)</li>
              <li>Contract ID preferences</li>
              <li>Admin mode settings (if applicable, App only)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">User Responsibility:</strong> You are responsible for ensuring your wallet keys are kept secure. We do not have access to your private keys, which are stored exclusively on your device.
            </p>

            <h3 className="text-lg font-medium mt-6">3.2 Data Collected Automatically</h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Blockchain Data</strong> (publicly visible on Stellar Network):
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Transaction hashes and timestamps</li>
              <li>Smart contract interaction data</li>
              <li>NFT ownership records</li>
              <li>Token transfer history</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">NFC Chip Data</strong> (App only, read only, not stored):
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Chip public keys (read from NFC chips for authentication)</li>
              <li>Contract IDs embedded in NFC chips</li>
              <li>Token IDs associated with chips</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Technical Data:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Device Information:</strong> Browser type and version (Website), iOS version and device model (App, collected by Apple App Store for distribution)</li>
              <li><strong className="text-foreground">Usage:</strong> No analytics or tracking. We do not collect usage patterns or user behavior data.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Local Storage</strong> (stored on your device only):
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Website:</strong> Browser local storage for wallet addresses and preferences</li>
              <li><strong className="text-foreground">App (iOS Keychain):</strong> Private keys stored with <code className="text-xs bg-muted px-1 py-0.5 rounded">kSecAttrAccessibleWhenUnlockedThisDeviceOnly</code> (encrypted, device-only, never synced)</li>
              <li><strong className="text-foreground">App (UserDefaults):</strong> Wallet addresses, network preferences, contract IDs (local device storage, cleared when app is deleted)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">IPFS Data</strong> (publicly accessible):
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>NFT metadata and images fetched from IPFS networks</li>
              <li>Content Identifiers (CIDs) for NFT content</li>
              <li>Content metadata and timestamps</li>
            </ul>

            <h3 className="text-lg font-medium mt-6">3.3 Data from Third-Party Services</h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Stellar Network:</strong> Account balances and transaction history (public blockchain data), network fees and transaction status, account metadata.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">IPFS Networks:</strong> NFT metadata and images (publicly accessible content), content distributed across decentralized IPFS network.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Website Hosting:</strong> Server logs (IP addresses, access timestamps) collected by our hosting provider for operational and security purposes. No persistent tracking or profiling.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">App Distribution</strong> (App only): Apple App Store collects device information for distribution purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Legal Basis for Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We process your personal data based on the following legal grounds under GDPR:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Contract Performance (Article 6(1)(b)):</strong> Processing necessary for providing our wallet and NFT management services, including wallet creation, NFT claiming, transferring, and signing operations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Legitimate Interest (Article 6(1)(f)):</strong> Processing for service security, fraud prevention, and service functionality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Consent (Article 6(1)(a)):</strong> For optional features like service configuration preferences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Legal Obligation (Article 6(1)(c)):</strong> Compliance with Austrian and EU legal requirements, including anti-money laundering and sanctions screening.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">No Automated Decision-Making:</strong> We do not engage in automated decision-making or profiling with legal effects.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. How We Use Your Data</h2>
            <h3 className="text-lg font-medium mt-4">5.1 Service Provision</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Wallet Management:</strong> Creating and maintaining your Stellar wallet connection</li>
              <li><strong className="text-foreground">NFT Operations:</strong> Facilitating NFT claiming, transferring, minting, and viewing</li>
              <li><strong className="text-foreground">NFC Authentication</strong> (App only): Reading NFC chips to authenticate and interact with physical merchandise</li>
              <li><strong className="text-foreground">Blockchain Transactions:</strong> Executing transactions on the Stellar network</li>
              <li><strong className="text-foreground">Website Functionality:</strong> Providing website features and content</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">5.2 Platform Operations</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Security:</strong> Protecting your wallet and transaction data</li>
              <li><strong className="text-foreground">Support:</strong> Providing technical support and resolving issues</li>
              <li><strong className="text-foreground">Service Improvement:</strong> Understanding and improving our services (without tracking individual users)</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">5.3 Legal Compliance</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Regulatory Requirements:</strong> Complying with Austrian and EU laws</li>
              <li><strong className="text-foreground">Sanctions Screening:</strong> Checking against restricted jurisdiction lists</li>
              <li><strong className="text-foreground">Audit Trail:</strong> Maintaining records for transparency and accountability</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Data Sharing and Third-Party Services</h2>
            <h3 className="text-lg font-medium mt-4">6.1 Third-Party Service Providers</h3>
            <p className="text-muted-foreground leading-relaxed">
              We interact with third-party services necessary for operations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Stellar Network:</strong> Public blockchain for transaction processing</li>
              <li><strong className="text-foreground">IPFS Networks:</strong> Decentralized storage for NFT metadata</li>
              <li><strong className="text-foreground">Website Hosting:</strong> Hosting provider for website infrastructure (server logs)</li>
              <li><strong className="text-foreground">Apple App Store</strong> (App only): Distribution and device information (collected by Apple)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">No Data Processing Agreements Required:</strong> We do not share personal data with third-party processors for marketing or analytics. All user data remains on your device or on public blockchains.
            </p>
            <h3 className="text-lg font-medium mt-4">6.2 No Backend Data Storage</h3>
            <p className="text-muted-foreground leading-relaxed">
              We do not store any user data on our own servers. All user data exists on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Your device's browser storage (Website)</li>
              <li>Your device's iOS Keychain (encrypted, device-only) (App)</li>
              <li>Your device's UserDefaults (local preferences) (App)</li>
              <li>The Stellar blockchain (permanent, public, immutable)</li>
              <li>IPFS networks (distributed, public, persistent)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Server Logs:</strong> Our hosting provider may maintain server logs (IP addresses, access timestamps) for operational and security purposes, but these are not used for user tracking or profiling.
            </p>
            <h3 className="text-lg font-medium mt-4">6.3 Legal Requirements</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may disclose your data when required by law, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Compliance with Austrian or EU legal obligations</li>
              <li>Response to valid legal requests from authorities</li>
              <li>Protection of our rights and the rights of other users</li>
              <li>Prevention of fraud or illegal activities</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">6.4 No Sale of Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, rent, or trade your personal data to third parties for commercial purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Data Security</h2>
            <h3 className="text-lg font-medium mt-4">7.1 Security Measures</h3>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Encryption:</strong> Private keys stored using secure, encrypted storage (browser storage for Website, iOS Keychain for App)</li>
              <li><strong className="text-foreground">No Network Transmission:</strong> Private keys never leave your device</li>
              <li><strong className="text-foreground">Access Controls:</strong> Limited access to personal data on a need-to-know basis</li>
              <li><strong className="text-foreground">Secure Coding Practices:</strong> Following security best practices</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">7.2 Blockchain Security</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Non-Custodial:</strong> We do not store or have access to your private keys</li>
              <li><strong className="text-foreground">Device-Only Storage:</strong> Private keys exist only on your device</li>
              <li><strong className="text-foreground">Public Transparency:</strong> Blockchain transactions are publicly verifiable</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">7.3 NFC Security (App only)</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Read-Only Operations:</strong> We only read data from NFC chips, never write or store chip data</li>
              <li><strong className="text-foreground">Local Processing:</strong> All NFC operations occur locally on your device</li>
              <li><strong className="text-foreground">No Chip Data Storage:</strong> Chip public keys and identifiers are not stored after use</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">7.4 Data Breach Response</h3>
            <p className="text-muted-foreground leading-relaxed">
              In the event of a data breach, we will notify relevant authorities within 72 hours (GDPR Article 33) and inform affected users without undue delay (GDPR Article 34).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Your Rights Under GDPR</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the following rights regarding your personal data:
            </p>
            <h3 className="text-lg font-medium mt-4">8.1 Right of Access (Article 15)</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can request information about the personal data we process about you, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Categories of data processed</li>
              <li>Purposes of processing</li>
              <li>Recipients of your data</li>
              <li>Retention periods</li>
              <li>Your rights regarding the data</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">8.2 Right to Rectification (Article 16)</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can request correction of inaccurate or incomplete personal data.
            </p>
            <h3 className="text-lg font-medium mt-4">8.3 Right to Erasure (Article 17)</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can request deletion of your personal data in certain circumstances, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Data no longer necessary for original purposes</li>
              <li>Withdrawal of consent</li>
              <li>Unlawful processing</li>
              <li>Objection to processing</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Technical Limitations:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Blockchain Data:</strong> Permanently recorded and immutable (GDPR Article 17(3)(b) exception for data made public by the data subject)</li>
              <li><strong className="text-foreground">IPFS Content:</strong> Cannot be deleted once uploaded to the decentralized IPFS network</li>
              <li><strong className="text-foreground">Local Device Data:</strong> You can delete all local data by clearing browser storage (Website) or uninstalling the app (App), which removes:
                <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed ml-6 mt-2">
                  <li>All data from browser storage (Website)</li>
                  <li>All data from iOS Keychain (private keys) (App)</li>
                  <li>All data from UserDefaults (wallet addresses, preferences) (App)</li>
                </ul>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">User Control:</strong> You can delete your wallet connection and all local data at any time by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Clearing browser storage (Website)</li>
              <li>Using the "Delete Wallet" function in the app settings (App)</li>
              <li>Uninstalling the app (App, removes all local data)</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">8.4 Right to Restrict Processing (Article 18)</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can request limitation of data processing in certain situations.
            </p>
            <h3 className="text-lg font-medium mt-4">8.5 Right to Data Portability (Article 20)</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can request a copy of your data in a structured, machine-readable format. Note: Private keys cannot be exported for security reasons, but you can export your wallet address and transaction history.
            </p>
            <h3 className="text-lg font-medium mt-4">8.6 Right to Object (Article 21)</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can object to processing based on legitimate interests or for direct marketing purposes.
            </p>
            <h3 className="text-lg font-medium mt-4">8.7 Rights Related to Automated Decision-Making (Article 22)</h3>
            <p className="text-muted-foreground leading-relaxed">
              You have rights regarding automated decision-making, though our Services do not use automated decision-making for individual users.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Exercising Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              To exercise your rights, contact us at:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Email:</strong> <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a><br />
              <strong className="text-foreground">Subject:</strong> Data Protection Request - ChimpDAO
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We will respond to your request within one month (GDPR Article 12(3)). We may request verification of your identity to protect your privacy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">10. Data Retention and Deletion</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Blockchain Data:</strong> Permanently recorded (GDPR Article 17(3)(b) exception for data made public by the data subject).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">IPFS Content:</strong> Persists indefinitely on decentralized network; we cannot delete once uploaded.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Local Device Data:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Website (Browser Storage):</strong> Retained until you clear browser storage or disable the website</li>
              <li><strong className="text-foreground">App (iOS Keychain):</strong> Retained until you delete the wallet or uninstall the app</li>
              <li><strong className="text-foreground">App (UserDefaults):</strong> Retained until you clear app data or uninstall the app</li>
              <li><strong className="text-foreground">Uninstall/Clear:</strong> Removing the app or clearing browser storage deletes all local data</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Server Logs:</strong> Retained by our hosting provider for operational and security purposes, typically for a limited period (usually 30-90 days).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Tax Records:</strong> 7 years per Austrian Federal Fiscal Code (BAO) §132 and §212, if applicable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Deletion Limitations:</strong> Blockchain and IPFS data cannot be deleted. We can only help you understand how to manage your local device data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">11. International Data Transfers</h2>
            <h3 className="text-lg font-medium mt-4">11.1 Data Transfers</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your data may be transferred to and processed in countries outside the EU/EEA, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">IPFS Networks:</strong> Global decentralized storage networks</li>
              <li><strong className="text-foreground">Stellar Network:</strong> Distributed blockchain network</li>
              <li><strong className="text-foreground">Website Hosting:</strong> Hosting provider may process server logs in various locations</li>
              <li><strong className="text-foreground">Apple Services</strong> (App only): United States-based service provider (App Store, device information)</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">11.2 Safeguards</h3>
            <p className="text-muted-foreground leading-relaxed">
              We ensure appropriate safeguards for international transfers through adequacy decisions, standard contractual clauses where applicable, and technical measures (encrypted storage).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">12. NFC Functionality (App only)</h2>
            <h3 className="text-lg font-medium mt-4">12.1 NFC Permissions</h3>
            <p className="text-muted-foreground leading-relaxed">
              The App requires NFC (Near Field Communication) access to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Read data from NFC chips embedded in physical merchandise</li>
              <li>Authenticate chip public keys for NFT operations</li>
              <li>Read contract IDs and token information from chips</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">12.2 NFC Data Handling</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li><strong className="text-foreground">Read-Only:</strong> We only read data from NFC chips; we do not write data to chips</li>
              <li><strong className="text-foreground">No Storage:</strong> Chip data (public keys, contract IDs) is not stored after use</li>
              <li><strong className="text-foreground">Local Processing:</strong> All NFC operations occur locally on your device</li>
              <li><strong className="text-foreground">Privacy:</strong> NFC chip data is used only for authentication and is not shared with third parties</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">12.3 NFC Usage Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              The App displays "Allow to scan tags" when requesting NFC access.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">13. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">No Cookies for Tracking:</strong> We do not use cookies or tracking technologies for analytics, advertising, or user profiling.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Essential Cookies:</strong> Our hosting provider may use essential cookies for website functionality (e.g., session management), but these are not used for tracking or profiling.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Browser Storage:</strong> We use browser local storage for wallet connection and preferences (Website only). This data is stored locally on your device and is not shared with third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">14. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for children under 18. We do not knowingly collect personal data from children under 18. If we become aware that we have collected data from a child under 18, we will take steps to delete such information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">15. Changes to This Privacy Policy</h2>
            <h3 className="text-lg font-medium mt-4">15.1 Updates</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy to reflect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Changes in our data processing practices</li>
              <li>New legal requirements</li>
              <li>Service feature updates</li>
              <li>Security improvements</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">15.2 Notification</h3>
            <p className="text-muted-foreground leading-relaxed">
              We will notify you of significant changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
              <li>Posting the updated policy on the Website</li>
              <li>Updating the "Last Updated" date</li>
              <li>Displaying notices in the App (if applicable)</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">15.3 Continued Use</h3>
            <p className="text-muted-foreground leading-relaxed">
              Continued use of our Services after policy updates constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">16. Data Protection Officer</h2>
            <p className="text-muted-foreground leading-relaxed">
              As a small GmbH, we are not required to appoint a Data Protection Officer under GDPR Article 37, but privacy inquiries can be directed to <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Why No DPO Required:</strong> Under GDPR Article 37(1), DPO appointment is mandatory only for public authorities or organizations with large-scale processing. Our Services operate with minimal data collection and no backend user data storage, thus not meeting these thresholds.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">17. Supervisory Authority</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to lodge a complaint with the Austrian Data Protection Authority:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Austrian Data Protection Authority</strong><br />
              Barichgasse 40-42<br />
              1030 Vienna, Austria<br />
              Website: <a href="https://dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dsb.gv.at</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">18. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any questions about this Privacy Policy or our data practices:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Consulting Manao GmbH</strong><br />
              Registered in Austrian Commercial Register (Firmenbuch)<br />
              Landesgericht Graz, FN 571029z<br />
              VAT ID: ATU77780135<br />
              Managing Director: Pamphile Tupui Christophe Roy
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Contact:</strong><br />
              Email: <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
            </p>
          </section>

          <footer className="pt-8 mt-12 border-t border-border/50 text-sm text-muted-foreground">
            <p>Last Updated: January 2026</p>
            <p className="mt-4">© 2026 Consulting Manao GmbH. All rights reserved.</p>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
