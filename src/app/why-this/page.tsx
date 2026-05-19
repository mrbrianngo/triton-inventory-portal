import NavBar from '@/components/NavBar';
import Image from 'next/image';

export default function MarketResearch() {
  return (
    <div className="container">
      <NavBar />

      <main style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '4rem' }}>
        
        {/* Intro */}
        <section className="hiw-section">
          <h2 className="hiw-section-title">Why Triton Inventory Portal?</h2>
          <p className="hiw-body">
            The modern retail software market is saturated with powerful enterprise solutions designed for continuous, global supply chains. However, their positioning leaves a <strong>massive, wide-open gap</strong> when it comes to hyper-localized, event-based merchandising. 
          </p>
          <p className="hiw-body">
            Understanding where traditional platforms thrive—and structurally fail—reveals why the Triton Inventory Portal is a necessary innovation for student organizations and campus event culture.
          </p>
        </section>

        {/* Section 1: Enterprise Competitors */}
        <section className="hiw-section">
          <div className="hiw-section-label">The Landscape</div>
          <h3 className="hiw-heading">The "Big Tech" Solutions</h3>
          <p className="hiw-body">
            Current established tools are built exclusively for mid-to-large e-commerce and retail brands operating at scale:
          </p>
          
          <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
            <li style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>Inventory Planner (by Brightpearl)</h4>
              <p className="hiw-body" style={{ margin: 0 }}>
                A leading platform for high-volume Shopify stores. It handles multi-warehouse inventory intelligence and provides automated "buying suggestions" based on continuous seasonal trends.
              </p>
            </li>
            
            <li style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>Toolio</h4>
              <p className="hiw-body" style={{ margin: 0 }}>
                An AI-powered merchandise planning platform for modern apparel brands. Toolio uses predictive modeling to determine optimal SKU and size mixes to reduce excess inventory.
              </p>
            </li>

            <li style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>Specialized Apparel ERPs</h4>
              <p className="hiw-body" style={{ margin: 0 }}>
                Deep backend tracking systems that integrate barcode scanning, warehouse logs, and automated manufacturing triggers to help garment factories track raw materials.
              </p>
            </li>
          </ul>
        </section>

        {/* Section 2: Why they fail for TO */}
        <section className="hiw-section">
          <div className="hiw-section-label">The Disconnect</div>
          <h3 className="hiw-heading">Why Existing Solutions Fail Campus Organizations</h3>
          <p className="hiw-body">
            If a university student organization attempted to deploy Toolio or Inventory Planner, they would hit a structural brick wall immediately due to three fundamental misalignments:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>1. The "Cold Start" and Continuous Data Trap</h4>
              <p className="hiw-body" style={{ margin: 0 }}>
                Enterprise software relies entirely on <strong>continuous, historical time-series data</strong>. They assume a brand has steady, year-round sales flowing through a POS system. Student merch operations have a severe "Cold Start" problem: zero baseline sales for six months, followed by a massive, isolated 4-hour sales window during a single campus event. Traditional algorithms break when handling this extreme variance.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>2. Lack of Qualitative Sentiment Integration</h4>
              <p className="hiw-body" style={{ margin: 0 }}>
                Enterprise tools look backward at historical sales spreadsheets to predict the future. They do not feature interfaces designed to intake and process erratic, real-time qualitative inputs—such as a 24-hour campus Instagram story poll text breakdown.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>3. Prohibitive B2B SaaS Cost Barriers</h4>
              <p className="hiw-body" style={{ margin: 0 }}>
                Platforms like Toolio are built for enterprise budgets, costing thousands of dollars annually in software licensing fees. For a student-run organization utilizing student fees, paying for an industrial supply chain platform is a non-starter. <br/><br/>
                <strong>The Triton Advantage:</strong> We are an <strong>open-source, non-profit initiative</strong>. By leveraging serverless AI APIs, our operational overhead is extraordinarily low. Even if usage scales to a point where maintaining API request tokens incurs a cost, the platform will be maintained purely at-cost. There will never be corporate markup or enterprise licensing fees—guaranteeing accessibility for student organizations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Market Positioning */}
        <section className="hiw-section" style={{ borderBottom: 'none' }}>
          <div className="hiw-section-label">Our Solution</div>
          <h3 className="hiw-heading">The "Hyper-Localized Micro-SaaS"</h3>
          <p className="hiw-body">
            The Triton Inventory Portal isn't competing with enterprise platforms to manage worldwide logistics. It is a highly specialized, <strong>Zero-Configuration, Event-Driven Demand Calibration Tool</strong>.
          </p>

          <div style={{ overflowX: 'auto', marginTop: '2rem', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--surface-border)' }}>
                  <th style={{ padding: '1rem', color: '#86868b', fontWeight: '600', width: '20%' }}>Feature</th>
                  <th style={{ padding: '1rem', color: '#86868b', fontWeight: '600', width: '40%' }}>Enterprise Software (Toolio / Inventory Planner)</th>
                  <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: '600', width: '40%' }}>Triton Inventory Portal</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#1d1d1f' }}>Primary Data Source</td>
                  <td style={{ padding: '1rem', color: '#444' }}>Years of continuous ERP/Shopify sales logs.</td>
                  <td style={{ padding: '1rem', color: '#444', background: 'rgba(0, 116, 123, 0.03)' }}>Instant, pre-event qualitative social polls & attendance variables.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#1d1d1f' }}>Mathematical Goal</td>
                  <td style={{ padding: '1rem', color: '#444' }}>Global supply chain distribution & continuous replenishment.</td>
                  <td style={{ padding: '1rem', color: '#444', background: 'rgba(0, 116, 123, 0.03)' }}><strong>Single-Period Newsvendor Optimization</strong> for a standalone event drop.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#1d1d1f' }}>Ideal User</td>
                  <td style={{ padding: '1rem', color: '#444' }}>Corporate Inventory Directors managing 20+ locations.</td>
                  <td style={{ padding: '1rem', color: '#444', background: 'rgba(0, 116, 123, 0.03)' }}>Student General Managers printing custom local merchandise.</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#1d1d1f' }}>Business Model</td>
                  <td style={{ padding: '1rem', color: '#444' }}>Heavy monthly corporate software licensing fees.</td>
                  <td style={{ padding: '1rem', color: '#444', background: 'rgba(0, 116, 123, 0.03)' }}>Open-source, non-profit initiative maintained strictly at-cost.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="insight-box" style={{ background: '#f5f5f7', border: '1px solid #e5e5ea', marginTop: '0' }}>
            <p className="hiw-body" style={{ margin: 0, fontWeight: 500 }}>
              While large corporations rely on heavy analytics platforms, <strong>no one else is building tools optimized for the unique, fast-paced rhythm of student-run organizations and campus event culture.</strong> We are filling a completely vacant niche with an accessible, specialized solution.
            </p>
          </div>
        </section>

      </main>

      <footer style={{ textAlign: 'center', marginTop: '2rem', paddingBottom: '2rem', color: '#86868b', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <p>Built by <strong>Brian Ngo</strong> • A <strong>415 Industries</strong> project </p>
        <Image src="/415 industries logo.png" alt="415 Industries" width={120} height={40} style={{ objectFit: 'contain', opacity: 0.8 }} />
      </footer>
    </div>
  );
}
