$(function(){

    const metaUrl = $('meta.metaUrl'),
    sharePage = $('span.sharePage'),
    sharePageSVG = $('svg.sharePage'),
    modalShare = $('div#modal-share'),
    profilePict = $('div#profilePict'),
    versionsCarousel = $('div.versionsCarousel'),
    shareButtonFB = $('a.shareButtonFB'),
    metaTitle = $('meta.metaTitle'),
    metaDescrip = $('meta.metaDescrip'),
    metaImg = $('meta.metaImg');

    var hrefUrl = '';
    var linkTitle = '';
    var linkDescrip = 'En Vrumm podrás encontrar los mejores autos del mercado en México';
    var linkImg = '';
    var image = '';

    var sharePageDo = false;
    var shareLinkDo = false;

    sharePageSVG.click(openShare);

    sharePage.click(openShare);

    function openShare(){
        modalShare.modal();

        var cssImg = (profilePict.length) ? profilePict.css('background-image') : versionsCarousel.css('background-image');

        console.log(profilePict, cssImg);

        var idxFQuote = cssImg.indexOf('"') + 1;
        var idxLQuote = cssImg.lastIndexOf('"');

        //defining the actual image visible in carousel

        image = cssImg.substring(idxFQuote, idxLQuote);

        sharePageDo = true;

    }

    $(document).on('click', 'svg.shareLink', function(){
        alert('click')
        var el = $(this);
        var container = el.closest('div.garageImgCont');
        hrefUrl = container.find('a').attr('href');
        linkTitle = `Checa el ${container.find('span.garageModelName').text()} en Vrumm`;
        linkImg = container.find('img.garageImg').attr('src');
        shareLinkDo = true;
    });

    shareButtonFB.click(function(){

        if(sharePageDo){
            
            fbShare(window.location.href, metaTitle.attr('content'), metaDescrip.attr('content'), image, 550, 500);
            sharePageDo = false;
        
        }else if(shareLinkDo){
            
            fbShare(hrefUrl, linkTitle, linkDescrip, linkImg, 550, 500);
            shareLinkDo = false;
        }
    });

    metaUrl.attr('content', window.location.href);

    function fbShare(url, title, descr, image, winWidth, winHeight) {
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    }


    function copyToClipboard(textToCopy) {
        var $temp = $("<input>");
        $("#col-share").append($temp);
        $temp.val(textToCopy).select();
        document.execCommand("copy");
        $temp.remove();
        alert('Copied to clipboard')
    }


    $('#tokenfield').on('tokenfield:createtoken', function (e) {
        var data = e.attrs.value.split('|')
        e.attrs.value = data[1] || data[0]
        e.attrs.label = data[1] ? data[0] + ' (' + data[1] + ')' : data[0]
    }).on('tokenfield:createdtoken', function (e) {
        // Über-simplistic e-mail validation
        var re = /\S+@\S+\.\S+/
        var valid = re.test(e.attrs.value)
        if (!valid) {
            $(e.relatedTarget).remove()
        }
    }).on('tokenfield:edittoken', function (e) {
        if (e.attrs.label !== e.attrs.value) {
            var label = e.attrs.label.split(' (')
            e.attrs.value = label[0] + '|' + e.attrs.value
        }
    }).tokenfield()

    $('#invitation-form').submit(function() {
        if ( $('#tokenfield').tokenfield('getTokens').length > 0 ) {
            $('#btn-send-invitation').button('loading');
            $.ajax({
                type    : "POST",
                cache   : false,
                url     : $(this).attr('action'),
                data    : $(this).serializeArray(),
                success : function(data){
                    alert(data);
                },
                error   : function(){
                    alert('Ha ocurrido un error, intentelo más tarde');
                },
                complete: function(){
                    $('#btn-send-invitation').button('reset');
                    $('#invitation-form')[0].reset();
                }
            });
        }else {
            alert('Agregue una dirección de correo valida');
        }
        return false;
    });      


})