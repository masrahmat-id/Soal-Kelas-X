// Array berisi 5 soal pilihan ganda
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

const quizContainer = document.getElementById('quiz-container');
const form = document.getElementById('quiz-form');
const finalScoreInput = document.getElementById('final-score-input');
const resultMessage = document.getElementById('result-message');
const submitButton = document.getElementById('submit-button');

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
        // Ambil nilai yang dipilih oleh pengguna untuk pertanyaan ini
        const selector = `input[name="question${index}"]:checked`;
        const selectedOption = document.querySelector(selector);
        
        // Periksa apakah jawaban benar
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    return score;
}

// Event listener saat formulir dikirim
form.addEventListener('submit', function(event) {
    // 1. Hitung skor
    const totalScore = calculateScore();
    const maxScore = quizQuestions.length;
    
    // 2. Tampilkan pesan skor kepada pengguna (opsional)
    const scoreMessage = `Anda menjawab ${totalScore} dari ${maxScore} soal dengan benar.`;
    resultMessage.textContent = scoreMessage;
    resultMessage.classList.remove('hidden');

    // 3. Masukkan skor ke dalam hidden field agar dikirim ke email Formspree
    finalScoreInput.value = `${totalScore}/${maxScore} (${scoreMessage})`;

    // Form submission akan dilakukan oleh Formspree setelah ini.
    // Jika Anda ingin mencegah pengiriman ke Formspree dan hanya menampilkan skor, 
    // Anda bisa menambahkan event.preventDefault(); di sini, TAPI JANGAN LAKUKAN JIKA MAU DIKIRIM KE EMAIL.

    // Formspree akan mengarahkan pengguna ke halaman "Terima kasih" setelah pengiriman berhasil.
});

// Jalankan fungsi untuk merender soal saat halaman dimuat
renderQuestions();
