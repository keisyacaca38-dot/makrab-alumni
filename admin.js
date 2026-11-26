
// ===================================
// MEMBACA FILE CSV
// ===================================

const fileInput = document.getElementById("fileCSV");
const tabel = document.getElementById("tabelTamu");

let dataTamu = [];

fileInput.addEventListener("change", function(e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {

        const isi = event.target.result;

        // Memproses CSV menggunakan PapaParse
        Papa.parse(isi, {

            header: true,
            skipEmptyLines: true,

            complete: function(results) {

                dataTamu = results.data;

                tampilkanTamu();

            }

        });

    };

    reader.readAsText(file);

});


// ===================================
// MENAMPILKAN DATA TAMU
// ===================================

function tampilkanTamu() {

    tabel.innerHTML = "";

    document.getElementById("jumlahTamu").textContent =
        "Total tamu: " + dataTamu.length;

    dataTamu.forEach((tamu, index) => {

        const tr = document.createElement("tr");

        const values = [
            tamu.id,
            tamu.nama_tamu,
            tamu.instansi,
            tamu.kategori,
            tamu.no_whatsapp
        ];

        values.forEach(value => {

            const td = document.createElement("td");

            td.textContent = value || "-";

            tr.appendChild(td);

        });


const tdAksi = document.createElement("td");

const button = document.createElement("button");

button.textContent = "Kirim Undangan";

// Memanggil fungsi berdasarkan index tamu
button.onclick = function () {
    kirimUndangan(index);
};

tdAksi.appendChild(button);
tr.appendChild(tdAksi);

tabel.appendChild(tr);

    });

}


// ===================================
// GENERATOR LINK PERSONAL
// ===================================

function kirimUndangan(index)

function kirimUndangan(index) {
    const tamu = dataTamu[index];

    const nomor = String(tamu.no_wa || "").replace(/\D/g, "");

    if (!nomor) {
        alert("Nomor WhatsApp tidak ditemukan!");
        return;
    }

    const url = new URL(
        "https://keisyacaca38-dot.github.io/makrab-alumni/"
    );

    url.searchParams.set("to", tamu.nama_tamu);
    url.searchParams.set("kategori", tamu.kategori);

    const pesan = `HALO ${tamu.nama_tamu}! 🎉

Dengan hormat,

Kami mengundang Anda untuk menghadiri:

A NIGHT TO REMEMBER
Alumni Gathering & Malam Keakraban 2026

Silakan buka undangan digital berikut:
${url.toString()}

Sampai bertemu di acara makrab! 💗`;

    const linkWA = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

    window.open(linkWA, "_blank");

}
