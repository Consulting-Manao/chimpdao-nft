import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1">
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
                <li><strong className="text-foreground">Public Ledger:</strong> Blockchain transactions are permanent and publicly visible</li>
                <li><strong className="text-foreground">Smart Contract Security:</strong> Contracts are audited and follow best practices</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Your Rights Under GDPR</h2>
              <p className="text-muted-foreground leading-relaxed">
                Under GDPR, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed ml-4">
                <li><strong className="text-foreground">Right of Access:</strong> Request copies of your personal data</li>
                <li><strong className="text-foreground">Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-foreground">Right to Erasure:</strong> Request deletion of your data (subject to legal limitations)</li>
                <li><strong className="text-foreground">Right to Restrict Processing:</strong> Request limitation of data processing</li>
                <li><strong className="text-foreground">Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong className="text-foreground">Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong className="text-foreground">Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">Important Limitations:</strong> Due to the nature of blockchain technology, data stored on the Stellar blockchain cannot be modified or deleted. This is a fundamental characteristic of public blockchains.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To exercise your rights, contact us at <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Local Data:</strong> Data stored on your device persists until you clear your browser storage (Website) or delete the app (App).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Blockchain Data:</strong> Data on the Stellar blockchain is permanent and immutable by design.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">IPFS Data:</strong> Content on IPFS may persist indefinitely due to the distributed nature of the network.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">10. International Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are based in Austria and process data within the European Economic Area (EEA). Due to the decentralized nature of blockchain and IPFS networks, data may be stored or processed globally. We do not transfer personal data to third countries for processing.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">11. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Services are not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">12. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Consulting Manao GmbH</strong><br />
                FN 571029z<br />
                Email: <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You also have the right to lodge a complaint with the Austrian Data Protection Authority (Österreichische Datenschutzbehörde) if you believe your data protection rights have been violated.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
