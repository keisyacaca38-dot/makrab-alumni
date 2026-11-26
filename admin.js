
function ambilNomorWA(tamu) {
    const kunci = Object.keys(tamu).find(key => {
        const namaKolom = key
            .replace(/^\uFEFF/, "")
            .trim()
            .toLowerCase();

        return [
            "no_whatsapp",
            "no_wa",
            "nomor_wa",
            "nomor_whatsapp",
            "whatsapp"
        ].includes(namaKolom);
    });

    return kunci ? String(tamu[kunci]).trim() : "";
}


// MENAMPILKAN DATA TAMU
function tampilkanTamu() {

    tabel.innerHTML = "";

    jumlahTamu.textContent =
        "Total tamu: " + dataTamu.length;

    if (dataTamu.length === 0) {
        tabel.innerHTML =
            '<tr><td colspan="6">Belum ada data tamu.</td></tr>';
        return;
    }

    dataTamu.forEach((tamu, index) => {

        const tr = document.createElement("tr");

        const nomorWA = ambilNomorWA(tamu);
        const values = [
            tamu.id,
            tamu.nama_tamu,
            tamu.instansi,
            tamu.kategori,
            nomorWA
        ];

        values.forEach(value => {

            const td = document.createElement("td");
            td.textContent = value || "-";
            tr.appendChild(td);

        });

        const tdAksi = document.createElement("td");

        const button = document.createElement("button");
        button.textContent = "Kirim Undangan";

        button.onclick = function() {
            kirimUndangan(index);
        };

        tdAksi.appendChild(button);
        tr.appendChild(tdAksi);

        tabel.appendChild(tr);

    });
}

// MEMULIHKAN DATA SAAT ADMIN DIBUKA LAGI
const dataTersimpan = localStorage.getItem("dataTamuMakrab");

if (dataTersimpan) {
    dataTamu = JSON.parse(dataTersimpan);
    tampilkanTamu();
}

// GENERATOR UNDANGAN WHATSAPP
function kirimUndangan(index) {

    const tamu = dataTamu[index];

    const nomor = ambilNomorWA(tamu).replace(/\D/g, "");
    
    if (!nomor) {
        alert("Nomor WhatsApp " + tamu.nama_tamu + " tidak ditemukan!");
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

    const linkWA =
        `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

    window.open(linkWA, "_blank");

}
