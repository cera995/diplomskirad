$(document).ready(function () {



    $(document).on("click", ".dodajProizvod", function () {
        var idProizvoda = $(this).attr("data-product-id");

        var korpa = []; 

        if(localStorage.getItem("korpa")) 
        {

            korpa = JSON.parse(localStorage.getItem("korpa")); 
        }

        korpa.push(idProizvoda); 



        localStorage.setItem("korpa",JSON.stringify(korpa)); 

        alert("Uspešno ste dodali proizvod u korpu");

        return false;
    })



    $(".checkout").click(function(){

        if(!localStorage.getItem("korpa"))
        {
            alert("Nemate proizvoda u korpi !");
            return false;
        }

    })


    $("#odabirdana").change(function () {

        var dan = $("#odabirdana").val(); 



        var file = "";
        if (dan == 1) {
            file = "jelovnici/ponedeljak.json";
        }
        else if (dan == 2) {
            file = "jelovnici/utorak.json";
        }
        else if (dan == 3) {
            file = "jelovnici/sreda.json";
        }
        else if (dan == 4) {
            file = "jelovnici/cetvrtak.json";
        }
        else if (dan == 5) {
            file = "jelovnici/petak.json";
        }
        else if (dan == 6) {
            file = "jelovnici/subota.json";
        }
        else if (dan == 7) {
            file = "jelovnici/nedelja.json";
        }


        $.ajax({
            method: "GET",  
            url: file, 
            success: function (podaciIzFajla) 
            {

                $(".jelovnik").html(""); 


                for (stavka in podaciIzFajla) {
                    
                    var menihtml = $(".meni").clone();
                    $(menihtml).find(".dodajProizvod").attr("data-product-id", podaciIzFajla[stavka]["product-id"])
                    $(menihtml).removeClass("meni")

                    $(menihtml).find(".imeproizvoda").html(podaciIzFajla[stavka]["ime"])
                    $(menihtml).find(".glavnojelo").html("Sastojci: "+podaciIzFajla[stavka]["sastojci"].join(", "))

                    $(menihtml).find(".cena").html("Cena: "+podaciIzFajla[stavka]["cena"])
                    $(menihtml).find(".slika").attr("src", podaciIzFajla[stavka]['slika']);
                    $(menihtml).find(".slika").attr("alt", podaciIzFajla[stavka]['ime']);
                    $(".jelovnik").append(menihtml)

                }

                $(".jelovnik")[0].scrollIntoView({behavior:"smooth", block:"center"})
            }
            
        })
       

    })



})