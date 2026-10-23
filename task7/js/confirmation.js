document.addEventListener("DOMContentLoaded", () => {
    let draft = loadDraft();
    
    // Redirect if they haven't actually confirmed a booking
    if (draft.status !== 'confirmed') {
        window.location.href = "index.html";
        return;
    }
    
    // Find service
    const service = ATELIER_DATA.services.find(s => s.id === draft.serviceId);
    
    // Populate data
    document.getElementById("bookingReference").textContent = draft.bookingReference;
    document.getElementById("confServiceName").textContent = service ? service.name : "Session";
    document.getElementById("confDate").textContent = draft.dateDisplay || draft.date;
    document.getElementById("confTime").textContent = draft.time;
    document.getElementById("confName").textContent = draft.details.name;
    document.getElementById("confEmail").textContent = draft.details.email;
    
    // Action button
    document.getElementById("btnHome").addEventListener("click", () => {
        clearDraft();
        window.location.href = "index.html";
    });
});
