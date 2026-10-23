document.addEventListener("DOMContentLoaded", () => {
    let draft = loadDraft();
    
    // Redirect to index if no service is selected
    if (!draft.serviceId) {
        window.location.href = "index.html";
        return;
    }
    
    // Elements
    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");
    
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const step4 = document.getElementById("step4");
    
    const progressStep2 = document.getElementById("progressStep2");
    const progressStep3 = document.getElementById("progressStep3");
    const progressStep4 = document.getElementById("progressStep4");
    
    // Navigation functions
    function goToStep(stepNumber) {
        draft.currentStep = stepNumber;
        saveDraft(draft);
        
        // Toggle steps and progress visuals
        [step2, step3, step4].forEach((s, idx) => {
            const stepNum = idx + 2;
            s.classList.toggle("active", stepNumber === stepNum);
            
            const p = [progressStep2, progressStep3, progressStep4][idx];
            p.className = "step-item" + (stepNumber === stepNum ? " active" : stepNumber > stepNum ? " completed" : "");
        });
        
        const content = {
            2: { t: "Select Date & Time.", s: "Find a time that works for you." },
            3: { t: "Your Details.", s: "Let us know who we are meeting." },
            4: { t: "Review Booking.", s: "Check your session details before confirming." }
        };
        
        pageTitle.textContent = content[stepNumber].t;
        pageSubtitle.textContent = content[stepNumber].s;
        
        if (stepNumber === 4) renderReview();
    }
    
    // --- STEP 2: Date & Time ---
    const dateSelector = document.getElementById("dateSelector");
    const timeSelector = document.getElementById("timeSelector");
    const btnContinueStep2 = document.getElementById("btnContinueStep2");
    const btnBackStep2 = document.getElementById("btnBackStep2");
    const dateTimeValidation = document.getElementById("dateTimeValidation");
    
    function generateDates() {
        const dates = [];
        const today = new Date();
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        
        // Generate next 14 days
        for (let i = 1; i <= 14; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            
            // Skip weekends for business days
            if (d.getDay() !== 0 && d.getDay() !== 6) {
                dates.push({
                    fullDate: d.toISOString().split('T')[0], // YYYY-MM-DD
                    dayName: days[d.getDay()],
                    dayNum: d.getDate(),
                    month: d.toLocaleString('default', { month: 'long' }),
                    year: d.getFullYear()
                });
            }
        }
        return dates.slice(0, 10);
    }
    
    function renderDates() {
        dateSelector.innerHTML = '';
        const dates = generateDates();
        
        dates.forEach(d => {
            const btn = document.createElement("button");
            btn.className = `date-btn ${draft.date === d.fullDate ? 'selected' : ''}`;
            btn.innerHTML = `
                <span class="date-day">${d.dayName}</span>
                <span class="date-num">${d.dayNum}</span>
            `;
            
            btn.addEventListener("click", () => {
                draft.date = d.fullDate;
                
                // Keep the human readable string for review
                draft.dateDisplay = `${d.dayName}, ${d.month} ${d.dayNum}`; 
                
                saveDraft(draft);
                renderDates();
                updateStep2Validation();
            });
            
            dateSelector.appendChild(btn);
        });
    }
    
    function renderTimeSlots() {
        timeSelector.innerHTML = '';
        
        ATELIER_DATA.timeSlots.forEach(time => {
            const btn = document.createElement("button");
            
            // Randomly disable some slots for realism
            // Based on hash of date+time so it's consistent during a session
            const seed = (draft.date || "none") + time;
            const isUnavailable = seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 5 === 0;
            
            btn.className = `time-btn ${draft.time === time ? 'selected' : ''}`;
            btn.disabled = isUnavailable;
            btn.textContent = time;
            
            if (!isUnavailable) {
                btn.addEventListener("click", () => {
                    draft.time = time;
                    saveDraft(draft);
                    renderTimeSlots();
                    updateStep2Validation();
                });
            }
            
            timeSelector.appendChild(btn);
        });
    }
    
    function updateStep2Validation() {
        dateTimeValidation.classList.toggle("hidden", !!(draft.date && draft.time));
    }
    
    btnContinueStep2.addEventListener("click", () => {
        const isValid = !!(draft.date && draft.time);
        dateTimeValidation.classList.toggle("hidden", isValid);
        if (isValid) goToStep(3);
    });
    
    btnBackStep2.addEventListener("click", () => {
        window.location.href = "index.html";
    });
    
    // --- STEP 3: Details ---
    const detailsForm = document.getElementById("detailsForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const noteInput = document.getElementById("note");
    const btnContinueStep3 = document.getElementById("btnContinueStep3");
    const btnBackStep3 = document.getElementById("btnBackStep3");
    
    // Populate form if draft has data
    if (draft.details) {
        fullNameInput.value = draft.details.name || '';
        emailInput.value = draft.details.email || '';
        phoneInput.value = draft.details.phone || '';
        noteInput.value = draft.details.note || '';
    }
    
    btnContinueStep3.addEventListener("click", () => {
        const nameVal = fullNameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const phoneVal = phoneInput.value.trim();
        
        const isNameValid = !!nameVal;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
        const isPhoneValid = phoneVal.length >= 7;
        
        fullNameInput.classList.toggle("error", !isNameValid);
        emailInput.classList.toggle("error", !isEmailValid);
        phoneInput.classList.toggle("error", !isPhoneValid);
        
        if (isNameValid && isEmailValid && isPhoneValid) {
            draft.details = {
                name: nameVal,
                email: emailVal,
                phone: phoneVal,
                note: noteInput.value.trim()
            };
            saveDraft(draft);
            goToStep(4);
        }
    });
    
    btnBackStep3.addEventListener("click", () => {
        goToStep(2);
    });
    
    [fullNameInput, emailInput, phoneInput].forEach(el => el.addEventListener("input", () => el.classList.remove("error")));
    
    // --- STEP 4: Review ---
    function renderReview() {
        const service = ATELIER_DATA.services.find(s => s.id === draft.serviceId);
        
        document.getElementById("reviewServiceName").textContent = service.name;
        document.getElementById("reviewServiceDuration").textContent = `${service.duration} minutes`;
        
        document.getElementById("reviewDate").textContent = draft.dateDisplay || draft.date;
        document.getElementById("reviewTime").textContent = draft.time;
        
        document.getElementById("reviewName").textContent = draft.details.name;
        document.getElementById("reviewEmail").textContent = draft.details.email;
        document.getElementById("reviewPhone").textContent = draft.details.phone;
        
        const noteEl = document.getElementById("reviewNote");
        noteEl.textContent = draft.details.note ? `"${draft.details.note}"` : "";
        noteEl.style.display = draft.details.note ? "block" : "none";
        
        document.getElementById("reviewPrice").textContent = `₹${service.price.toLocaleString()}`;
    }
    
    document.getElementById("editService").onclick = (e) => { e.preventDefault(); window.location.href = "index.html"; };
    document.getElementById("editDateTime").onclick = (e) => { e.preventDefault(); goToStep(2); };
    document.getElementById("editDetails").onclick = (e) => { e.preventDefault(); goToStep(3); };
    
    document.getElementById("btnConfirm").addEventListener("click", () => {
        // Generate booking reference
        const ref = `AT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        draft.bookingReference = ref;
        
        // Move to completed state and save
        draft.status = 'confirmed';
        saveDraft(draft);
        
        window.location.href = "confirmation.html";
    });
    
    // --- INITIALIZATION ---
    // Render the summary on the left column
    const service = ATELIER_DATA.services.find(s => s.id === draft.serviceId);
    if (service) {
        document.getElementById("summaryServiceName").textContent = service.name;
        document.getElementById("summaryServicePrice").textContent = `₹${service.price.toLocaleString()}`;
        document.getElementById("summaryServiceDuration").textContent = `${service.duration} min`;
    }
    
    renderDates();
    renderTimeSlots();
    
    // Start at current step (bounded to 2, 3, or 4)
    let initialStep = Math.max(2, Math.min(4, draft.currentStep || 2));
    goToStep(initialStep);
});
