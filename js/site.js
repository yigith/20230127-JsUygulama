let notlar = [
    {
        baslik: "Alışveriş Listesi",
        icerik: "1. Havuç\n2. Ispanak"
    },
    {
        baslik: "İş Notlarım",
        icerik: "1. Makale oku\n2. Çalış"
    },
    {
        baslik: "Güzel Sözler",
        icerik: "1. Vakit nakittir.\n2. Kendin ol."
    }
];
let seciliNot = null;

function listele() {
    localStorage["veri"] = JSON.stringify(notlar);
    $(".notlar").html("");

    for (const i in notlar) {
        const not = notlar[i];
        let a = $("<a/>")
            .attr("href", "#")
            .attr("data-bs-dismiss", "offcanvas")
            .addClass("list-group-item")
            .addClass("list-group-item-action")
            .text(not.baslik);
        a.click(e => ac(not));
        a[0].not = not;
        $(".notlar").append(a);
    }
}

function ac(not) {
    seciliNot = not;
    $(".notlar>a").each((indeks, a) => {
        if (a.not == seciliNot)
            $(a).addClass("active");
        else
            $(a).removeClass("active");
    });
    $("#txtBaslik").val(seciliNot.baslik);
    $("#txtIcerik").val(seciliNot.icerik);
}

function kaydet(event) {
    event.preventDefault();

    if (seciliNot) {
        seciliNot.baslik = $("#txtBaslik").val();
        seciliNot.icerik = $("#txtIcerik").val();
        listele();
        ac(seciliNot);
        mesaj("Başarıyla kaydedildi.");
    }
    else {
        let yeniNot = {
            baslik: $("#txtBaslik").val(),
            icerik: $("#txtIcerik").val()
        };
        notlar.push(yeniNot);
        listele();
        ac(yeniNot);
        mesaj("Not başarıyla oluşturuldu.");
    }
}

function sil() {
    $("#txtBaslik").val("");
    $("#txtIcerik").val("");

    if (seciliNot) {
        let i = notlar.indexOf(seciliNot);
        notlar.splice(i, 1);
        seciliNot = null;
        listele();
        mesaj("Başarıyla silindi.");
    }
}

function yeni() {
    seciliNot = null;
    $(".notlar>a").removeClass("active");
    $("#txtBaslik").val("").focus();
    $("#txtIcerik").val("");
}

function yukle() {
    try {
        notlar = JSON.parse(localStorage["veri"]);
    }
    catch (e) { }
}

function mesaj(icerik) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon: 'success',
        title: icerik
    });
}

$("#btnYeni").click(yeni);
$("#btnSil").click(sil);
$("#frmNot").submit(kaydet);

yukle();
listele();