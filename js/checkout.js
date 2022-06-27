$(document).ready(function(){


    $(".dugme").click(function(){


        $(".imeprezimegreska").html("");
        $(".emailadresssa").html("");
        $(".brojtelefona").html("");
        $(".adresssa").html("");


        var ime=$(".imeprezime").val();
        var emailadresa=$(".email").val();
        var brtel=$(".tel").val();
        var adress=$(".adresa").val();


        if(ime==""){

            $(".imeprezimegreska").html("Niste uneli ime i prezime !").removeClass("d-none");
            return false;

        }

        if(emailadresa==""){

            $(".emailadresssa").html("Niste uneli email adresu !").removeClass("d-none");
            return false;

        }

        if(brtel==""){

            $(".brojtelefona").html("Niste uneli broj telefona !").removeClass("d-none");
            return false;

        }

        if(adress==""){

            $(".adresssa").html("Niste uneli adresu !").removeClass("d-none");
            return false;

        }


        $.ajax({
            url:"mail.php",
            method:"POST",
            dataType:"JSON",
            data: {
                name: ime,
                adress: adress,
                email: emailadresa,
                phone: brtel
            },
            success: function(odgovor){
                alert(odgovor['message'])
            }
        })



        return false;


    });


})