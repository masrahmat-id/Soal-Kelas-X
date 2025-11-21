// Data Soal (tetap sama seperti sebelumnya)
const quizQuestions = [
    {
        question: "Siapakah Presiden pertama Republik Indonesia?",
        options: ["Soeharto", "Soekarno", "B.J. Habibie", "Joko Widodo"],
        answer: "Soekarno"
    },
    {
        question: "Matahari terbit dari arah mana?",
        options: ["Barat", "Utara", "Timur", "Selatan"],
        answer: "Timur"
    },
    {
        question: "Apa singkatan dari HTML?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Berapakah hasil dari 7 x 8?",
        options: ["54", "56", "64", "49"],
        answer: "56"
    },
    {
        question: "Apa ibu kota negara Jepang?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        answer: "Tokyo"
    }
];

// --- DOM Elements ---
const quizContainer = document.getElementById('quiz-container');
const quizForm = document.getElementById('quiz-form');
const resultMessage = document.getElementById('result-message');
const infoDisplay = document.getElementById('info-display');


// --- Hidden Inputs untuk Formspree ---
const hiddenNameInput = document.getElementById('hidden-name-input');
const hiddenClassInput = document.getElementById('hidden-class-input');
const hiddenSubjectInput = document.getElementById('hidden-subject-input');
const hiddenDateInput = document.getElementById('hidden-date-input');
const finalScoreInput = document.getElementById('final-score-input');


// =================================================================
// FUNGSI INISIALISASI HALAMAN SOAL
// =================================================================

function initializeQuizPage() {
    // 1. AMBIL data dari localStorage dan masukkan ke hidden fields
    const fullName = localStorage.getItem('kuis_nama') || 'N/A';
    const className = localStorage.getItem('kuis_kelas') || 'N/A';
    const subject = localStorage.getItem('kuis_mapel') || 'N/A';
    const dateInfo = localStorage.getItem('kuis_tanggal') || 'N/A';
    
    // Tampilkan data diri di halaman soal (opsional)
    infoDisplay.innerHTML = `
        Nama: <b>${fullName}</b> | Kelas: <b>${className}</b> | Mapel: <b>${subject}</b> | Tanggal: <b>${dateInfo}</b>
    `;

    // Masukkan ke hidden fields agar terkirim ke Formspree
    hiddenNameInput.value = fullName;
    hiddenClassInput.value = className;
    hiddenSubjectInput.value = subject;
    hiddenDateInput.value = dateInfo;

    // 2. Render Soal
    renderQuestions();
}

// ... (Fungsi renderQuestions dan calculateScore tetap sama)

// Fungsi untuk menampilkan soal
function renderQuestions() {
    quizQuestions.forEach((q, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');
        
        let content = `<p>Soal ${index + 1}: ${q.question}</p>`;
        content += `<div class="option-group">`;
        
        q.options.forEach((option, optionIndex) => {
            const radioId = `q${index}-o${optionIndex}`;
            content += `
                <label for="${radioId}">
                    <input type="radio" id="${radioId}" name="question${index}" value="${option}" required>
                    ${option}
                </label>
            `;
        });
        
        content += `</div>`;
        questionBlock.innerHTML = content;
        quizContainer.appendChild(questionBlock);
    });
}

// Fungsi untuk menghitung skor
function calculateScore() {
    let score = 0;
    quizQuestions.forEach((q, index) => {
        const selector = `input[name="question${index}"]:checked`;
        const selectedOption = document.querySelector(selector);
        
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    return score;
}

// Event listener saat formulir KUIS dikirim
quizForm.addEventListener('submit', function(event) {
    const totalScore = calculateScore();
    const maxScore = quizQuestions.length;
    
    const scoreMessage = `Anda menjawab ${totalScore} dari ${maxScore} soal dengan benar.`;
    resultMessage.textContent = scoreMessage;
    resultMessage.classList.remove('hidden');

    finalScoreInput.value = `${totalScore}/${maxScore} (${scoreMessage})`;
    
    // Opsional: Hapus data diri dari localStorage setelah pengiriman
    localStorage.removeItem('kuis_nama');
    localStorage.removeItem('kuis_kelas');
    localStorage.removeItem('kuis_mapel');
    localStorage.removeItem('kuis_tanggal');
});

// Mulai inisialisasi ketika script dimuat
initializeQuizPage();
