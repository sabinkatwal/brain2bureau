import React, { useEffect, useState } from 'react';
import '../styles/MyAccount.css';
import Toast from './Toast';

export default function MyAccount({ onNavigate, toggleDarkMode }) {
  const [profile, setProfile] = useState(() => { try { return JSON.parse(localStorage.getItem('profile') || '{}'); } catch(e) { return {}; } });
  const [exams, setExams] = useState(() => { try { return JSON.parse(localStorage.getItem('examHistory') || '[]'); } catch(e) { return []; } });
  const [resourceStates, setResourceStates] = useState(() => { try { return JSON.parse(localStorage.getItem('resourceStates') || '{}'); } catch(e) { return {}; } });
  const [activityLog, setActivityLog] = useState(() => { try { return JSON.parse(localStorage.getItem('activityLog') || '[]'); } catch(e) { return []; } });
  const [isDarkMode, setIsDarkMode] = useState(() => { try { return JSON.parse(localStorage.getItem('darkMode') || 'false'); } catch(e){ return false; } });

  const [formProfile, setFormProfile] = useState(profile);
  const [toast, setToast] = useState({ open: false, message: '' });

  useEffect(() => {
    const examHandler = () => setExams(JSON.parse(localStorage.getItem('examHistory') || '[]'));
    const resourceHandler = () => setResourceStates(JSON.parse(localStorage.getItem('resourceStates') || '{}'));
    const activityHandler = () => setActivityLog(JSON.parse(localStorage.getItem('activityLog') || '[]'));
    const profileHandler = () => { const p = JSON.parse(localStorage.getItem('profile') || '{}'); setProfile(p); setFormProfile(p); };

    window.addEventListener('examHistoryChanged', examHandler);
    window.addEventListener('resourceStatesChanged', resourceHandler);
    window.addEventListener('activityLogChanged', activityHandler);
    window.addEventListener('storage', (e) => { if (e.key === 'profile') profileHandler(); if (e.key === 'darkMode') setIsDarkMode(JSON.parse(localStorage.getItem('darkMode') || 'false')); });
    window.addEventListener('profileChanged', profileHandler);

    const interval = setInterval(() => {
      examHandler(); resourceHandler(); activityHandler(); profileHandler();
    }, 2000);

    return () => { window.removeEventListener('examHistoryChanged', examHandler); window.removeEventListener('resourceStatesChanged', resourceHandler); window.removeEventListener('activityLogChanged', activityHandler); window.removeEventListener('profileChanged', profileHandler); clearInterval(interval); };
  }, []);

  useEffect(() => { setFormProfile(profile); }, [profile]);

  const examsTaken = exams.length;
  const avgScore = examsTaken ? Math.round(exams.reduce((s,x) => s + (x.percentage||0), 0) / examsTaken) : 0;
  const bestScore = examsTaken ? Math.max(...exams.map(e => e.percentage || 0)) : 0;
  const recentExam = exams[0] || null;
  const totalStudySeconds = exams.reduce((s, e) => s + (e.duration || 0), 0);
  const totalStudyTimeFormatted = `${Math.floor(totalStudySeconds / 60)}m`;

  // Per-category averages (uses breakdown saved in examHistory)
  const categoryStats = {};
  exams.forEach(e => {
    if (!e.breakdown) return;
    Object.keys(e.breakdown).forEach(cat => {
      const b = e.breakdown[cat];
      const pct = b.total ? Math.round((b.correct / b.total) * 100) : 0;
      if (!categoryStats[cat]) categoryStats[cat] = { sum: 0, count: 0 };
      categoryStats[cat].sum += pct;
      categoryStats[cat].count += 1;
    });
  });
  const perCategory = {};
  Object.keys(categoryStats).forEach(k => { perCategory[k] = Math.round(categoryStats[k].sum / categoryStats[k].count); });

  const weakSubjects = Object.keys(perCategory).filter(k => perCategory[k] < 60);
  const strongSubjects = Object.keys(perCategory).filter(k => perCategory[k] >= 80);

  // streak
  const computeStreak = () => {
    const dates = new Set();
    (activityLog||[]).forEach(a => { try { const d = new Date(a.time).toISOString().slice(0,10); dates.add(d); } catch(e){} });
    (exams||[]).forEach(e => { try { const d = new Date(e.time).toISOString().slice(0,10); dates.add(d); } catch(e){} });
    let streak = 0; let day = new Date();
    while (true) {
      const key = day.toISOString().slice(0,10);
      if (dates.has(key)) { streak++; day.setDate(day.getDate()-1); } else break;
    }
    return streak;
  };

  const performanceRank = avgScore >= 90 ? 'Top 1%' : avgScore >= 80 ? 'Top 10%' : avgScore >= 70 ? 'Top 25%' : avgScore >= 60 ? 'Top 50%' : 'Keep Improving';

  const uploadAvatar = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => { const data = ev.target.result; const p = {...profile, avatar: data}; setProfile(p); localStorage.setItem('profile', JSON.stringify(p)); try{ window.dispatchEvent(new Event('profileChanged')); } catch(e){} };
    r.readAsDataURL(file);
  };

  const setField = (k, v) => { const p = {...profile, [k]: v}; setProfile(p); localStorage.setItem('profile', JSON.stringify(p)); try{ window.dispatchEvent(new Event('profileChanged')); } catch(e){} };

  const resetProgress = () => {
    if (!confirm('Reset all progress and history? This cannot be undone.')) return;
    localStorage.removeItem('resourceStates');
    localStorage.removeItem('examHistory');
    localStorage.removeItem('activityLog');
    try { window.dispatchEvent(new Event('resourceStatesChanged')); } catch(e){}
    try { window.dispatchEvent(new Event('examHistoryChanged')); } catch(e){}
    try { window.dispatchEvent(new Event('activityLogChanged')); } catch(e){}
    setResourceStates({}); setExams([]); setActivityLog([]);
    alert('Progress reset.');
  };

  const logout = () => { if (!confirm('Sign out?')) return; localStorage.removeItem('profile'); setProfile({}); onNavigate('home'); };

  const resumeLast = () => {
    const last = exams[0];
    if (!last) { alert('No previous exams to resume'); return; }
    localStorage.setItem('resumeExam', JSON.stringify(last));
    try{ window.dispatchEvent(new CustomEvent('resumeExamRequested', { detail: last })); } catch(e){}
    onNavigate('mock-exams');
  };

  return (
    <div className="myaccount-container">
      <div className="myaccount-card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <button className="back-button" onClick={() => onNavigate('home')}>← Back</button>
        </div>
        <div className="myaccount-header">
          <div className="myaccount-avatar">
            <div className="avatar-preview" style={{ backgroundImage: profile.avatar ? `url(${profile.avatar})` : undefined }}>{!profile.avatar && (profile.fullName ? profile.fullName.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U')}</div>
            <div>
              <label className="small-button" htmlFor="avatarInp">Change</label>
              <input id="avatarInp" type="file" accept="image/*" onChange={(e)=> uploadAvatar(e.target.files && e.target.files[0])} style={{display:'none'}} />
            </div>
          </div>

          <div className="myaccount-info">
            <h2>{profile.fullName || 'Your Name'}</h2>
            <div className="muted">@{profile.username || 'username'}</div>
            <div className="meta-row">Target: <strong>{profile.targetExam || 'general-knowledge'}</strong></div>
            <div className="meta-row">Rank: <span className="rank-pill">{performanceRank}</span></div>
            <div style={{marginTop:8}} className="edit-row">
              <input className="field-input" placeholder="Full name" value={formProfile.fullName||''} onChange={(e)=> setFormProfile({...formProfile, fullName: e.target.value})} />
              <input className="field-input" placeholder="Username" value={formProfile.username||''} onChange={(e)=> setFormProfile({...formProfile, username: e.target.value})} />
              <input className="field-input" placeholder="Target exam" value={formProfile.targetExam||''} onChange={(e)=> setFormProfile({...formProfile, targetExam: e.target.value})} />
              <div style={{display:'flex', gap:8}}>
                <button className="small-button" onClick={() => {
                  // save
                  const p = {...profile, ...formProfile}; setProfile(p); localStorage.setItem('profile', JSON.stringify(p)); try{ window.dispatchEvent(new Event('profileChanged')); } catch(e) {}
                  setToast({ open: true, message: 'Profile saved' }); setTimeout(() => setToast({ open: false, message: '' }), 2200);
                }}>Save</button>
                <button className="small-button" onClick={() => { setFormProfile(profile); setToast({ open: true, message: 'Edits canceled' }); setTimeout(() => setToast({ open: false, message: '' }), 1200); }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <div className="myaccount-stats">
          <div className="stat">
            <div className="stat-number">{examsTaken}</div>
            <div className="stat-label">Exams</div>
          </div>
          <div className="stat">
            <div className="stat-number">{avgScore}%</div>
            <div className="stat-label">Average</div>
          </div>
          <div className="stat">
            <div className="stat-number">{bestScore}%</div>
            <div className="stat-label">Best</div>
          </div>
          <div className="stat">
            <div className="stat-number">{computeStreak()}</div>
            <div className="stat-label">Streak (days)</div>
          </div>
        </div>

        <div className="myaccount-sections">
          <div className="section">
            <h3>Performance</h3>
            <div className="perf-row">
              <div>GK: <strong>{perCategory['general-knowledge'] ?? '—'}</strong></div>
              <div>Constitution: <strong>{perCategory['constitution'] ?? '—'}</strong></div>
            </div>
            <div style={{marginTop:6}}>
              {weakSubjects.length>0 && <div className="badge badge-weak">Weak: {weakSubjects.join(', ')}</div>}
              {strongSubjects.length>0 && <div className="badge badge-strong">Strong: {strongSubjects.join(', ')}</div>}
            </div>
          </div>

          <div className="section">
            <h3>Recent Exams</h3>
            <div className="recent-list">
              {exams.slice(0,6).map((e, i) => (
                <div key={i} className="exam-row">
                  <div>{new Date(e.time).toLocaleString()}</div>
                  <div>{e.percentage}%</div>
                  <div><button className="small-button" onClick={() => { localStorage.setItem('resumeExam', JSON.stringify(e)); try{ window.dispatchEvent(new CustomEvent('resumeExamRequested', { detail: e })); } catch(e){} onNavigate('mock-exams'); }}>Resume</button></div>
                </div>
              ))}
              {!exams.length && <div className="muted">No exams taken yet</div>}
            </div>
          </div>

          <div style={{gridColumn:'1 / -1', marginTop:12, padding:12, borderTop:'1px solid var(--border-color)'}} className="footer-card">
            <div className="muted">App Version: v0.1.0</div>
            <div className="muted" style={{marginTop:6}}>Motivation: {(() => { const overall = (Object.values(resourceStates).length ? Math.round(Object.values(resourceStates).reduce((s,r)=>s+(r.progress||0),0)/Object.values(resourceStates).length) : 0); if (overall >= 80) return 'Great work — keep it up!'; if (overall >=50) return 'Nice progress — stay consistent.'; return 'Keep going — small steps every day.'; })()}</div>
          </div>
        </div>

      </div>
      <Toast open={toast.open} message={toast.message} onClose={() => setToast({ open: false, message: '' })} />
    </div>
  );
}
