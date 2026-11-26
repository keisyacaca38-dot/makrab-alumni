
// ===================================
// DATA TAMU
// ===================================

const fileInput = document.getElementById("fileCSV");
const tabel = document.getElementById("tabelTamu");
const jumlahTamu = document.getElementById("jumlahTamu");

let dataTamu = [];


// ===================================
// MEMBACA NAMA KOLOM CSV
// ===================================

function ambilKolom(tamu, namaKolom) {
    const kunci = Object.keys(tamu).find(key => {
        const nama = key
            .replace(/^\uFEFF/, "")
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

        return nama === namaKolom;
    });

    return kunci ? String(tamu[kunci] || "").trim() : "";
}


// ===================================
// MENGAMBIL NOMOR WHATSAPP
// ===================================

function ambilNomorWA(tamu) {
    return (
        ambilKolom(tamu, "nowa") ||
        ambilKolom(tamu, "nowhatsapp") ||
        ambilKolom(tamu, "nomorwa") ||
        ambilKolom(tamu, "nomorwhatsapp") ||
        ambilKolom(tamu, "whatsapp")
    );
}


// ===================================
// UPLOAD DAN MEMBACA FILE CSV
// ===================================

fileInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
        alert("Silakan pilih file CSV!");
        return;
    }

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.replace(/^\uFEFF/, "").trim(),

        complete: function(results) {

            const data = results.data;

            if (!data || data.length === 0) {
                alert("Data CSV kosong atau tidak terbaca!");
                return;
            }

            dataTamu = data;

            // Simpan data agar tidak hilang saat halaman dibuka lagi
            localStorage.setItem(
                "dataTamuMakrab",
                JSON.stringify(dataTamu)
            );

            tampilkanTamu();

            alert("Data tamu berhasil diupload!");
        },

        error: function(error) {
            alert("Gagal membaca CSV: " + error.message);
        }
    });

});


// ===================================
// MENAMPILKAN DATA TAMU
// ===================================

function tampilkanTamu() {

    tabel.innerHTML = "";

    jumlahTamu.textContent = "Total tamu: " + dataTamu.length;

    if (dataTamu.length === 0) {
        tabel.innerHTML = `
            <tr>
                <td colspan="6">Belum ada data tamu.</td>
            </tr>
        `;
        return;
    }

    dataTamu.forEach((tamu, index) => {

        const id = ambilKolom(tamu, "id");
        const nama = ambilKolom(tamu, "namatamu");
        const instansi = ambilKolom(tamu, "instansi");
        const kategori = ambilKolom(tamu, "kategori");
        const nomor = ambilNomorWA(tamu);

        const tr = document.createElement("tr");

        const data = [
            id,
            nama,
            instansi,
            kategori,
            nomor
        ];

        data.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value || "-";
            tr.appendChild(td);
        });

        // Tombol kirim WhatsApp
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


// ===================================
// MEMULIHKAN DATA SAAT ADMIN DIBUKA
// ===================================

const dataTersimpan = localStorage.getItem("dataTamuMakrab");

if (dataTersimpan) {
    try {
        dataTamu = JSON.parse(dataTersimpan);
        tampilkanTamu();
    } catch (error) {
        console.error("Data tersimpan tidak bisa dibaca:", error);
        localStorage.removeItem("dataTamuMakrab");
    }
}


// ===================================
// GENERATOR UNDANGAN WHATSAPP
// ===================================

function kirimUndangan(index) {

    const tamu = dataTamu[index];

    if (!tamu) {
        alert("Data tamu tidak ditemukan!");
        return;
    }

    const nama = ambilKolom(tamu, "namatamu");
    const nomor = ambilNomorWA(tamu).replace(/\D/g, "");

    if (!nomor) {
        alert("Nomor WhatsApp tidak terbaca. Periksa kolom CSV!");
        return;
    }

    if (!nama) {
        alert("Nama tamu tidak ditemukan!");
        return;
    }

    // Mengubah nomor 08 menjadi 628
    let nomorFinal = nomor;

    if (nomorFinal.startsWith("0")) {
        nomorFinal = "62" + nomorFinal.substring(1);
    } else if (nomorFinal.startsWith("8")) {
        nomorFinal = "62" + nomorFinal;
    }

    // Link website undangan GitHub Pages
    const url = new URL(
        "https://keisyacaca38-dot.github.io/makrab-alumni/"
    );

    url.searchParams.set("to", nama);
    url.searchParams.set(
        "kategori",
        ambilKolom(tamu, "kategori")
    );

    // Pesan undangan
    const pesan = `Halo ${nama}! 🎉

Dengan hormat,

Kami mengundang Anda untuk menghadiri:

A NIGHT TO REMEMBER
Alumni Gathering & Malam Keakraban 2026

Silakan buka undangan digital kami:

${url.toString()}

Sampai bertemu di acara makrab! 💗`;

    // Membuka WhatsApp
    const linkWA =
        "https://wa.me/" +
        nomorFinal +
        "?text=" +
        encodeURIComponent(pesan);

    window.open(linkWA, "_blank");
}
