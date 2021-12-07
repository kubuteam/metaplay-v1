var smartBanner = {
    appIcon: '',
    bannerContainer: '.app-container',
    daysToHide: 7,
    downloadIOS: '',
    downloadAndroid: '',
    slogan: '',
    title: '',

    init: function (options) {
        if (smartBanner.isSupportDevice() && $.cookie('hideSmartBanner') !== 'true') {
            $.extend(smartBanner, options);
            smartBanner.createBanner();
        }
    },

    createBanner: function () {
        var html = '<div id="smart_banner" style="display: none;">';
        html += '<div class="app_icon"><img src="' + smartBanner.appIcon + '" alt="App Icon"></div>';
        html += '<div class="app_info"><div class="app_title">' + smartBanner.title + '</div><div class="app_slogan">' + smartBanner.slogan + '</div></div>';
        html += '<div class="download_button"><form action="' + (smartBanner.isAndroid() ? smartBanner.downloadAndroid : smartBanner.downloadIOS) + '"><button type="submit" title="Download" class="btn btn-green" onclick="smartBanner.destroyBanner()">Download</button></form></div>';
        html += '<span class="close_button" onclick="smartBanner.destroyBanner()">&times;</span>'
        html += '</div>';

        $(smartBanner.bannerContainer).prepend(html);
        smartBanner.createStyles();
    },

    createCookie: function () {
        $.cookie('hideSmartBanner', 'true', smartBanner.daysToHide);
    },

    createStyles: function () {
        $('#smart_banner').css({
            position: 'fixed',
            width: '100%',
            padding: '10px',
            'font-family': 'Verdana, arial, sans-serif',
            color: '#000',
            background: '#fff',
			height: 'inherit'
        });
        $('#smart_banner img').css({
            display: 'block',
            'max-width': '100%'
        });
        $('#smart_banner .app_icon').css({
            width: '64px',
            margin: '0 0 0 20px'
        });
        $('#smart_banner .app_info').css({
            position: 'absolute',
            left: '104px',
            top: '30px',
        });
        $('#smart_banner .app_title').css({
            'font-size': '12px'
        });
        $('#smart_banner .app_slogan').css({
            'font-size': '10px',
            color: '#666'
        });
        $('#smart_banner .download_button').css({
			position : 'absolute',
            right: '10px',
            'margin-top': '-46px'
        });
        $('#smart_banner .download_button a').css({
            padding: '10px 5px'
        });
        $('#smart_banner .close_button').css({
            position: 'absolute',
            display: 'block',
            top: '8px',
            left: '0px',
            width: '30px',
            height: '64px',
            color: '#666',
            'text-align': 'center',
            'font-size': '18px',
            'line-height': '64px'
        });

        $('#smart_banner').slideDown('slow', function () {
            $('#body_wrapper').addClass('cheat_padding');
        });
    },

    destroyBanner: function () {
        $('.app-container').slideUp('slow', function () {
            $(this).remove();
            $('#body_wrapper').removeClass('cheat_padding');
        });

        smartBanner.createCookie();

        return false;
    },

    showBanner: function () {
        $('#smart_banner').slideDown('slow');
    },

    hideBanner: function () {
        $('#smart_banner').slideUp('slow');
    },

    isSupportDevice: function () {
        // android and ios
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },

    isAndroid: function () {
        // android and ios
        return /Android/i.test(navigator.userAgent);
    },

    isIOS: function () {
        // android and ios
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
}
