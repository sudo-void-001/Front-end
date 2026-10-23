const STORAGE_KEY = 'atelierBookingDraft';

const DEFAULT_STATE = {
    serviceId: null,
    date: null,
    time: null,
    details: {
        name: "",
        email: "",
        phone: "",
        note: ""
    },
    currentStep: 1
};

function loadDraft() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error("Draft parse failed", e);
        clearDraft();
    }
    return structuredClone(DEFAULT_STATE);
}

function saveDraft(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error("Failed to save draft to localStorage", e);
    }
}

function clearDraft() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error("Failed to clear draft", e);
    }
}
