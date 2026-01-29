import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

const BackgroundPattern = () => (
  <div 
    className="absolute inset-0 opacity-[0.08] pointer-events-none"
    style={{
      backgroundImage: 'url(/token-bg-pattern.png)',
      backgroundSize: '600px',
      backgroundRepeat: 'repeat'
    }}
    aria-hidden="true"
  />
);

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
      <BackgroundPattern />
      <main className="flex-1 relative z-10">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <article className="space-y-8">
            <header className="space-y-2 mb-12">
              <h1 className="text-3xl font-bold text-white">Privacy Policy - ChimpDAO</h1>
              <p className="text-white/60">Last Updated: January 2026 • Effective: January 2026</p>
            </header>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
              <p className="text-white/70 leading-relaxed">
                Consulting Manao GmbH ("Company", "we", "us", "our") operates the ChimpDAO platform, which includes the nft.chimpdao.xyz website ("Website", "Service") and the Chimp iOS application ("App", "Service"). We are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) and Austrian data protection laws.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Minimal Data Collection:</strong> Our Services involve minimal personal data collection. We do not operate backend servers or databases for user data storage. All user data is stored locally on your device (browser storage for the Website, iOS Keychain and UserDefaults for the App) or on-chain (Stellar blockchain). We do not use analytics, tracking, or third-party data collection services.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Contact Information:</strong><br />
                Consulting Manao GmbH<br />
                FN 571029z<br />
                Email: <a href="mailto:legal@consulting-manao.com" className="text-chimp-purple hover:underline">legal@consulting-manao.com</a>
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Related Documents:</strong> For information about intellectual property rights and licensing for ChimpDAO NFTs, please see our <Link to="/terms" className="text-chimp-purple hover:underline">Intellectual Property Rights & Licensing Guidelines</Link> (or <Link to="/terms" className="text-chimp-purple hover:underline">Terms</Link>).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">2. Data Controller</h2>
              <p className="text-white/70 leading-relaxed">
                Consulting Manao GmbH is the data controller responsible for processing your personal data in connection with our Services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">3. Types of Data We Collect</h2>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Important:</strong> We do not operate backend servers or databases for user data storage. All data is either:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Stored locally on your device using browser storage (Website) or iOS Keychain (encrypted, device-only) and UserDefaults (local preferences) (App)</li>
                <li>Stored on-chain via the Stellar blockchain (publicly visible and permanent)</li>
                <li>Stored on decentralized IPFS networks (publicly accessible for NFT metadata)</li>
              </ul>

              <h3 className="text-lg font-medium mt-6 text-white">3.1 Data You Provide Directly</h3>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Wallet Information:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Stellar wallet private keys (stored in browser storage for Website, iOS Keychain for App, encrypted, device-only)</li>
                <li>Stellar wallet public addresses (stored in browser local storage for Website, UserDefaults for App)</li>
                <li>Wallet connection preferences</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">Service Configuration:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Network selection (testnet/mainnet)</li>
                <li>Contract ID preferences</li>
                <li>Admin mode settings (if applicable, App only)</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">User Responsibility:</strong> You are responsible for ensuring your wallet keys are kept secure. We do not have access to your private keys, which are stored exclusively on your device.
              </p>

              <h3 className="text-lg font-medium mt-6 text-white">3.2 Data Collected Automatically</h3>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Blockchain Data</strong> (publicly visible on Stellar Network):
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Transaction hashes and timestamps</li>
                <li>Smart contract interaction data</li>
                <li>NFT ownership records</li>
                <li>Token transfer history</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">NFC Chip Data</strong> (App only, read only, not stored):
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Chip public keys (read from NFC chips for authentication)</li>
                <li>Contract IDs embedded in NFC chips</li>
                <li>Token IDs associated with chips</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">Technical Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Device Information:</strong> Browser type and version (Website), iOS version and device model (App, collected by Apple App Store for distribution)</li>
                <li><strong className="text-white">Usage:</strong> No analytics or tracking. We do not collect usage patterns or user behavior data.</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">Local Storage</strong> (stored on your device only):
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Website:</strong> Browser local storage for wallet addresses and preferences</li>
                <li><strong className="text-white">App (iOS Keychain):</strong> Private keys stored with <code className="text-xs bg-white/10 px-1 py-0.5 rounded">kSecAttrAccessibleWhenUnlockedThisDeviceOnly</code> (encrypted, device-only, never synced)</li>
                <li><strong className="text-white">App (UserDefaults):</strong> Wallet addresses, network preferences, contract IDs (local device storage, cleared when app is deleted)</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">IPFS Data</strong> (publicly accessible):
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>NFT metadata and images fetched from IPFS networks</li>
                <li>Content Identifiers (CIDs) for NFT content</li>
                <li>Content metadata and timestamps</li>
              </ul>

              <h3 className="text-lg font-medium mt-6 text-white">3.3 Data from Third-Party Services</h3>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Stellar Network:</strong> Account balances and transaction history (public blockchain data), network fees and transaction status, account metadata.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">IPFS Networks:</strong> NFT metadata and images (publicly accessible content), content distributed across decentralized IPFS network.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Website Hosting:</strong> Server logs (IP addresses, access timestamps) collected by our hosting provider for operational and security purposes. No persistent tracking or profiling.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">App Distribution</strong> (App only): Apple App Store collects device information for distribution purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">4. Legal Basis for Processing</h2>
              <p className="text-white/70 leading-relaxed">
                We process your personal data based on the following legal grounds under GDPR:
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Contract Performance (Article 6(1)(b)):</strong> Processing necessary for providing our wallet and NFT management services, including wallet creation, NFT claiming, transferring, and signing operations.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Legitimate Interest (Article 6(1)(f)):</strong> Processing for service security, fraud prevention, and service functionality.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Consent (Article 6(1)(a)):</strong> For optional features like service configuration preferences.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Legal Obligation (Article 6(1)(c)):</strong> Compliance with Austrian and EU legal requirements, including anti-money laundering and sanctions screening.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">No Automated Decision-Making:</strong> We do not engage in automated decision-making or profiling with legal effects.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">5. How We Use Your Data</h2>
              <h3 className="text-lg font-medium mt-4 text-white">5.1 Service Provision</h3>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Wallet Management:</strong> Creating and maintaining your Stellar wallet connection</li>
                <li><strong className="text-white">NFT Operations:</strong> Facilitating NFT claiming, transferring, minting, and viewing</li>
                <li><strong className="text-white">NFC Authentication</strong> (App only): Reading NFC chips to authenticate and interact with physical merchandise</li>
                <li><strong className="text-white">Blockchain Transactions:</strong> Executing transactions on the Stellar network</li>
                <li><strong className="text-white">Website Functionality:</strong> Providing website features and content</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 text-white">5.2 Platform Operations</h3>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Security:</strong> Protecting your wallet and transaction data</li>
                <li><strong className="text-white">Support:</strong> Providing technical support and resolving issues</li>
                <li><strong className="text-white">Service Improvement:</strong> Understanding and improving our services (without tracking individual users)</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 text-white">5.3 Legal Compliance</h3>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Regulatory Requirements:</strong> Complying with Austrian and EU laws</li>
                <li><strong className="text-white">Sanctions Screening:</strong> Checking against restricted jurisdiction lists</li>
                <li><strong className="text-white">Audit Trail:</strong> Maintaining records for transparency and accountability</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">6. Data Sharing and Third-Party Services</h2>
              <h3 className="text-lg font-medium mt-4 text-white">6.1 Third-Party Service Providers</h3>
              <p className="text-white/70 leading-relaxed">
                We interact with third-party services necessary for operations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Stellar Network:</strong> Public blockchain for transaction processing</li>
                <li><strong className="text-white">IPFS Networks:</strong> Decentralized storage for NFT metadata</li>
                <li><strong className="text-white">Website Hosting:</strong> Hosting provider for website infrastructure (server logs)</li>
                <li><strong className="text-white">Apple App Store</strong> (App only): Distribution and device information (collected by Apple)</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">No Data Processing Agreements Required:</strong> We do not share personal data with third-party processors for marketing or analytics. All user data remains on your device or on public blockchains.
              </p>
              <h3 className="text-lg font-medium mt-4 text-white">6.2 No Backend Data Storage</h3>
              <p className="text-white/70 leading-relaxed">
                We do not store any user data on our own servers. All user data exists on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Your device's browser storage (Website)</li>
                <li>Your device's iOS Keychain (encrypted, device-only) (App)</li>
                <li>Your device's UserDefaults (local preferences) (App)</li>
                <li>The Stellar blockchain (permanent, public, immutable)</li>
                <li>IPFS networks (distributed, public, persistent)</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">Server Logs:</strong> Our hosting provider may maintain server logs (IP addresses, access timestamps) for operational and security purposes, but these are not used for user tracking or profiling.
              </p>
              <h3 className="text-lg font-medium mt-4 text-white">6.3 Legal Requirements</h3>
              <p className="text-white/70 leading-relaxed">
                We may disclose your data when required by law, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Compliance with Austrian or EU legal obligations</li>
                <li>Response to valid legal requests from authorities</li>
                <li>Protection of our rights and the rights of other users</li>
                <li>Prevention of fraud or illegal activities</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 text-white">6.4 No Sale of Data</h3>
              <p className="text-white/70 leading-relaxed">
                We do not sell, rent, or trade your personal data to third parties for commercial purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">7. Data Security</h2>
              <h3 className="text-lg font-medium mt-4 text-white">7.1 Security Measures</h3>
              <p className="text-white/70 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Encryption:</strong> Private keys stored using secure, encrypted storage (browser storage for Website, iOS Keychain for App)</li>
                <li><strong className="text-white">No Network Transmission:</strong> Private keys never leave your device</li>
                <li><strong className="text-white">Access Controls:</strong> Limited access to personal data on a need-to-know basis</li>
                <li><strong className="text-white">Security Monitoring:</strong> Continuous security monitoring and vulnerability assessment</li>
                <li><strong className="text-white">Incident Response:</strong> Procedures for responding to data breaches and security incidents</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 text-white">7.2 Your Responsibility</h3>
              <p className="text-white/70 leading-relaxed">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Protecting your wallet credentials and private keys</li>
                <li>Securing your device and browser</li>
                <li>Backing up your wallet securely</li>
                <li>Keeping your software and device up to date</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">8. Data Retention</h2>
              <h3 className="text-lg font-medium mt-4 text-white">8.1 Local Data</h3>
              <p className="text-white/70 leading-relaxed">
                Data stored locally on your device remains until you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li>Clear your browser data (Website)</li>
                <li>Uninstall the app (App)</li>
                <li>Manually delete the data</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 text-white">8.2 Blockchain Data</h3>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Permanent:</strong> Data stored on the Stellar blockchain is permanent and immutable. Once recorded, it cannot be deleted or modified.
              </p>
              <h3 className="text-lg font-medium mt-4 text-white">8.3 IPFS Data</h3>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Persistent:</strong> NFT metadata stored on IPFS networks is publicly accessible and may persist indefinitely across the distributed network.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">9. Your Rights</h2>
              <p className="text-white/70 leading-relaxed">
                Under GDPR and Austrian data protection law, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Access:</strong> Request access to your personal data we hold</li>
                <li><strong className="text-white">Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Erasure:</strong> Request deletion of your data (subject to legal retention requirements and blockchain permanence)</li>
                <li><strong className="text-white">Restriction:</strong> Request limitation of processing</li>
                <li><strong className="text-white">Portability:</strong> Request your data in a portable format</li>
                <li><strong className="text-white">Objection:</strong> Object to processing based on legitimate interest</li>
                <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent at any time (where applicable)</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">Important Note:</strong> Due to the decentralized nature of blockchain and IPFS, some data (transaction history, NFT metadata) cannot be deleted or modified once recorded.
              </p>
              <p className="text-white/70 leading-relaxed">
                To exercise your rights, contact us at <a href="mailto:legal@consulting-manao.com" className="text-chimp-purple hover:underline">legal@consulting-manao.com</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">10. International Transfers</h2>
              <p className="text-white/70 leading-relaxed">
                Your data may be processed outside the EU/EEA in the following contexts:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 leading-relaxed ml-4">
                <li><strong className="text-white">Stellar Network:</strong> Transactions processed on a global, decentralized network</li>
                <li><strong className="text-white">IPFS:</strong> Content distributed across a global, decentralized network</li>
                <li><strong className="text-white">Hosting:</strong> Website hosting services may be located globally</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Where transfers occur, we ensure appropriate safeguards are in place in accordance with GDPR requirements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">11. Children's Privacy</h2>
              <p className="text-white/70 leading-relaxed">
                Our Services are not intended for individuals under 16 years of age. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">12. Changes to This Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be effective upon posting. We will notify you of material changes through the Website and App.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">13. Contact and Complaints</h2>
              <p className="text-white/70 leading-relaxed">
                For privacy-related inquiries or to exercise your rights:
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Email:</strong> <a href="mailto:legal@consulting-manao.com" className="text-chimp-purple hover:underline">legal@consulting-manao.com</a>
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">Supervisory Authority:</strong> You have the right to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde):
              </p>
              <p className="text-white/70 leading-relaxed">
                Österreichische Datenschutzbehörde<br />
                Barichgasse 40-42<br />
                1030 Vienna, Austria<br />
                <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-chimp-purple hover:underline">www.dsb.gv.at</a>
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
