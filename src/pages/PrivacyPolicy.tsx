import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Mail, Building2, Scale } from "lucide-react";

const Section = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
  <section id={id} className="mb-12">
    <h2 className="text-2xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">{title}</h2>
    <div className="space-y-4 text-muted-foreground">{children}</div>
  </section>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium text-foreground/90 mb-3">{title}</h3>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </div>
);

const InfoBox = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "important" }) => (
  <div className={`p-4 rounded-lg border ${variant === "important" ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border/50"}`}>
    {children}
  </div>
);

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

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground">Chimp iOS Application</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Last Updated: January 2026</span>
            <span>•</span>
            <span>Effective: January 2026</span>
          </div>
        </header>

        {/* Introduction Card */}
        <div className="glass-card p-6 mb-12 space-y-4">
          <p className="text-foreground/90">
            Consulting Manao GmbH ("Company", "we", "us") operates the Chimp iOS application ("App", "Service") for the Stellar Merch Shop platform. We are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your personal data in accordance with the <strong>General Data Protection Regulation (GDPR)</strong> and Austrian data protection laws.
          </p>
          
          <InfoBox variant="important">
            <p className="font-medium text-foreground mb-2">Minimal Data Collection</p>
            <p className="text-sm">Our App involves minimal personal data collection. We do not operate backend servers or databases. All user data is stored locally on your device (iOS Keychain and UserDefaults) or on-chain (Stellar blockchain). We do not use analytics, tracking, or third-party data collection services.</p>
          </InfoBox>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Consulting Manao GmbH • FN 571029z</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <Section title="2. Data Controller" id="data-controller">
            <p>Consulting Manao GmbH is the data controller responsible for processing your personal data in connection with the Chimp App.</p>
          </Section>

          <Section title="3. Types of Data We Collect" id="data-types">
            <InfoBox>
              <p className="font-medium text-foreground mb-2">Important</p>
              <p className="text-sm">We do not operate backend servers or databases. All data is either stored locally on your device, on-chain via the Stellar blockchain, or on decentralized IPFS networks.</p>
            </InfoBox>

            <SubSection title="3.1 Data You Provide Directly">
              <p><strong className="text-foreground">Wallet Information:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Stellar wallet private keys (stored in iOS Keychain, encrypted, device-only)</li>
                <li>Stellar wallet public addresses (stored in UserDefaults, local device storage)</li>
                <li>Wallet connection preferences</li>
              </ul>
              <p><strong className="text-foreground">App Configuration:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Network selection (testnet/mainnet)</li>
                <li>Contract ID preferences</li>
                <li>Admin mode settings (if applicable)</li>
              </ul>
              <p className="text-sm italic">User Responsibility: You are responsible for ensuring your wallet keys are kept secure. We do not have access to your private keys.</p>
            </SubSection>

            <SubSection title="3.2 Data Collected Automatically">
              <p><strong className="text-foreground">Blockchain Data</strong> (publicly visible on Stellar Network):</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Transaction hashes and timestamps</li>
                <li>Smart contract interaction data</li>
                <li>NFT ownership records</li>
                <li>Token transfer history</li>
              </ul>
              <p><strong className="text-foreground">NFC Chip Data</strong> (read only, not stored):</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Chip public keys (read from NFC chips for authentication)</li>
                <li>Contract IDs embedded in NFC chips</li>
                <li>Token IDs associated with chips</li>
              </ul>
              <p><strong className="text-foreground">Local Storage</strong> (stored on your device only):</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>iOS Keychain:</strong> Private keys with <code className="text-xs bg-muted px-1 py-0.5 rounded">kSecAttrAccessibleWhenUnlockedThisDeviceOnly</code></li>
                <li><strong>UserDefaults:</strong> Wallet addresses, network preferences, contract IDs</li>
              </ul>
            </SubSection>

            <SubSection title="3.3 Data from Third-Party Services">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Stellar Network:</strong> Account balances, transaction history, network fees</li>
                <li><strong className="text-foreground">IPFS Networks:</strong> NFT metadata and images</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="4. Legal Basis for Processing" id="legal-basis">
            <div className="grid gap-3">
              <div className="flex gap-3">
                <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Contract Performance (Article 6(1)(b))</p>
                  <p className="text-sm">Processing necessary for providing our wallet and NFT management services.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Legitimate Interest (Article 6(1)(f))</p>
                  <p className="text-sm">Processing for app security, fraud prevention, and service functionality.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Consent (Article 6(1)(a))</p>
                  <p className="text-sm">For optional features like app configuration preferences.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Legal Obligation (Article 6(1)(c))</p>
                  <p className="text-sm">Compliance with Austrian and EU legal requirements.</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm">We do not engage in automated decision-making or profiling with legal effects.</p>
          </Section>

          <Section title="5. How We Use Your Data" id="data-usage">
            <SubSection title="5.1 Service Provision">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Wallet Management:</strong> Creating and maintaining your Stellar wallet</li>
                <li><strong className="text-foreground">NFT Operations:</strong> Facilitating NFT claiming, transferring, minting, and viewing</li>
                <li><strong className="text-foreground">NFC Authentication:</strong> Reading NFC chips to authenticate physical merchandise</li>
                <li><strong className="text-foreground">Blockchain Transactions:</strong> Executing transactions on the Stellar network</li>
              </ul>
            </SubSection>
            <SubSection title="5.2 Platform Operations">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Security:</strong> Protecting your wallet and transaction data</li>
                <li><strong className="text-foreground">Support:</strong> Providing technical support and resolving issues</li>
              </ul>
            </SubSection>
            <SubSection title="5.3 Legal Compliance">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Complying with Austrian and EU laws</li>
                <li>Checking against restricted jurisdiction lists</li>
                <li>Maintaining records for transparency and accountability</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="6. Data Sharing and Third-Party Services" id="data-sharing">
            <SubSection title="6.1 Third-Party Service Providers">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Stellar Network:</strong> Public blockchain for transaction processing</li>
                <li><strong className="text-foreground">IPFS Networks:</strong> Decentralized storage for NFT metadata</li>
                <li><strong className="text-foreground">Apple App Store:</strong> Distribution and device information</li>
              </ul>
              <p className="text-sm mt-2">We do not share personal data with third-party processors. All data remains on your device or on public blockchains.</p>
            </SubSection>
            <SubSection title="6.2 No Backend Data Storage">
              <p>We do not store any user data on our own servers. All data exists on your device's iOS Keychain, UserDefaults, the Stellar blockchain, or IPFS networks.</p>
            </SubSection>
            <SubSection title="6.3 No Sale of Data">
              <p className="font-medium text-foreground">We do not sell, rent, or trade your personal data to third parties for commercial purposes.</p>
            </SubSection>
          </Section>

          <Section title="7. Data Security" id="data-security">
            <SubSection title="7.1 Security Measures">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">iOS Keychain Encryption:</strong> Private keys stored with device-only access, never synced to iCloud</li>
                <li><strong className="text-foreground">No Network Transmission:</strong> Private keys never leave your device</li>
                <li><strong className="text-foreground">Secure Coding Practices:</strong> Following iOS security best practices</li>
              </ul>
            </SubSection>
            <SubSection title="7.2 Blockchain Security">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Non-Custodial:</strong> We do not store or have access to your private keys</li>
                <li><strong className="text-foreground">Device-Only Storage:</strong> Private keys exist only in your device's Keychain</li>
                <li><strong className="text-foreground">Public Transparency:</strong> Blockchain transactions are publicly verifiable</li>
              </ul>
            </SubSection>
            <SubSection title="7.3 Data Breach Response">
              <p>In the event of a data breach, we will notify relevant authorities within 72 hours (GDPR Article 33) and inform affected users without undue delay (GDPR Article 34).</p>
            </SubSection>
          </Section>

          <Section title="8. Your Rights Under GDPR" id="gdpr-rights">
            <div className="grid gap-4">
              <InfoBox>
                <p className="font-medium text-foreground mb-2">8.1 Right of Access (Article 15)</p>
                <p className="text-sm">Request information about the personal data we process about you.</p>
              </InfoBox>
              <InfoBox>
                <p className="font-medium text-foreground mb-2">8.2 Right to Rectification (Article 16)</p>
                <p className="text-sm">Request correction of inaccurate or incomplete personal data.</p>
              </InfoBox>
              <InfoBox>
                <p className="font-medium text-foreground mb-2">8.3 Right to Erasure (Article 17)</p>
                <p className="text-sm">Request deletion of your personal data. Note: Blockchain and IPFS data cannot be deleted. You can delete local data by uninstalling the app.</p>
              </InfoBox>
              <InfoBox>
                <p className="font-medium text-foreground mb-2">8.4 Right to Restrict Processing (Article 18)</p>
                <p className="text-sm">Request limitation of data processing in certain situations.</p>
              </InfoBox>
              <InfoBox>
                <p className="font-medium text-foreground mb-2">8.5 Right to Data Portability (Article 20)</p>
                <p className="text-sm">Request a copy of your data in a structured, machine-readable format.</p>
              </InfoBox>
              <InfoBox>
                <p className="font-medium text-foreground mb-2">8.6 Right to Object (Article 21)</p>
                <p className="text-sm">Object to processing based on legitimate interests.</p>
              </InfoBox>
            </div>
          </Section>

          <Section title="9. Exercising Your Rights" id="exercise-rights">
            <p>To exercise your rights, contact us at:</p>
            <div className="glass-card p-4 mt-2">
              <p><strong className="text-foreground">Email:</strong> <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a></p>
              <p><strong className="text-foreground">Subject:</strong> Data Protection Request - Chimp App</p>
            </div>
            <p className="mt-3 text-sm">We will respond to your request within one month (GDPR Article 12(3)). We may request verification of your identity to protect your privacy.</p>
          </Section>

          <Section title="10. Data Retention and Deletion" id="data-retention">
            <ul className="space-y-2">
              <li><strong className="text-foreground">Blockchain Data:</strong> Permanently recorded (GDPR Article 17(3)(b) exception)</li>
              <li><strong className="text-foreground">IPFS Content:</strong> Persists indefinitely on decentralized network</li>
              <li><strong className="text-foreground">Local Device Data:</strong> Retained until you delete the wallet or uninstall the app</li>
              <li><strong className="text-foreground">Tax Records:</strong> 7 years per Austrian Federal Fiscal Code (BAO) §132 and §212</li>
            </ul>
          </Section>

          <Section title="11. International Data Transfers" id="international-transfers">
            <p>Your data may be transferred to and processed in countries outside the EU/EEA through IPFS Networks, Stellar Network, and Apple Services.</p>
            <p className="mt-2">We ensure appropriate safeguards through adequacy decisions, standard contractual clauses, and technical measures (iOS Keychain encryption).</p>
          </Section>

          <Section title="12. NFC Functionality" id="nfc">
            <p>The App requires NFC access to read data from NFC chips embedded in physical merchandise. We only read data from NFC chips (never write), chip data is not stored after use, and all NFC operations occur locally on your device.</p>
          </Section>

          <Section title="13. iOS Keychain and Local Storage" id="local-storage">
            <p>Private keys are stored in iOS Keychain with device-only accessibility and are never synced to iCloud. App preferences are stored in UserDefaults and deleted when you uninstall the app.</p>
            <InfoBox variant="important">
              <p className="font-medium text-foreground mb-1">No Tracking or Analytics</p>
              <p className="text-sm">We do not use analytics services, tracking technologies, third-party data collection, or advertising identifiers.</p>
            </InfoBox>
          </Section>

          <Section title="14. Children's Privacy" id="children">
            <p>Our services are not intended for children under 18. We do not knowingly collect personal data from children under 18.</p>
          </Section>

          <Section title="15. Changes to This Privacy Policy" id="changes">
            <p>We may update this Privacy Policy to reflect changes in our practices, legal requirements, or app features. We will notify you of significant changes by posting the updated policy and updating the "Last Updated" date. Continued use of our App after updates constitutes acceptance of the new terms.</p>
          </Section>

          <Section title="16. Data Protection Officer" id="dpo">
            <p>As a small GmbH, we are not required to appoint a Data Protection Officer under GDPR Article 37. Privacy inquiries can be directed to <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>.</p>
          </Section>

          <Section title="17. Supervisory Authority" id="supervisory">
            <p>You have the right to lodge a complaint with the Austrian Data Protection Authority:</p>
            <div className="glass-card p-4 mt-2">
              <p className="font-medium text-foreground">Austrian Data Protection Authority</p>
              <p>Barichgasse 40-42</p>
              <p>1030 Vienna, Austria</p>
              <p><a href="https://dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dsb.gv.at</a></p>
            </div>
          </Section>

          <Section title="18. Contact Information" id="contact">
            <div className="glass-card p-6">
              <p className="font-semibold text-foreground text-lg mb-3">Consulting Manao GmbH</p>
              <div className="space-y-1 text-sm">
                <p>Registered in Austrian Commercial Register (Firmenbuch)</p>
                <p>Landesgericht Graz, FN 571029z</p>
                <p>VAT ID: ATU77780135</p>
                <p>Managing Director: Pamphile Tupui Christophe Roy</p>
                <p className="pt-2">
                  <strong>Email:</strong> <a href="mailto:legal@consulting-manao.com" className="text-primary hover:underline">legal@consulting-manao.com</a>
                </p>
              </div>
            </div>
          </Section>
        </div>

        <footer className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>Last Updated: January 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
