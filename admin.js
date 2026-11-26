
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

function ambilNomorWA(tamu) {
    const kolom = Object.keys(tamu).find(key => {
        const nama = key
            .replace(/^\uFEFF/, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

        return nama.includes("whatsapp") ||
        nama === "nowa" ||
        nama === "nomorwa";
    });

    return kolom ? String(tamu[kolom]).trim() : "";
}



// MEMULIHKAN DATA SAAT ADMIN DIBUKA LAGI
const dataTersimpan = localStorage.getItem("dataTamuMakrab");

if (dataTersimpan) {
    dataTamu = JSON.parse(dataTersimpan);
function kirimUndangan(index) {

    const tamu = dataTamu[index];

    const nomor = ambilNomorWA(tamu).replace(/\D/g, "");

    console.log("Data tamu:", tamu);
    console.log("Nomor WhatsApp:", nomor);

    if (!nomor) {
        alert("Nomor WhatsApp tidak terbaca. Periksa kolom CSV.");
        return;
    }

    const nomorFinal = nomor.startsWith("0")
        ? "62" + nomor.substring(1)
        : nomor;

    const url = new URL(
        "https://keisyacaca38-dot.github.io/makrab-alumni/"
    );

    url.searchParams.set("to", tamu.nama_tamu);
    url.searchParams.set("kategori", tamu.kategori);

    const pesan = `Halo ${tamu.nama_tamu}! 🎉

Kamu diundang ke acara:

A NIGHT TO REMEMBER
Alumni Gathering & Malam Keakraban 2026

Silakan buka undangan digital kami:
${url.toString()}

Sampai bertemu di acara makrab! 💗`;

    const linkWA =
        "https://wa.me/" + nomorFinal +
        "?text=" + encodeURIComponent(pesan);

    window.open(linkWA, "_blank");
}

    tampilkanTamu();
}

// GENERATOR UNDANGAN WHATSAPP

function kirimUndangan(index) {

    const tamu = dataTamu[index];

    const nomor = ambilNomorWA(tamu).replace(/\D/g, "");

    console.log("Data tamu:", tamu);
    console.log("Nomor WhatsApp:", nomor);

    if (!nomor) {
        alert("Nomor WhatsApp tidak terbaca. Periksa kolom CSV.");
        return;
    }

    const nomorFinal = nomor.startsWith("0")
        ? "62" + nomor.substring(1)
        : nomor;

    const url = new URL(
        "https://keisyacaca38-dot.github.io/makrab-alumni/"
    );

    url.searchParams.set("to", tamu.nama_tamu);
    url.searchParams.set("kategori", tamu.kategori);

    const pesan = `Halo ${tamu.nama_tamu}! 🎉

Kamu diundang ke acara:

A NIGHT TO REMEMBER
Alumni Gathering & Malam Keakraban 2026

Silakan buka undangan digital kami:
${url.toString()}

Sampai bertemu di acara makrab! 💗`;

    const linkWA =
        "https://wa.me/" + nomorFinal +
        "?text=" + encodeURIComponent(pesan);

    window.open(linkWA, "_blank");
}


