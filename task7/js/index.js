document.addEventListener("DOMContentLoaded", () => {
    const servicesList = document.getElementById("servicesList");
    const btnContinue = document.getElementById("btnContinue");
    const validationMsg = document.getElementById("selectionValidation");
    
    // Load existing draft
    let draft = loadDraft();
    let selectedServiceId = draft.serviceId;

    // Make sure we are at step 1 when starting from index
    if (!draft.serviceId) {
        draft.currentStep = 1;
        saveDraft(draft);
    }

    // Render services
    function renderServices() {
        servicesList.innerHTML = '';
        
        ATELIER_DATA.services.forEach(service => {
            const card = document.createElement("div");
            card.className = `service-card ${selectedServiceId === service.id ? 'selected' : ''}`;
            card.dataset.id = service.id;
            
            // Add click listener
            card.addEventListener("click", () => selectService(service.id));

            card.innerHTML = `
                <div class="service-header">
                    <h3 class="service-name">${service.name}</h3>
                    <div class="service-price">₹${service.price.toLocaleString()}</div>
                </div>
                <p class="service-desc">${service.description}</p>
                <div class="service-meta">
                    <div class="meta-item">
                        <span>${service.duration} min</span>
                    </div>
                    <div class="meta-item">
                        <span>${service.category}</span>
                    </div>
                </div>
            `;
            
            servicesList.appendChild(card);
        });
        
        updateButtonState();
    }

    function selectService(id) {
        selectedServiceId = id;
        
        // Update draft
        draft.serviceId = id;
        draft.currentStep = 2; // Next step is 2
        saveDraft(draft);
        
        // Visual update
        document.querySelectorAll(".service-card").forEach(card => {
            card.classList.toggle("selected", card.dataset.id === id);
        });
        
        updateButtonState();
        validationMsg.classList.add("hidden");
    }

    function updateButtonState() {
        btnContinue.disabled = !selectedServiceId;
    }

    btnContinue.addEventListener("click", () => {
        if (selectedServiceId) {
            window.location.href = "booking.html";
        } else {
            validationMsg.classList.remove("hidden");
        }
    });

    renderServices();
});
