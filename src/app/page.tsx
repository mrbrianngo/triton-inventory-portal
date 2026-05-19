'use client';

import { useActionState, useEffect, useState } from 'react';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import ReactMarkdown from 'react-markdown';
import { Package, TrendingUp, AlertCircle, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { generatePrediction, PredictionState } from './actions';

// Initial state for the server action
const initialState: PredictionState = {
  report: null,
  predictions: null,
  error: null,
};

// Target distribution based on user request
const SIZE_DISTRIBUTION = {
  S: 0.12,
  M: 0.28,
  L: 0.33,
  XL: 0.22,
  XXL: 0.05,
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(generatePrediction, initialState);

  // Managing dynamic products list
  const [products, setProducts] = useState([
    { id: crypto.randomUUID(), name: '', price: '', willBuy: '', tooExpensive: '' }
  ]);

  const addProduct = () => {
    setProducts([...products, { id: crypto.randomUUID(), name: '', price: '', willBuy: '', tooExpensive: '' }]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: string, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // Calculate size breakdowns for all products
  const getProductBreakdown = (total: number) => {
    const breakdown = {
      S: Math.round(total * SIZE_DISTRIBUTION.S),
      M: Math.round(total * SIZE_DISTRIBUTION.M),
      L: Math.round(total * SIZE_DISTRIBUTION.L),
      XL: Math.round(total * SIZE_DISTRIBUTION.XL),
      XXL: Math.round(total * SIZE_DISTRIBUTION.XXL),
    };

    const sum = Object.values(breakdown).reduce((a, b) => a + b, 0);
    const diff = total - sum;
    if (diff !== 0) {
      breakdown.L += diff;
    }
    return breakdown;
  };

  return (
    <div className="container">
      <NavBar />
      <p className="page-description">
        The Triton Inventory Portal is a specialized prescriptive analytics overlay designed specifically 
        for student-run organizations. By bridging the gap between qualitative social media sentiment and 
        physical manufacturing orders, the backend maps raw pre-event parameters directly to a risk-mitigation 
        single-period optimization framework. It acts as an operational layer to eliminate post-event deadstock 
        while ensuring high-impulse event demand is fully captured.
      </p>

      <main className="main-grid">
        {/* Left Column: Form */}
        <section className="glass form-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <TrendingUp size={24} color="var(--primary)" />
            <h2>Event Parameters</h2>
          </div>

          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="eventName" className="form-label">Event Name</label>
              <input type="text" id="eventName" name="eventName" className="form-input" placeholder="e.g. Sun God Festival" required />
            </div>

            <div className="form-group">
              <label htmlFor="expectedAttendance" className="form-label">Expected Attendance</label>
              <input type="number" id="expectedAttendance" name="expectedAttendance" className="form-input" placeholder="e.g. 5000" required min="1" />
            </div>

            <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#1d1d1f' }}>Product Collection</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {products.map((product, index) => (
                  <div key={product.id} style={{ background: 'var(--inner-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', position: 'relative' }}>

                    {products.length > 1 && (
                      <button type="button" onClick={() => removeProduct(product.id)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }} title="Remove Item">
                        <Trash2 size={18} />
                      </button>
                    )}

                    <div style={{ marginBottom: '1rem', paddingRight: '2rem' }}>
                      <label className="form-label">Item {index + 1} Name</label>
                      <input type="text" className="form-input" style={{ marginTop: '0.5rem' }} placeholder="e.g. Sun God Hoodie" required value={product.name} onChange={(e) => updateProduct(product.id, 'name', e.target.value)} />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Price ($)</label>
                      <input type="number" className="form-input" placeholder="0 for free" required min="0" step="0.01" value={product.price} onChange={(e) => updateProduct(product.id, 'price', e.target.value)} />
                    </div>

                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>Instagram Poll Responses</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ textTransform: 'none', fontSize: '0.8rem', color: '#1d1d1f' }}>"Will Buy" Votes</label>
                        <input type="number" className="form-input" placeholder="e.g. 350" required min="0" value={product.willBuy} onChange={(e) => updateProduct(product.id, 'willBuy', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ textTransform: 'none', fontSize: '0.8rem', color: '#ef4444' }}>"Too Expensive"</label>
                        <input type="number" className="form-input" placeholder="e.g. 120" required min="0" value={product.tooExpensive} onChange={(e) => updateProduct(product.id, 'tooExpensive', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addProduct}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  gap: '0.5rem',
                  background: 'transparent',
                  border: '1px dashed var(--primary)',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  marginTop: '1.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-glow)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Plus size={18} /> Add Another Item
              </button>
            </div>

            {/* Hidden input to pass products array to Server Action */}
            <input type="hidden" name="products" value={JSON.stringify(products)} />

            <button type="submit" className="btn-primary" disabled={isPending}>
              {isPending ? (
                <>
                  <div className="loader"></div>
                  Analyzing Demand...
                </>
              ) : (
                <>
                  <RefreshCw size={20} />
                  Generate Prediction
                </>
              )}
            </button>
          </form>

          {state.error && (
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#b91c1c', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{state.error}</p>
            </div>
          )}
        </section>

        {/* Right Column: Results */}
        <section className="glass results-section">
          {isPending ? (
            <div className="empty-state animate-pulse">
              <RefreshCw size={48} className="loader" style={{ border: 'none', width: '48px', height: '48px', color: 'var(--primary)' }} />
              <p>Consulting the Oracle...</p>
            </div>
          ) : state.report ? (
            <>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <Package size={28} color="var(--primary)" />
                  <h2>Production Plan</h2>
                </div>

                {state.predictions && state.predictions.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                    {state.predictions.map((pred, idx) => {
                      const breakdown = getProductBreakdown(pred.totalUnits);
                      return (
                        <div key={idx} style={{ background: 'var(--inner-surface)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--surface-border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                              <h3 style={{ color: '#1d1d1f', marginBottom: '0.25rem', fontSize: '1.3rem' }}>{pred.name}</h3>
                              <p style={{ color: '#86868b', fontSize: '0.9rem', fontWeight: 500 }}>Prescriptive Streetwear Curve • Calibrated for Collegiate Anthropometric Silhouettes</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ fontSize: '0.85rem', color: '#86868b', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>Total Units</span>
                              <div style={{ color: 'var(--primary)', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1 }}>{pred.totalUnits}</div>
                            </div>
                          </div>

                          <div className="size-grid">
                            {Object.entries(breakdown).map(([size, count]) => (
                              <div key={size} className="size-card" style={{ background: '#ffffff' }}>
                                <span className="size-label">{size}</span>
                                <span className="size-value" style={{ fontSize: '1.25rem' }}>{count}</span>
                                <span className="size-percentage">({(SIZE_DISTRIBUTION[size as keyof typeof SIZE_DISTRIBUTION] * 100).toFixed(0)}%)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="markdown-content">
                  <ReactMarkdown>{state.report}</ReactMarkdown>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <Image src="/images.png" alt="Triton Shell" width={80} height={80} style={{ opacity: 0.2 }} />
              <p>Enter event parameters and add products on the left to generate a data-driven inventory prediction.</p>
            </div>
          )}
        </section>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '2rem', color: '#86868b', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <p>Built by <strong>Brian Ngo</strong> • A <strong>415 Industries</strong> project </p>
        <Image src="/415 industries logo.png" alt="415 Industries" width={120} height={40} style={{ objectFit: 'contain', opacity: 0.8 }} />
      </footer>
    </div>
  );
}
