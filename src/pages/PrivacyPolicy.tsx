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
            <h1 className="text-3xl font-bold">Privacy Policy - Chimp</h1>
            <p className="text-muted-foreground">Last Updated: January 2026 • Effective: January 2026</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Consulting Manao GmbH ("Company", "we", "us") operates the Chimp iOS application ("App", "Service") for the ChimpDAO platform. We are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) and Austrian data protection laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Minimal Data Collection:</strong> Our App involves minimal personal data collection. We do not operate backend servers or databases. All user data is stored locally on your device (iOS Keychain and UserDefaults) or on-chain (Stellar blockchain). We do not use analytics, tracking, or third-party data collection services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Contact:</strong> Consulting Manao GmbH, FN 571029z<br />
              Email: <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Data Controller</h2>
            <p className="text-muted-foreground leading-relaxed">
              Consulting Manao GmbH is the data controller responsible for processing your personal data in connection with the Chimp App.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Types of Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important:</strong> We do not operate backend servers or databases. All data is either stored locally on your device using iOS Keychain or UserDefaults, stored on-chain via the Stellar blockchain, or stored on decentralized IPFS networks.
            </p>
            
            <h3 className="text-lg font-medium mt-6">3.1 Data You Provide Directly</h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Wallet Information:</strong> Stellar wallet private keys (stored in iOS Keychain, encrypted, device-only), wallet public addresses (stored in UserDefaults), and wallet connection preferences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">App Configuration:</strong> Network selection (testnet/mainnet), contract ID preferences, and admin mode settings.
            </p>

            <h3 className="text-lg font-medium mt-6">3.2 Data Collected Automatically</h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Blockchain Data:</strong> Transaction hashes and timestamps, smart contract interaction data, NFT ownership records, and token transfer history (publicly visible on Stellar Network).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">NFC Chip Data:</strong> Chip public keys, contract IDs, and token IDs (read only, not stored).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Local Storage:</strong> iOS Keychain stores private keys with <code className="text-xs bg-muted px-1 py-0.5 rounded">kSecAttrAccessibleWhenUnlockedThisDeviceOnly</code>. UserDefaults stores wallet addresses and network preferences.
            </p>

            <h3 className="text-lg font-medium mt-6">3.3 Data from Third-Party Services</h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Stellar Network:</strong> Account balances, transaction history, network fees.<br />
              <strong className="text-foreground">IPFS Networks:</strong> NFT metadata and images.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Legal Basis for Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Contract Performance (Article 6(1)(b)):</strong> Processing necessary for providing our wallet and NFT management services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Legitimate Interest (Article 6(1)(f)):</strong> Processing for app security, fraud prevention, and service functionality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Consent (Article 6(1)(a)):</strong> For optional features like app configuration preferences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Legal Obligation (Article 6(1)(c)):</strong> Compliance with Austrian and EU legal requirements.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We do not engage in automated decision-making or profiling with legal effects.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. How We Use Your Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Service Provision:</strong> Wallet management, NFT operations, NFC authentication, and blockchain transactions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Platform Operations:</strong> Security and technical support.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Legal Compliance:</strong> Regulatory requirements, sanctions screening, and audit trails.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Data Sharing and Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We interact with Stellar Network, IPFS Networks, and Apple App Store for operations. We do not share personal data with third-party processors—all data remains on your device or on public blockchains.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">No Sale of Data:</strong> We do not sell, rent, or trade your personal data to third parties for commercial purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Private keys are stored in iOS Keychain with device-only access and are never transmitted over the network. We follow iOS security best practices and maintain a non-custodial architecture where we never have access to your private keys.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In the event of a data breach, we will notify relevant authorities within 72 hours (GDPR Article 33) and inform affected users without undue delay.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Your Rights Under GDPR</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Right of Access (Article 15):</strong> Request information about the personal data we process.<br />
              <strong className="text-foreground">Right to Rectification (Article 16):</strong> Request correction of inaccurate data.<br />
              <strong className="text-foreground">Right to Erasure (Article 17):</strong> Request deletion of your data. Note: Blockchain and IPFS data cannot be deleted.<br />
              <strong className="text-foreground">Right to Restrict Processing (Article 18):</strong> Request limitation of processing.<br />
              <strong className="text-foreground">Right to Data Portability (Article 20):</strong> Request a copy of your data.<br />
              <strong className="text-foreground">Right to Object (Article 21):</strong> Object to processing based on legitimate interests.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Exercising Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Contact us at <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a> with subject "Data Protection Request - Chimp App". We will respond within one month.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">10. Data Retention and Deletion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Blockchain data is permanently recorded. IPFS content persists indefinitely. Local device data is retained until you delete the wallet or uninstall the app. Tax records are kept for 7 years per Austrian law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">11. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data may be transferred outside the EU/EEA through IPFS Networks, Stellar Network, and Apple Services. We ensure appropriate safeguards through adequacy decisions, standard contractual clauses, and technical measures.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">12. NFC Functionality</h2>
            <p className="text-muted-foreground leading-relaxed">
              The App requires NFC access to read data from NFC chips in physical merchandise. We only read data (never write), chip data is not stored after use, and all operations occur locally on your device.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">13. iOS Keychain and Local Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Private keys are stored in iOS Keychain with device-only accessibility and are never synced to iCloud. App preferences in UserDefaults are deleted when you uninstall the app. We do not use analytics, tracking, or advertising identifiers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">14. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for children under 18. We do not knowingly collect personal data from children.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">15. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this policy to reflect changes in our practices or legal requirements. Continued use after updates constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">16. Data Protection Officer</h2>
            <p className="text-muted-foreground leading-relaxed">
              As a small GmbH, we are not required to appoint a DPO under GDPR Article 37. Privacy inquiries can be directed to <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">17. Supervisory Authority</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may lodge a complaint with the Austrian Data Protection Authority:<br />
              Barichgasse 40-42, 1030 Vienna, Austria — <a href="https://dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dsb.gv.at</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">18. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              Consulting Manao GmbH<br />
              Landesgericht Graz, FN 571029z<br />
              VAT ID: ATU77780135<br />
              Managing Director: Pamphile Tupui Christophe Roy<br />
              Email: <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
            </p>
          </section>

          <footer className="pt-8 mt-12 border-t border-border/50 text-sm text-muted-foreground">
            Last Updated: January 2026
          </footer>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
