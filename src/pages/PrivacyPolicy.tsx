import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy - Chimp</h1>

          <p className="text-muted-foreground">
            <strong>Last Updated: January 2026</strong>
            <br />
            <strong>Effective: January 2026</strong>
          </p>

          <h2>1. Introduction</h2>
          <p>
            Consulting Manao GmbH ("Company", "we", "us") operates the Chimp iOS application ("App", "Service") for the Stellar Merch Shop platform. We are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) and Austrian data protection laws.
          </p>
          <p>
            <strong>Minimal Data Collection</strong>: Our App involves minimal personal data collection. We do not operate backend servers or databases. All user data is stored locally on your device (iOS Keychain and UserDefaults) or on-chain (Stellar blockchain). We do not use analytics, tracking, or third-party data collection services.
          </p>
          <p>
            <strong>Contact Information</strong>:
            <br />
            Consulting Manao GmbH
            <br />
            FN 571029z
            <br />
            Email: <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
          </p>

          <h2>2. Data Controller</h2>
          <p>
            Consulting Manao GmbH is the data controller responsible for processing your personal data in connection with the Chimp App.
          </p>

          <h2>3. Types of Data We Collect</h2>
          <p>
            <strong>Important</strong>: We do not operate backend servers or databases. All data is either:
          </p>
          <ul>
            <li>Stored locally on your device using iOS Keychain (encrypted, device-only) or UserDefaults (local preferences)</li>
            <li>Stored on-chain via the Stellar blockchain (publicly visible and permanent)</li>
            <li>Stored on decentralized IPFS networks (publicly accessible for NFT metadata)</li>
          </ul>

          <h3>3.1 Data You Provide Directly</h3>
          <p><strong>Wallet Information</strong>:</p>
          <ul>
            <li>Stellar wallet private keys (stored in iOS Keychain, encrypted, device-only)</li>
            <li>Stellar wallet public addresses (stored in UserDefaults, local device storage)</li>
            <li>Wallet connection preferences</li>
          </ul>
          <p><strong>App Configuration</strong>:</p>
          <ul>
            <li>Network selection (testnet/mainnet)</li>
            <li>Contract ID preferences</li>
            <li>Admin mode settings (if applicable)</li>
          </ul>
          <p>
            <strong>User Responsibility</strong>: You are responsible for ensuring your wallet keys are kept secure. We do not have access to your private keys, which are stored exclusively in your device's Keychain.
          </p>

          <h3>3.2 Data Collected Automatically</h3>
          <p><strong>Blockchain Data</strong> (publicly visible on Stellar Network):</p>
          <ul>
            <li>Transaction hashes and timestamps</li>
            <li>Smart contract interaction data</li>
            <li>NFT ownership records</li>
            <li>Token transfer history</li>
          </ul>
          <p><strong>NFC Chip Data</strong> (read only, not stored):</p>
          <ul>
            <li>Chip public keys (read from NFC chips for authentication)</li>
            <li>Contract IDs embedded in NFC chips</li>
            <li>Token IDs associated with chips</li>
          </ul>
          <p><strong>Technical Data</strong>:</p>
          <ul>
            <li><strong>Device Information</strong>: iOS version, device model (collected by Apple App Store for distribution)</li>
            <li><strong>App Usage</strong>: No analytics or tracking. We do not collect usage patterns or user behavior data.</li>
          </ul>
          <p><strong>Local Storage</strong> (stored on your device only):</p>
          <ul>
            <li><strong>iOS Keychain</strong>: Private keys stored with <code>kSecAttrAccessibleWhenUnlockedThisDeviceOnly</code> (encrypted, device-only, never synced)</li>
            <li><strong>UserDefaults</strong>: Wallet addresses, network preferences, contract IDs (local device storage, cleared when app is deleted)</li>
          </ul>
          <p><strong>IPFS Data</strong> (publicly accessible):</p>
          <ul>
            <li>NFT metadata and images fetched from IPFS networks</li>
            <li>Content Identifiers (CIDs) for NFT content</li>
            <li>Content metadata and timestamps</li>
          </ul>

          <h3>3.3 Data from Third-Party Services</h3>
          <p><strong>Stellar Network</strong>:</p>
          <ul>
            <li>Account balances and transaction history (public blockchain data)</li>
            <li>Network fees and transaction status</li>
            <li>Account metadata</li>
          </ul>
          <p><strong>IPFS Networks</strong>:</p>
          <ul>
            <li>NFT metadata and images (publicly accessible content)</li>
            <li>Content distributed across decentralized IPFS network</li>
          </ul>

          <h2>4. Legal Basis for Processing</h2>
          <p>We process your personal data based on the following legal grounds under GDPR:</p>
          <p>
            <strong>Contract Performance (Article 6(1)(b))</strong>: Processing necessary for providing our wallet and NFT management services, including wallet creation, NFT claiming, transferring, and signing operations.
          </p>
          <p>
            <strong>Legitimate Interest (Article 6(1)(f))</strong>: Processing for app security, fraud prevention, and service functionality.
          </p>
          <p>
            <strong>Consent (Article 6(1)(a))</strong>: For optional features like app configuration preferences.
          </p>
          <p>
            <strong>Legal Obligation (Article 6(1)(c))</strong>: Compliance with Austrian and EU legal requirements, including anti-money laundering and sanctions screening.
          </p>
          <p>
            <strong>No Automated Decision-Making</strong>: We do not engage in automated decision-making or profiling with legal effects.
          </p>

          <h2>5. How We Use Your Data</h2>
          <h3>5.1 Service Provision</h3>
          <ul>
            <li><strong>Wallet Management</strong>: Creating and maintaining your Stellar wallet</li>
            <li><strong>NFT Operations</strong>: Facilitating NFT claiming, transferring, minting, and viewing</li>
            <li><strong>NFC Authentication</strong>: Reading NFC chips to authenticate and interact with physical merchandise</li>
            <li><strong>Blockchain Transactions</strong>: Executing transactions on the Stellar network</li>
          </ul>

          <h3>5.2 Platform Operations</h3>
          <ul>
            <li><strong>Security</strong>: Protecting your wallet and transaction data</li>
            <li><strong>Support</strong>: Providing technical support and resolving issues</li>
          </ul>

          <h3>5.3 Legal Compliance</h3>
          <ul>
            <li><strong>Regulatory Requirements</strong>: Complying with Austrian and EU laws</li>
            <li><strong>Sanctions Screening</strong>: Checking against restricted jurisdiction lists</li>
            <li><strong>Audit Trail</strong>: Maintaining records for transparency and accountability</li>
          </ul>

          <h2>6. Data Sharing and Third-Party Services</h2>
          <h3>6.1 Third-Party Service Providers</h3>
          <p>We interact with third-party services necessary for operations:</p>
          <ul>
            <li><strong>Stellar Network</strong>: Public blockchain for transaction processing</li>
            <li><strong>IPFS Networks</strong>: Decentralized storage for NFT metadata</li>
            <li><strong>Apple App Store</strong>: Distribution and device information (collected by Apple)</li>
          </ul>
          <p>
            <strong>No Data Processing Agreements Required</strong>: We do not share personal data with third-party processors. All data remains on your device or on public blockchains.
          </p>

          <h3>6.2 No Backend Data Storage</h3>
          <p>We do not store any user data on our own servers. All data exists on:</p>
          <ul>
            <li>Your device's iOS Keychain (encrypted, device-only)</li>
            <li>Your device's UserDefaults (local preferences)</li>
            <li>The Stellar blockchain (permanent, public, immutable)</li>
            <li>IPFS networks (distributed, public, persistent)</li>
          </ul>

          <h3>6.3 Legal Requirements</h3>
          <p>We may disclose your data when required by law, including:</p>
          <ul>
            <li>Compliance with Austrian or EU legal obligations</li>
            <li>Response to valid legal requests from authorities</li>
            <li>Protection of our rights and the rights of other users</li>
            <li>Prevention of fraud or illegal activities</li>
          </ul>

          <h3>6.4 No Sale of Data</h3>
          <p>We do not sell, rent, or trade your personal data to third parties for commercial purposes.</p>

          <h2>7. Data Security</h2>
          <h3>7.1 Security Measures</h3>
          <p>We implement appropriate technical and organizational measures to protect your data:</p>
          <ul>
            <li><strong>iOS Keychain Encryption</strong>: Private keys stored using iOS Keychain Services with <code>kSecAttrAccessibleWhenUnlockedThisDeviceOnly</code> (encrypted, device-only, never synced to iCloud)</li>
            <li><strong>No Network Transmission</strong>: Private keys never leave your device</li>
            <li><strong>Access Controls</strong>: Limited access to personal data on a need-to-know basis</li>
            <li><strong>Secure Coding Practices</strong>: Following iOS security best practices</li>
          </ul>

          <h3>7.2 Blockchain Security</h3>
          <ul>
            <li><strong>Non-Custodial</strong>: We do not store or have access to your private keys</li>
            <li><strong>Device-Only Storage</strong>: Private keys exist only in your device's Keychain</li>
            <li><strong>Public Transparency</strong>: Blockchain transactions are publicly verifiable</li>
          </ul>

          <h3>7.3 NFC Security</h3>
          <ul>
            <li><strong>Read-Only Operations</strong>: We only read data from NFC chips, never write or store chip data</li>
            <li><strong>Local Processing</strong>: All NFC operations occur locally on your device</li>
            <li><strong>No Chip Data Storage</strong>: Chip public keys and identifiers are not stored after use</li>
          </ul>

          <h3>7.4 Data Breach Response</h3>
          <p>
            In the event of a data breach (though we operate no backend servers), we will notify relevant authorities within 72 hours (GDPR Article 33) and inform affected users without undue delay (GDPR Article 34).
          </p>

          <h2>8. Your Rights Under GDPR</h2>
          <p>You have the following rights regarding your personal data:</p>

          <h3>8.1 Right of Access (Article 15)</h3>
          <p>You can request information about the personal data we process about you, including:</p>
          <ul>
            <li>Categories of data processed</li>
            <li>Purposes of processing</li>
            <li>Recipients of your data</li>
            <li>Retention periods</li>
            <li>Your rights regarding the data</li>
          </ul>

          <h3>8.2 Right to Rectification (Article 16)</h3>
          <p>You can request correction of inaccurate or incomplete personal data.</p>

          <h3>8.3 Right to Erasure (Article 17)</h3>
          <p>You can request deletion of your personal data in certain circumstances, including:</p>
          <ul>
            <li>Data no longer necessary for original purposes</li>
            <li>Withdrawal of consent</li>
            <li>Unlawful processing</li>
            <li>Objection to processing</li>
          </ul>
          <p><strong>Technical Limitations</strong>:</p>
          <ul>
            <li><strong>Blockchain Data</strong>: Permanently recorded and immutable (GDPR Article 17(3)(b) exception for data made public by the data subject)</li>
            <li><strong>IPFS Content</strong>: Cannot be deleted once uploaded to the decentralized IPFS network</li>
            <li><strong>Local Device Data</strong>: You can delete all local data by uninstalling the app, which removes:
              <ul>
                <li>All data from iOS Keychain (private keys)</li>
                <li>All data from UserDefaults (wallet addresses, preferences)</li>
              </ul>
            </li>
          </ul>
          <p><strong>User Control</strong>: You can delete your wallet and all local app data at any time by:</p>
          <ul>
            <li>Using the "Delete Wallet" function in the app settings</li>
            <li>Uninstalling the app (removes all local data)</li>
          </ul>

          <h3>8.4 Right to Restrict Processing (Article 18)</h3>
          <p>You can request limitation of data processing in certain situations.</p>

          <h3>8.5 Right to Data Portability (Article 20)</h3>
          <p>
            You can request a copy of your data in a structured, machine-readable format. Note: Private keys cannot be exported for security reasons, but you can export your wallet address and transaction history.
          </p>

          <h3>8.6 Right to Object (Article 21)</h3>
          <p>You can object to processing based on legitimate interests or for direct marketing purposes.</p>

          <h3>8.7 Rights Related to Automated Decision-Making (Article 22)</h3>
          <p>You have rights regarding automated decision-making, though our App does not use automated decision-making for individual users.</p>

          <h2>9. Exercising Your Rights</h2>
          <p>To exercise your rights, contact us at:</p>
          <p>
            <strong>Email</strong>: <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
            <br />
            <strong>Subject</strong>: Data Protection Request - Chimp App
          </p>
          <p>
            We will respond to your request within one month (GDPR Article 12(3)). We may request verification of your identity to protect your privacy.
          </p>

          <h2>10. Data Retention and Deletion</h2>
          <p>
            <strong>Blockchain Data</strong>: Permanently recorded (GDPR Article 17(3)(b) exception for data made public by the data subject).
          </p>
          <p>
            <strong>IPFS Content</strong>: Persists indefinitely on decentralized network; we cannot delete once uploaded.
          </p>
          <p><strong>Local Device Data</strong>:</p>
          <ul>
            <li><strong>iOS Keychain</strong>: Retained until you delete the wallet or uninstall the app</li>
            <li><strong>UserDefaults</strong>: Retained until you clear app data or uninstall the app</li>
            <li><strong>Uninstall</strong>: Removing the app deletes all local data (Keychain and UserDefaults)</li>
          </ul>
          <p>
            <strong>Tax Records</strong>: 7 years per Austrian Federal Fiscal Code (BAO) §132 and §212, if applicable.
          </p>
          <p>
            <strong>Deletion Limitations</strong>: Blockchain and IPFS data cannot be deleted. We can only help you understand how to manage your local device data.
          </p>

          <h2>11. International Data Transfers</h2>
          <h3>11.1 Data Transfers</h3>
          <p>Your data may be transferred to and processed in countries outside the EU/EEA, including:</p>
          <ul>
            <li><strong>IPFS Networks</strong>: Global decentralized storage networks</li>
            <li><strong>Stellar Network</strong>: Distributed blockchain network</li>
            <li><strong>Apple Services</strong>: United States-based service provider (App Store, device information)</li>
          </ul>

          <h3>11.2 Safeguards</h3>
          <p>
            We ensure appropriate safeguards for international transfers through adequacy decisions, standard contractual clauses where applicable, and technical measures (iOS Keychain encryption).
          </p>

          <h2>12. NFC Functionality</h2>
          <h3>12.1 NFC Permissions</h3>
          <p>The App requires NFC (Near Field Communication) access to:</p>
          <ul>
            <li>Read data from NFC chips embedded in physical merchandise</li>
            <li>Authenticate chip public keys for NFT operations</li>
            <li>Read contract IDs and token information from chips</li>
          </ul>

          <h3>12.2 NFC Data Handling</h3>
          <ul>
            <li><strong>Read-Only</strong>: We only read data from NFC chips; we do not write data to chips</li>
            <li><strong>No Storage</strong>: Chip data (public keys, contract IDs) is not stored after use</li>
            <li><strong>Local Processing</strong>: All NFC operations occur locally on your device</li>
            <li><strong>Privacy</strong>: NFC chip data is used only for authentication and is not shared with third parties</li>
          </ul>

          <h3>12.3 NFC Usage Description</h3>
          <p>The App displays "Allow to scan tags" when requesting NFC access.</p>

          <h2>13. iOS Keychain and Local Storage</h2>
          <h3>13.1 Keychain Storage</h3>
          <p>Private keys are stored in iOS Keychain with the following security settings:</p>
          <ul>
            <li><strong>Accessibility</strong>: <code>kSecAttrAccessibleWhenUnlockedThisDeviceOnly</code></li>
            <li><strong>Encryption</strong>: Encrypted by iOS using device-specific keys</li>
            <li><strong>Device-Only</strong>: Never synced to iCloud or other devices</li>
            <li><strong>Access Control</strong>: Requires device unlock to access</li>
          </ul>

          <h3>13.2 UserDefaults Storage</h3>
          <p>App preferences are stored in UserDefaults (local device storage):</p>
          <ul>
            <li>Wallet public addresses</li>
            <li>Network selection (testnet/mainnet)</li>
            <li>Contract ID preferences</li>
            <li>Admin mode settings</li>
          </ul>
          <p><strong>Deletion</strong>: All UserDefaults data is deleted when you uninstall the app.</p>

          <h3>13.3 No Tracking or Analytics</h3>
          <p>We do not use:</p>
          <ul>
            <li>Analytics services</li>
            <li>Tracking technologies</li>
            <li>Third-party data collection</li>
            <li>Advertising identifiers</li>
          </ul>

          <h2>14. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 18. We do not knowingly collect personal data from children under 18. If we become aware that we have collected data from a child under 18, we will take steps to delete such information.
          </p>

          <h2>15. Changes to This Privacy Policy</h2>
          <h3>15.1 Updates</h3>
          <p>We may update this Privacy Policy to reflect:</p>
          <ul>
            <li>Changes in our data processing practices</li>
            <li>New legal requirements</li>
            <li>App feature updates</li>
            <li>Security improvements</li>
          </ul>

          <h3>15.2 Notification</h3>
          <p>We will notify you of significant changes by:</p>
          <ul>
            <li>Posting the updated policy in the App (if applicable)</li>
            <li>Updating the "Last Updated" date</li>
            <li>Displaying notices in the App</li>
          </ul>

          <h3>15.3 Continued Use</h3>
          <p>Continued use of our App after policy updates constitutes acceptance of the new terms.</p>

          <h2>16. Data Protection Officer</h2>
          <p>
            As a small GmbH, we are not required to appoint a Data Protection Officer under GDPR Article 37, but privacy inquiries can be directed to <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>.
          </p>
          <p>
            <strong>Why No DPO Required</strong>: Under GDPR Article 37(1), DPO appointment is mandatory only for public authorities or organizations with large-scale processing. Our App operates with minimal data collection and no backend storage, thus not meeting these thresholds.
          </p>

          <h2>17. Supervisory Authority</h2>
          <p>You have the right to lodge a complaint with the Austrian Data Protection Authority:</p>
          <p>
            <strong>Austrian Data Protection Authority</strong>
            <br />
            Barichgasse 40-42
            <br />
            1030 Vienna, Austria
            <br />
            Website: <a href="https://dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dsb.gv.at</a>
          </p>

          <h2>18. Contact Information</h2>
          <p>For any questions about this Privacy Policy or our data practices:</p>
          <p>
            <strong>Consulting Manao GmbH</strong>
            <br />
            Registered in Austrian Commercial Register (Firmenbuch)
            <br />
            Landesgericht Graz, FN 571029z
            <br />
            VAT ID: ATU77780135
            <br />
            Managing Director: Pamphile Tupui Christophe Roy
          </p>
          <p>
            <strong>Contact</strong>:
            <br />
            Email: <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
          </p>
          <p className="text-muted-foreground mt-8">
            <strong>Last Updated</strong>: January 2026
          </p>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
