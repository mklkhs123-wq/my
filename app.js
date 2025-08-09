// Smart Finance App JS - all calculators + live currency + rss news

// --- UI: section switching
const buttons = document.querySelectorAll('.sidebar button');
const panels = document.querySelectorAll('.panel');
buttons.forEach(b => b.addEventListener('click', ()=>{
  buttons.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  const id = b.dataset.section;
  panels.forEach(p=> p.id===id ? p.classList.remove('hidden') : p.classList.add('hidden'));
}));

// --- EMI
function calcEMI(P, rAnnual, years){
  const r = rAnnual/12/100;
  const n = years*12;
  if(r===0) return P/n;
  const emi = (P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  return emi;
}
document.getElementById('emi-calc').addEventListener('click', ()=>{
  const P=+document.getElementById('emi-principal').value;
  const r=+document.getElementById('emi-rate').value;
  const y=+document.getElementById('emi-years').value;
  if(!P||!y) return alert('Enter valid values');
  const emi = calcEMI(P,r,y);
  const total = emi * y * 12;
  const interest = total - P;
  document.getElementById('emi-result').innerHTML = `Monthly EMI: ₹${emi.toFixed(2)}<br>Total Payment: ₹${total.toFixed(2)}<br>Total Interest: ₹${interest.toFixed(2)}`;
});

// --- FD
function calcFD(P, rAnnual, years, comp){
  const n = comp*years;
  const rate = rAnnual/100/comp;
  const A = P*Math.pow(1+rate, n);
  return A;
}
document.getElementById('fd-calc').addEventListener('click', ()=>{
  const P=+document.getElementById('fd-principal').value;
  const r=+document.getElementById('fd-rate').value;
  const y=+document.getElementById('fd-years').value;
  const comp=+document.getElementById('fd-comp').value;
  if(!P||!y) return alert('Enter valid values');
  const A = calcFD(P,r,y,comp);
  document.getElementById('fd-result').innerHTML = `Maturity Amount: ₹${A.toFixed(2)}<br>Interest Earned: ₹${(A-P).toFixed(2)}`;
});

// --- SIP (future value of series)
function calcSIP(monthly, annualRate, years){
  const r = annualRate/12/100;
  const n = years*12;
  const fv = monthly * ( (Math.pow(1+r,n)-1)/r ) * (1+r);
  return fv;
}
document.getElementById('sip-calc').addEventListener('click', ()=>{
  const m=+document.getElementById('sip-monthly').value;
  const r=+document.getElementById('sip-rate').value;
  const y=+document.getElementById('sip-years').value;
  if(!m||!y) return alert('Enter valid values');
  const fv = calcSIP(m,r,y);
  const invested = m*y*12;
  document.getElementById('sip-result').innerHTML = `Maturity Value: ₹${fv.toFixed(2)}<br>Invested Amount: ₹${invested.toFixed(2)}<br>Estimated Gain: ₹${(fv-invested).toFixed(2)}`;
});

// --- RD (approx formula)
function calcRD(monthly, annualRate, years){
  const r = annualRate/12/100;
  const n = years*12;
  // Using accumulated value with 