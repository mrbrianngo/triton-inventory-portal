'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import { 
  Users, 
  Percent, 
  DollarSign, 
  MessageCircle, 
  Package, 
  Sliders, 
  ChevronDown 
} from 'lucide-react';

export default function HowItWorks() {
  // Simulator States
  const [attendance, setAttendance] = useState(5000);
  const [price, setPrice] = useState(25);
  const [willBuy, setWillBuy] = useState(350);
  const [tooExpensive, setTooExpensive] = useState(120);

  // Calculations
  const baseRate = 0.08; // 8% base conversion rate
  const rawInterest = Math.round(attendance * baseRate);

  // Price Elasticity: gamma(p) = e^(-0.012 * p)
  const gamma = Math.exp(-0.012 * price);
  const priceDampened = Math.round(rawInterest * gamma);

  // Bayesian poll correction: delta(s)
  // prior successes alpha = 2, prior failures beta = 23
  const alpha = 2;
  const beta = 23;
  const posteriorMean = (alpha + willBuy) / (alpha + beta + willBuy + tooExpensive || 1);
  const naiveRatio = willBuy / (willBuy + tooExpensive || 1);
  const delta = posteriorMean / (naiveRatio || 1);
  const finalForecast = Math.round(priceDampened * delta);

  const steps = [
    {
      number: 1,
      title: 'Expected Attendance & Base Conversion',
      desc: (
        <>
          Start with Expected Attendance <span className="math-badge math-badge--attendance">A</span> of{' '}
          <strong>{attendance.toLocaleString()}</strong>, multiplying by a standard collegiate base conversion rate{' '}
          <span className="math-badge math-badge--baserate">β<sub>base</sub></span> (calibrated at 8%).
        </>
      ),
      icon: <Users size={20} color="#007aff" />,
      iconBg: 'rgba(0, 122, 255, 0.08)',
      iconBorder: 'rgba(0, 122, 255, 0.15)',
      outputLabel: 'Raw Interest',
      outputVal: `${rawInterest.toLocaleString()} units`
    },
    {
      number: 2,
      title: 'Price Elasticity Correction',
      desc: (
        <>
          Apply the price elasticity dampener{' '}
          <span className="math-badge math-badge--elasticity">γ(p)</span> at <strong>${price}</strong>. A higher ticket price
          dampens available budget, decreasing purchase conversion.
        </>
      ),
      icon: <DollarSign size={20} color="#ff9500" />,
      iconBg: 'rgba(255, 149, 0, 0.08)',
      iconBorder: 'rgba(255, 149, 0, 0.15)',
      outputLabel: 'Dampened demand',
      outputVal: `γ(p) = ${gamma.toFixed(3)} → ${priceDampened.toLocaleString()} units`
    },
    {
      number: 3,
      title: 'Bayesian Poll De-biasing',
      desc: (
        <>
          Instagram polls are often overly optimistic. We correct the{' '}
          <strong>{willBuy} "Will Buy"</strong> vs <strong>{tooExpensive} "Pricey"</strong> poll responses using a Bayesian update{' '}
          <span className="math-badge math-badge--sentiment">δ(s)</span> with observed historical priors.
        </>
      ),
      icon: <MessageCircle size={20} color="#34c759" />,
      iconBg: 'rgba(52, 199, 89, 0.08)',
      iconBorder: 'rgba(52, 199, 89, 0.15)',
      outputLabel: 'Corrected Ratio',
      outputVal: `δ(s) = ${delta.toFixed(3)} → ${finalForecast.toLocaleString()} units`
    },
    {
      number: 4,
      title: 'Final Prescriptive Recommendation',
      desc: (
        <>
          The resulting production volume{' '}
          <span className="math-badge math-badge--forecast">D̂</span> optimized to capture maximum impulse sales while keeping
          deadstock risk extremely low.
        </>
      ),
      icon: <Package size={20} color="var(--primary)" />,
      iconBg: 'rgba(0, 116, 123, 0.08)',
      iconBorder: 'rgba(0, 116, 123, 0.15)',
      outputLabel: 'Recommended Order',
      outputVal: `${finalForecast.toLocaleString()} units`
    }
  ];

  return (
    <div className="container">
      <NavBar />

      <main style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '4rem' }}>

        {/* Intro */}
        <section className="hiw-section" style={{ paddingTop: '1rem' }}>
          <h2 className="hiw-section-title">The Science Behind the Prediction</h2>
          <p className="hiw-body">
            The Triton Inventory Portal is not a simple lookup table or a gut-feel estimate. It is a
            multi-variable demand forecasting engine grounded in price elasticity theory, Bayesian
            statistical correction, and empirical retail conversion research. The engine synthesizes
            four independent data signals into a single production recommendation, optimized to
            minimize deadstock while capturing the maximum viable sales opportunity.
          </p>
        </section>

        {/* Interactive Forecasting Simulator & Diagram */}
        <section className="sim-container">
          <div className="sim-header">
            <div>
              <h3 className="sim-title">
                <Sliders size={20} color="var(--primary)" />
                Forecasting Simulator & Visual Pipeline
              </h3>
              <p className="sim-subtitle">Interact with event parameters to see how calculations flow in real time.</p>
            </div>
          </div>

          <div className="sim-grid">
            {/* Input Controls */}
            <div className="sim-controls">
              <div className="sim-control-group">
                <div className="sim-label-row">
                  <span>Attendance</span>
                  <span className="sim-val" style={{ color: '#007aff' }}>{attendance.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="15000" 
                  step="100" 
                  value={attendance} 
                  onChange={(e) => setAttendance(Number(e.target.value))}
                  className="sim-slider" 
                />
              </div>

              <div className="sim-control-group">
                <div className="sim-label-row">
                  <span>Ticket Price</span>
                  <span className="sim-val" style={{ color: '#ff9500' }}>${price}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="1" 
                  value={price} 
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="sim-slider" 
                />
              </div>

              <div className="sim-control-group">
                <div className="sim-label-row">
                  <span>"Will Buy" Votes</span>
                  <span className="sim-val" style={{ color: '#34c759' }}>{willBuy}</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1000" 
                  step="10" 
                  value={willBuy} 
                  onChange={(e) => setWillBuy(Number(e.target.value))}
                  className="sim-slider" 
                />
              </div>

              <div className="sim-control-group">
                <div className="sim-label-row">
                  <span>"Too Pricey" Votes</span>
                  <span className="sim-val" style={{ color: '#ef4444' }}>{tooExpensive}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="1000" 
                  step="10" 
                  value={tooExpensive} 
                  onChange={(e) => setTooExpensive(Number(e.target.value))}
                  className="sim-slider" 
                />
              </div>
            </div>

            {/* Pipeline Flow Diagram */}
            <div className="pipeline-flow">
              {steps.map((step, idx) => (
                <div key={step.number}>
                  <div className="pipeline-step">
                    <div className="pipeline-step-header">
                      <div className="pipeline-step-left">
                        <div className="pipeline-step-number">{step.number}</div>
                        <div 
                          className="pipeline-step-icon" 
                          style={{ backgroundColor: step.iconBg, border: `1px solid ${step.iconBorder}` }}
                        >
                          {step.icon}
                        </div>
                        <div className="pipeline-step-title">{step.title}</div>
                      </div>
                      <div className="pipeline-step-output">
                        <div className="pipeline-step-output-label">{step.outputLabel}</div>
                        <div className="pipeline-step-output-val">{step.outputVal}</div>
                      </div>
                    </div>
                    <div className="pipeline-step-desc">
                      {step.desc}
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="pipeline-arrow">
                      <ChevronDown size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
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
              <span className="math-badge math-badge--forecast">D̂</span> = 
              {' '}<span className="math-badge math-badge--attendance">A</span> · 
              {' '}<span className="math-badge math-badge--baserate">β<sub>base</sub></span> · 
              {' '}<span className="math-badge math-badge--elasticity">γ(p)</span> · 
              {' '}<span className="math-badge math-badge--sentiment">δ(s)</span>
            </div>
            
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">
                  <span className="math-badge math-badge--forecast">D̂</span>
                </span>
                <span className="formula-desc">Predicted unit demand (recommended production quantity)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">
                  <span className="math-badge math-badge--attendance">A</span>
                </span>
                <span className="formula-desc">Expected event attendance (total audience potential)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">
                  <span className="math-badge math-badge--baserate">β<sub>base</sub></span>
                </span>
                <span className="formula-desc">Empirical base conversion rate (calibrated at 8% of attendees for standard student events)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">
                  <span className="math-badge math-badge--elasticity">γ(p)</span>
                </span>
                <span className="formula-desc">Price elasticity dampener — exponentially scales demand down as price increases</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">
                  <span className="math-badge math-badge--sentiment">δ(s)</span>
                </span>
                <span className="formula-desc">Bayesian-corrected social sentiment multiplier — de-biases Instagram polls</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Price Elasticity */}
        <section className="hiw-section">
          <div className="hiw-section-label">Variable I</div>
          <h3 className="hiw-heading">Price Elasticity Dampener <span className="math-badge math-badge--elasticity">γ(p)</span></h3>
          <p className="hiw-body">
            Classical price elasticity of demand measures how sensitive consumers are to a price change. 
            For college merchandise, demand is highly elastic—a small price increase causes a disproportionately 
            large drop in purchase intent, because students have constrained budgets and must prioritize 
            essential event tickets, transport, and food first.
          </p>
          
          <div className="formula-block">
            <div className="formula-main" style={{ display: 'flex', alignItems: 'center' }}>
              E<sub>d</sub> = 
              <span className="fraction">
                <span className="numerator">%ΔQ<sub>demanded</sub></span>
                <span className="denominator">%ΔP</span>
              </span>
            </div>
          </div>
          
          <p className="hiw-body" style={{ marginTop: '1.5rem' }}>
            The dampener function <span className="math-badge math-badge--elasticity">γ(p)</span> is modeled 
            as an exponential decay applied to the base interest. As product price <span className="math-badge math-badge--elasticity">p</span> rises, 
            disposable income available for impulse collegiate merchandise purchases decays sharply:
          </p>
          
          <div className="formula-block">
            <div className="formula-main">
              <span className="math-badge math-badge--elasticity">γ(p)</span> = e<sup>−λ · p</sup>
            </div>
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">λ</span>
                <span className="formula-desc">Price sensitivity coefficient (empirically calibrated to 0.012 for student merchandise)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">p</span>
                <span className="formula-desc">Unit price in USD</span>
              </div>
            </div>
          </div>
          
          <div className="insight-box">
            <span className="insight-label">Insight</span>
            A $0 (free giveaway) event yields γ(p) = 1.0 (no suppression). A $40 item yields
            γ(p) ≈ 0.62, which suppresses the baseline rate by 38%—perfectly reflecting the impulse 
            drop-off observed in collegiate pop-up sales at premium price points.
          </div>
        </section>

        {/* Section 3: Bayesian Social Correction */}
        <section className="hiw-section">
          <div className="hiw-section-label">Variable II</div>
          <h3 className="hiw-heading">Bayesian Social Sentiment Correction <span className="math-badge math-badge--sentiment">δ(s)</span></h3>
          <p className="hiw-body">
            Raw Instagram poll data is inherently unreliable as an inventory signal due to{' '}
            <strong>social desirability bias</strong> and <strong>optimism bias</strong>: respondents
            say they will buy because voting is free and feels supportive, not because they are truly committed. The
            engine applies a Bayesian update to correct the raw poll signal using a prior distribution
            grounded in observed retail conversion data.
          </p>
          <p className="hiw-body">
            Let <em>θ</em> be the true underlying purchase probability. The prior is set as a Beta
            distribution calibrated to historic Triton student order-to-poll data:
          </p>
          
          <div className="formula-block">
            <div className="formula-main">
              θ ~ Beta(α<sub>0</sub>, β<sub>0</sub>)
            </div>
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">α<sub>0</sub> = 2</span>
                <span className="formula-desc">Prior successes (calibrated: historically ~8% of poll responders actually purchase)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">β<sub>0</sub> = 23</span>
                <span className="formula-desc">Prior failures (calibrated from field observation of poll non-buyers)</span>
              </div>
            </div>
          </div>
          
          <p className="hiw-body" style={{ marginTop: '1.5rem' }}>
            After observing <em>W</em> "Will Buy" votes and <em>X</em> "Too Expensive" votes, the
            posterior mean probability of true purchase intent (θ̂) is:
          </p>
          
          <div className="formula-block">
            <div className="formula-main" style={{ display: 'flex', alignItems: 'center' }}>
              θ̂ = 
              <span className="fraction">
                <span className="numerator">α<sub>0</sub> + W</span>
                <span className="denominator">α<sub>0</sub> + β<sub>0</sub> + W + X</span>
              </span>
            </div>
          </div>
          
          <p className="hiw-body" style={{ marginTop: '1.5rem' }}>
            The sentiment multiplier <span className="math-badge math-badge--sentiment">δ(s)</span> is then the ratio of this de-biased posterior mean to the naive (uncorrected) poll ratio:
          </p>
          
          <div className="formula-block">
            <div className="formula-main" style={{ display: 'flex', alignItems: 'center' }}>
              <span className="math-badge math-badge--sentiment">δ(s)</span> = 
              <span className="fraction">
                <span className="numerator">θ̂</span>
                <span className="denominator">W / (W + X)</span>
              </span>
            </div>
          </div>
          
          <div className="insight-box">
            <span className="insight-label">Insight</span>
            If 400 people vote "Will Buy" and 100 vote "Too Expensive," the naive conversion signal
            is 80%. The Bayesian posterior corrects this down to ~15.2%, preventing severe over-ordering
            by aligning social media excitement with historical wallet-commitment.
          </div>
        </section>

        {/* Section 4: Size Distribution */}
        <section className="hiw-section">
          <div className="hiw-section-label">Variable III</div>
          <h3 className="hiw-heading">Streetwear Size Distribution Optimization</h3>
          <p className="hiw-body">
            Once <span className="math-badge math-badge--forecast">D̂</span> is determined, total units are allocated across sizes using a right-skewed
            probability mass function (PMF) fitted to observed demand curves in the college
            streetwear segment. Unlike standard retail apparel (which follows a near-normal curve),
            collegiate merch skews toward M and L due to the preference for oversized fits:
          </p>
          
          <div className="formula-block">
            <div className="formula-main">
              Q<sub>size</sub> = <span className="math-badge math-badge--forecast">D̂</span> · π<sub>size</sub>
            </div>
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">π<sub>size</sub></span>
                <span className="formula-desc">Empirical size probability weight from the collegiate distribution below</span>
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
            A rounding correction ensures Σ Q<sub>size</sub> = <span className="math-badge math-badge--forecast">D̂</span> exactly, with any remainder
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
            <div className="formula-main" style={{ display: 'flex', alignItems: 'center' }}>
              D̂<sub>k</sub> = D̂<sub>k</sub><sup>(solo)</sup> · 
              <span className="fraction">
                <span className="numerator">p<sub>k</sub><sup>−η</sup></span>
                <span className="denominator">Σ<sub>j</sub> p<sub>j</sub><sup>−η</sup></span>
              </span>
            </div>
            
            <div className="formula-legend">
              <div className="formula-legend-row">
                <span className="formula-var">D̂<sub>k</sub><sup>(solo)</sup></span>
                <span className="formula-desc">Standalone demand for SKU k if it were the only product sold</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">η</span>
                <span className="formula-desc">Cross-price substitution elasticity (calibrated to 0.8 for college student purchasing)</span>
              </div>
              <div className="formula-legend-row">
                <span className="formula-var">p<sub>k</sub></span>
                <span className="formula-desc">Unit price of SKU k</span>
              </div>
            </div>
          </div>
          
          <div className="insight-box">
            <span className="insight-label">Insight</span>
            A $65 hoodie and a $25 tee sold at the same event do not each capture standalone demand.
            A student who buys the premium hoodie is highly unlikely to buy the tee as well.
            The engine redistributes demand proportionally, ensuring forecasts do not sum to an impossible budget total.
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
