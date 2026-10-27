
  (function() {
    const resultField = document.getElementById('result');
    const ledDots = document.querySelectorAll('#ledStrip .led-dot');
    let currentInput = '0';
    let previousOperand = null;
    let operator = null;
    let shouldResetScreen = false;

    function updateDisplay(value) {
      let str = value.toString();
      if (str.length > 12) str = parseFloat(value).toExponential(6);
      resultField.value = str;
      const num = parseFloat(str);
      if (str === 'Error' || str === 'NaN' || str === 'Infinity') {
        resultField.classList.add('led-error');
        resultField.style.textShadow = '0 0 12px #ff4444, 0 0 35px #ff0000';
      } else {
        resultField.classList.remove('led-error');
        let hue = 200;
        if (!isNaN(num)) {
          let absVal = Math.abs(num) || 0;
          let intPart = Math.floor(absVal) % 100;
          let fracPart = absVal - Math.floor(absVal);
          let t = (intPart + fracPart) / 100;
          hue = (t * 360 * 2) % 360;
          if (num === 0) hue = 200;
          if (num > 999) hue = 40;
        }
        const color = `hsl(${hue}, 90%, 65%)`;
        resultField.style.textShadow = `0 0 12px ${color}, 0 0 28px ${color}`;
        resultField.style.backgroundColor = `hsla(${hue}, 70%, 15%, 0.3)`;
      }
      let activeCount = 0;
      if (str === 'Error' || str === 'NaN' || str === 'Infinity') activeCount = 5;
      else if (!isNaN(num)) {
        const absNum = Math.abs(num);
        if (absNum === 0) activeCount = 2;
        else if (absNum < 1) activeCount = 3;
        else if (absNum < 100) activeCount = 4;
        else activeCount = 5;
        if (str.length > 8) activeCount = 5;
      }
      for (let i = 0; i < ledDots.length; i++) {
        if (i < activeCount) {
          ledDots[i].classList.add('active');
          if (!resultField.classList.contains('led-error')) {
            let baseHue = 200;
            const numVal = parseFloat(resultField.value);
            if (!isNaN(numVal)) {
              let intP = Math.floor(Math.abs(numVal)) % 100;
              let fracP = Math.abs(numVal) - Math.floor(Math.abs(numVal));
              let t = (intP + fracP) / 100;
              baseHue = (t * 360 * 2) % 360;
              if (numVal === 0) baseHue = 200;
            }
            const dotHue = (baseHue + i * 15) % 360;
            ledDots[i].style.background = `hsl(${dotHue}, 95%, 60%)`;
            ledDots[i].style.boxShadow = `0 0 14px hsl(${dotHue}, 100%, 65%)`;
          } else { ledDots[i].style.background = '#ff4444'; }
        } else {
          ledDots[i].classList.remove('active');
          ledDots[i].style.background = '#3b425b';
        }
      }
    }
    function evaluate() {
      if (previousOperand === null || operator === null) return currentInput;
      const prev = parseFloat(previousOperand);
      const curr = parseFloat(currentInput);
      if (isNaN(prev) || isNaN(curr)) return 'Error';
      let computed;
      switch(operator) {
        case '+': computed = prev + curr; break;
        case '−': computed = prev - curr; break;
        case '×': computed = prev * curr; break;
        case '÷': if (curr === 0) return 'Error'; computed = prev / curr; break;
        case '%': computed = prev % curr; break;
        default: return currentInput;
      }
      if (Number.isFinite(computed)) computed = Math.round(computed * 1e10) / 1e10;
      return computed.toString();
    }
    function handleButton(value, type) {
      if (type === 'clear') { currentInput = '0'; previousOperand = null; operator = null; shouldResetScreen = false; updateDisplay(currentInput); return; }
      if (type === 'backspace') { if (currentInput === 'Error') currentInput = '0'; else currentInput = currentInput.toString().slice(0, -1); if (currentInput === '' || currentInput === '-') currentInput = '0'; updateDisplay(currentInput); return; }
      if (resultField.value === 'Error' || resultField.value === 'NaN') { if (type === 'number' || type === 'dot') { currentInput = '0'; previousOperand = null; operator = null; shouldResetScreen = false; } }
      if (type === 'number') { if (shouldResetScreen || currentInput === '0' || currentInput === 'Error') currentInput = value; else currentInput = currentInput + value; shouldResetScreen = false; updateDisplay(currentInput); }
      else if (type === 'dot') { if (shouldResetScreen || currentInput === 'Error') currentInput = '0.'; else if (!currentInput.includes('.')) currentInput = currentInput + '.'; updateDisplay(currentInput); }
      else if (type === 'operator') { if (operator !== null && !shouldResetScreen) { const res = evaluate(); if (res === 'Error') { currentInput = 'Error'; previousOperand = null; operator = null; updateDisplay(currentInput); return; } currentInput = res; previousOperand = currentInput; } else previousOperand = currentInput; operator = value; shouldResetScreen = true; updateDisplay(currentInput); }
      else if (type === 'equals') { if (previousOperand !== null && operator !== null) { const res = evaluate(); if (res === 'Error') currentInput = 'Error'; else currentInput = res; previousOperand = null; operator = null; } shouldResetScreen = true; updateDisplay(currentInput); }
    }
    const mapping = [
      ['calcClear', null, 'clear'], ['calcBackspace', null, 'backspace'], ['calcPercent', '%', 'operator'], ['calcDivide', '÷', 'operator'],
      ['calc7', '7', 'number'], ['calc8', '8', 'number'], ['calc9', '9', 'number'], ['calcMultiply', '×', 'operator'],
      ['calc4', '4', 'number'], ['calc5', '5', 'number'], ['calc6', '6', 'number'], ['calcSubtract', '−', 'operator'],
      ['calc1', '1', 'number'], ['calc2', '2', 'number'], ['calc3', '3', 'number'], ['calcAdd', '+', 'operator'],
      ['calc0', '0', 'number'], ['calcDot', '.', 'dot'], ['calcEquals', null, 'equals']
    ];
    mapping.forEach(([id, val, type]) => { const btn = document.getElementById(id); if (btn) btn.addEventListener('click', () => handleButton(val, type)); });
    updateDisplay('0');
    window.addEventListener('keydown', (e) => { if (!document.getElementById('floatingCalc').classList.contains('active')) return; const key = e.key; if (key >= '0' && key <= '9') handleButton(key, 'number'); else if (key === '.') handleButton('.', 'dot'); else if (key === '+') handleButton('+', 'operator'); else if (key === '-') handleButton('−', 'operator'); else if (key === '*') handleButton('×', 'operator'); else if (key === '/') { e.preventDefault(); handleButton('÷', 'operator'); } else if (key === '%') handleButton('%', 'operator'); else if (key === '=' || key === 'Enter') handleButton(null, 'equals'); else if (key === 'Escape') handleButton(null, 'clear'); else if (key === 'Backspace') { e.preventDefault(); handleButton(null, 'backspace'); } });
  })();

  // Floating calc toggle with new side button
  const floatingCalc = document.getElementById('floatingCalc');
  const sideCalcBtn = document.getElementById('sideCalcBtn');
  const closeCalcBtn = document.getElementById('closeCalcBtn');
  
  sideCalcBtn.addEventListener('click', () => floatingCalc.classList.add('active'));
  closeCalcBtn.addEventListener('click', () => floatingCalc.classList.remove('active'));
  
  // Click outside to close calculator (optional but nice)
  document.addEventListener('click', (e) => {
    if (floatingCalc.classList.contains('active') && 
        !floatingCalc.contains(e.target) && 
        e.target !== sideCalcBtn &&
        !sideCalcBtn.contains(e.target)) {
      floatingCalc.classList.remove('active');
    }
  });

  // ==================== LOGIN MODAL LOGIC ====================
  const loginModal = document.getElementById('loginModal');
  const openLoginBtn = document.getElementById('openLoginBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const loginPanel = document.getElementById('loginForm');
  const registerPanel = document.getElementById('registerForm');
  const formFooterMsg = document.getElementById('formFooterMsg');

  function showModal() { loginModal.classList.add('active'); }
  function hideModal() { loginModal.classList.remove('active'); formFooterMsg.innerHTML = ''; }

  openLoginBtn.addEventListener('click', showModal);
  closeModalBtn.addEventListener('click', hideModal);
  loginModal.addEventListener('click', (e) => { if (e.target === loginModal) hideModal(); });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (tab === 'login') { loginPanel.style.display = 'block'; registerPanel.style.display = 'none'; }
      else { loginPanel.style.display = 'none'; registerPanel.style.display = 'block'; }
      formFooterMsg.innerHTML = '';
    });
  });

  document.getElementById('submitLoginBtn').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const pwd = document.getElementById('loginPassword').value.trim();
    if (!email || !pwd) { formFooterMsg.innerHTML = '<span style="color:#c44;">⚠️ Please fill both fields</span>'; return; }
    formFooterMsg.innerHTML = '<span style="color:#2c5523;"><i class="fas fa-check-circle"></i> Welcome back! (Demo login)</span>';
    setTimeout(() => { hideModal(); showToastMessage(`👋 Welcome ${email.split('@')[0]}!`, 1800); }, 800);
  });

  document.getElementById('submitRegisterBtn').addEventListener('click', () => {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pwd = document.getElementById('regPassword').value.trim();
    if (!name || !email || !pwd) { formFooterMsg.innerHTML = '<span style="color:#c44;">⚠️ All fields required</span>'; return; }
    formFooterMsg.innerHTML = '<span style="color:#2c5523;"><i class="fas fa-user-check"></i> Account created! You can now login.</span>';
    setTimeout(() => { hideModal(); showToastMessage(`🎉 Welcome ${name}! Account ready`, 2000); }, 1000);
  });

  function showToastMessage(msg, duration = 2000) {
    const toast = document.getElementById('cartToast');
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, duration);
  }

  // Cart toast
  const toastEl = document.getElementById('cartToast');
  let toastTimer = null;
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.product-card');
      const name = card?.getAttribute('data-name') || 'item';
      const price = card?.getAttribute('data-price') || '';
      toastEl.textContent = `🛒 ${name} added — $${price}`;
      toastEl.style.opacity = '1';
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toastEl.style.opacity = '0'; }, 2000);
    });
  });