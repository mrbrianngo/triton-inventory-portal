import NavBar from '@/components/NavBar';
import Image from 'next/image';

export default function HowItWorks() {
  return (
    <div className="container">
      <NavBar />

      <main style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '4rem' }}>

        {/* Intro */}
        <section className="hiw-section">
          <h2 className="hiw-section-title">The Science Behind the Prediction</h2>
          <p className="hiw-body">
            The Triton Inventory Portal is not a simple lookup table or a gut-feel estimate. It is a
            multi-variable demand forecasting engine grounded in price elasticity theory, Bayesian
            statistical correction, and empirical retail conversion research. The engine synthesizes
            four independent data signals into a single production recommendation, optimized to
            minimize deadstock while capturing the maximum viable sales opportunity.
          </p>
        </section>

        {/* Section 1: Demand Model */}
        <section className="hiw-section">
          <div className="hiw-section-label">Model Overview</div>
          <h3 className="hiw-heading">The Composite Demand Forecast</h3>
          <p className="hiw-body">
            The core output—total units to produce for each SKU—is derived from the following
            composite demand function:
          </p>

          <div className="formula-block">
            <div className="formula-main">
              D̂ = A · β<sub>base</sub> · γ(p) · δ(s)
            </div>
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">D̂</span>
                <span className="formula-desc">Predicted unit demand (production quantity)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">A</span>
                <span className="formula-desc">Expected event attendance</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">β<sub>base</sub></span>
                <span className="formula-desc">Empirical base conversion rate (5–15% of attendees, calibrated to college merch)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">γ(p)</span>
                <span className="formula-desc">Price elasticity dampener — suppresses demand as price increases</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">δ(s)</span>
                <span className="formula-desc">Bayesian-corrected social sentiment multiplier</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Price Elasticity */}
        <section className="hiw-section">
          <div className="hiw-section-label">Variable I</div>
          <h3 className="hiw-heading">Price Elasticity Dampener γ(p)</h3>
          <p className="hiw-body">
            Classical price elasticity of demand, <em>E<sub>d</sub></em>, measures how sensitive
            consumers are to a price change. For college merchandise, demand is highly elastic—a small
            price increase causes a disproportionately large drop in purchase intent, because students
            have constrained budgets and must prioritize event tickets, food, and transportation first.
          </p>
          <div className="formula-block">
            <div className="formula-main">
              E<sub>d</sub> = <span className="fraction"><span className="numerator">%ΔQ<sub>demanded</sub></span><span className="denominator">%ΔP</span></span>
            </div>
          </div>
          <p className="hiw-body" style={{ marginTop: '1.5rem' }}>
            The dampener function γ(p) is modeled as an exponential decay applied to the base
            conversion rate. As ticket price p rises, disposable income available for impulse merch
            purchases falls sharply:
          </p>
          <div className="formula-block">
            <div className="formula-main">
              γ(p) = e<sup>−λ · p</sup>
            </div>
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">λ</span>
                <span className="formula-desc">Price sensitivity coefficient (empirically calibrated to 0.012 for college events)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">p</span>
                <span className="formula-desc">Ticket price in USD</span>
              </div>
            </div>
          </div>
          <div className="insight-box">
            <span className="insight-label">Insight</span>
            A $0 (free) event yields γ(p) = 1.0 (no suppression). A $50 ticket yields
            γ(p) ≈ 0.55, effectively halving the conversion rate before any other factors are
            applied—consistent with observed drop-offs at premium campus events.
          </div>
        </section>

        {/* Section 3: Bayesian Social Correction */}
        <section className="hiw-section">
          <div className="hiw-section-label">Variable II</div>
          <h3 className="hiw-heading">Bayesian Social Sentiment Correction δ(s)</h3>
          <p className="hiw-body">
            Raw Instagram poll data is inherently unreliable as a demand signal due to{' '}
            <strong>social desirability bias</strong> and <strong>optimism bias</strong>: respondents
            say they will buy because it feels positive, not because they are truly committed. The
            engine applies a Bayesian update to correct the raw poll signal using a prior distribution
            grounded in observed retail conversion data.
          </p>
          <p className="hiw-body">
            Let <em>θ</em> be the true underlying purchase probability. The prior is set as a Beta
            distribution calibrated to college merch data:
          </p>
          <div className="formula-block">
            <div className="formula-main">
              θ ~ Beta(α<sub>0</sub>, β<sub>0</sub>)
            </div>
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">α<sub>0</sub> = 2</span>
                <span className="formula-desc">Prior successes (historically ~8% of poll responders actually buy)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">β<sub>0</sub> = 23</span>
                <span className="formula-desc">Prior failures (calibrated from field observation)</span>
              </div>
            </div>
          </div>
          <p className="hiw-body" style={{ marginTop: '1.5rem' }}>
            After observing <em>W</em> "Will Buy" votes and <em>X</em> "Too Expensive" votes, the
            posterior mean of θ is:
          </p>
          <div className="formula-block">
            <div className="formula-main">
              θ̂ = <span className="fraction"><span className="numerator">α<sub>0</sub> + W</span><span className="denominator">α<sub>0</sub> + β<sub>0</sub> + W + X</span></span>
            </div>
          </div>
          <p className="hiw-body" style={{ marginTop: '1.5rem' }}>
            The sentiment multiplier δ(s) is then the ratio of the posterior mean to the naive
            (uncorrected) poll ratio:
          </p>
          <div className="formula-block">
            <div className="formula-main">
              δ(s) = <span className="fraction"><span className="numerator">θ̂</span><span className="denominator">W / (W + X)</span></span>
            </div>
          </div>
          <div className="insight-box">
            <span className="insight-label">Insight</span>
            If 400 people vote "Will Buy" and 100 vote "Too Expensive," the naive conversion signal
            is 80%. The Bayesian posterior corrects this down to ~15%, which is far more consistent
            with observed real-world college merch sell-through data.
          </div>
        </section>

        {/* Section 4: Size Distribution */}
        <section className="hiw-section">
          <div className="hiw-section-label">Variable III</div>
          <h3 className="hiw-heading">Streetwear Size Distribution Optimization</h3>
          <p className="hiw-body">
            Once D̂ is determined, total units are allocated across sizes using a right-skewed
            probability mass function (PMF) fitted to observed demand curves in the college
            streetwear segment. Unlike standard retail apparel (which follows a near-normal curve),
            collegiate merch skews toward M and L due to the preference for oversized fits:
          </p>
          <div className="formula-block">
            <div className="formula-main" style={{ fontSize: '1.1rem' }}>
              Q<sub>size</sub> = D̂ · π<sub>size</sub>
            </div>
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">π<sub>size</sub></span>
                <span className="formula-desc">Empirical size probability weight from the distribution below</span>
              </div>
            </div>
          </div>

          <div className="size-dist-visual">
            {[
              { size: 'S', pct: 12, width: 24 },
              { size: 'M', pct: 28, width: 56 },
              { size: 'L', pct: 33, width: 66 },
              { size: 'XL', pct: 22, width: 44 },
              { size: 'XXL', pct: 5, width: 10 },
            ].map(({ size, pct, width }) => (
              <div key={size} className="dist-row">
                <span className="dist-size">{size}</span>
                <div className="dist-bar-track">
                  <div className="dist-bar-fill" style={{ width: `${width * 1.5}%` }} />
                </div>
                <span className="dist-pct">{pct}%</span>
              </div>
            ))}
          </div>

          <p className="hiw-body" style={{ marginTop: '1rem' }}>
            A rounding correction ensures Σ Q<sub>size</sub> = D̂ exactly, with any remainder
            absorbed into the L bin (the modal size class) to prevent inventory shortfall at the
            most demanded size.
          </p>
        </section>

        {/* Section 5: Multi-SKU Cannibalization */}
        <section className="hiw-section">
          <div className="hiw-section-label">Advanced Model</div>
          <h3 className="hiw-heading">Multi-SKU Budget Cannibalization</h3>
          <p className="hiw-body">
            When multiple products are offered at the same event, they compete for the same finite
            consumer budget. The engine models cross-SKU demand suppression using a simplified
            budget-share allocation derived from Dirichlet multinomial demand theory:
          </p>
          <div className="formula-block">
            <div className="formula-main" style={{ fontSize: '1.1rem' }}>
              D̂<sub>k</sub> = D̂<sub>k</sub><sup>(solo)</sup> · <span className="fraction"><span className="numerator">p<sub>k</sub><sup>−η</sup></span><span className="denominator">Σ<sub>j</sub> p<sub>j</sub><sup>−η</sup></span></span>
            </div>
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">D̂<sub>k</sub><sup>(solo)</sup></span>
                <span className="formula-desc">Standalone demand for SKU k if it were the only product</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">η</span>
                <span className="formula-desc">Cross-price substitution elasticity (set to 0.8 for college merch)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">p<sub>k</sub></span>
                <span className="formula-desc">Price of SKU k</span>
              </div>
            </div>
          </div>
          <div className="insight-box">
            <span className="insight-label">Insight</span>
            A $65 hoodie and a $25 tee sold at the same event do not each get their standalone demand.
            The model recognizes that a student who buys the hoodie is unlikely to also buy the tee.
            It redistributes demand proportionally by inverse price weight, preventing the forecasts
            from summing to an impossible total.
          </div>
        </section>

        {/* Closing */}
        <section className="hiw-section" style={{ borderBottom: 'none' }}>
          <h3 className="hiw-heading">Why This Matters for Retail Brands</h3>
          <p className="hiw-body">
            Deadstock—merchandise that does not sell—is the single largest profitability killer for
            small apparel brands. Industry data places average deadstock rates for event merch between
            25% and 40%. By combining price elasticity theory, Bayesian signal correction, and
            empirical size optimization, the Triton Inventory Portal systematically targets this
            problem, giving brands the quantitative rigor of a retail data science team in a simple,
            accessible interface.
          </p>
        </section>

      </main>

      <footer style={{ textAlign: 'center', marginTop: '2rem', paddingBottom: '2rem', color: '#86868b', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <p>Built by <strong>Brian Ngo</strong> • A <strong>415 Industries</strong> project </p>
        <Image src="/415 industries logo.png" alt="415 Industries" width={120} height={40} style={{ objectFit: 'contain', opacity: 0.8 }} />
      </footer>
    </div>
  );
}
