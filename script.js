
// ===================================
// 1. PERSONALISASI UNDANGAN
// ===================================

const params = new URLSearchParams(window.location.search);

const nama = params.get("to") || "Tamu Undangan";
const kategori = params.get("kategori") || "Alumni";

document.getElementById("coverNama").textContent = nama;
document.getElementById("namaTamu").textContent = nama;

document.getElementById("rsvpNama").value = nama;


// ===================================
// 2. ANIMASI BUKA UNDANGAN
// ===================================

const cover = document.getElementById("cover");
const openBtn = document.getElementById("openBtn");
const audio = document.getElementById("backsound");
const musicBtn = document.getElementById("musicBtn");

openBtn.addEventListener("click", function() {

    cover.classList.add("hide");

    audio.play().then(() => {
        musicBtn.classList.add("playing");
    }).catch(() => {
        console.log("Musik belum dapat diputar.");
    });

    musicBtn.setAttribute("aria-label", "Jeda musik");

});


// ===================================
// 3. TOMBOL MUSIK
// ===================================

musicBtn.addEventListener("click", function() {

    if (audio.paused) {

        audio.play();
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("aria-label", "Jeda musik");

    } else {

        audio.pause();
        musicBtn.classList.remove("playing");
        musicBtn.setAttribute("aria-label", "Putar musik");

    }

});


// ===================================
// 4. COUNTDOWN ACARA
// ===================================

// Ganti tanggal sesuai tanggal acara.
// Format: tahun, bulan-1, tanggal, jam.

const tanggalAcara = new Date(2026, 11, 20, 18, 0, 0).getTime();

function updateCountdown() {

    const sekarang = new Date().getTime();
    const selisih = tanggalAcara - sekarang;

    if (selisih <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
    const menit = Math.floor((selisih / (1000 * 60)) % 60);
    const detik = Math.floor((selisih / 1000) % 60);

    document.getElementById("days").textContent =
        String(hari).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(jam).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(menit).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(detik).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===================================
// 5. ANIMASI SAAT SCROLL
// ===================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(section => {
    observer.observe(section);
});


// ===================================
// 6. FORM RSVP WHATSAPP
// ===================================

document.getElementById("rsvpForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const namaRsvp = document.getElementById("rsvpNama").value;
    const kehadiran = document.getElementById("kehadiran").value;
    const pesan = document.getElementById("pesan").value;

    // Ganti dengan nomor WhatsApp panitia
    const nomorPanitia = "68982680904";

    const teks = `
HALO PANITIA MAKRAB ALUMNI!

Nama: ${namaRsvp}
Instansi/Kategori: ${kategori}
Konfirmasi: ${kehadiran}

Pesan:
${pesan}

Terima kasih!
`;

    const link = "https://wa.me/" + nomorPanitia +
        "?text=" + encodeURIComponent(teks);

    window.open(link, "_blank");

});
