// Check Status ransaction
window.checkStatusTransaction = (statusCode) => {
    var status = '';
    if (statusCode === 3) {
        status = 'Approved';
    } else if (statusCode === 2) {
        status = 'Rejected';
    } else if (statusCode === 1) {
        status = 'Cancelled';
    } else {
        status = 'Pending';
    }

    return status;
}

//    CONVERT NOMINAL
window.convertNominal = function (code, nominal) {
    var symbol = '';
    var separator = '';
    var precision = 0;
    var decimal = ',';

    switch (code) {
        case 'CNY':
            symbol = '¥';
            separator = '.';
            precision = 2;
            break;

        case 'VND':
            symbol = '₫';
            separator = ',';
            precision = 0;
            break;

        case 'MYR':
            symbol = 'MYR';
            separator = '.';
            precision = 2;
            break;

        case 'THB':
            symbol = '฿';
            separator = '.';
            precision = 2;
            break;

        case 'IDR':
            symbol = 'IDR ';
            separator = '.';
            precision = 2;
            break;
    }

    var format = function format(value) {
        return currency(value, {
            precision: precision,
            symbol: symbol,
            separator: separator,
            decimal: decimal
        });
    };

    var convert = 0;

    if (nominal) {
        convert = parseFloat(nominal);
    }

    convert = format(convert).format(true);
    return convert;
};
//    END CONVERT NOMINAL

//    CONTENT OPEN
$(document).on('click', '.contentOpen', function () {
    if ($(this).attr('open-href')) {
        var openUrl = $(this).attr('open-href');
        var openType = $(this).attr('open-type');

        if (openType === 'new-tab') {
            window.open(openUrl, '_blank');
        } else if (openType === 'pop-up') {
            openPopupTab(openUrl, '', 1180, 675, openType);
        } else if (openType === 'pop-up-parent') {
            openNewParentTab(openUrl, 'parent tab', 1024, 690, 0, 0, 'yes');
        } else if (openType === 'trigger-function') {
            Function(openUrl)();
        } else {
            window.location.href = openUrl;
        }
    }
});

function openPopupTab(url, params, width, height, name, target = '') {
    var screenLeft = 0,
        screenTop = 0;
    if (!name) name = '';
    if (!width) width = 1060;
    if (!height) height = 665;
    var defaultParams = {};

    if (typeof window.screenLeft !== 'undefined') {
        screenLeft = window.screenLeft;
        screenTop = window.screenTop;
    } else if (typeof window.screenX !== 'undefined') {
        screenLeft = window.screenX;
        screenTop = window.screenY;
    }

    var features_dict = {
        toolbar: 'no',
        location: 'no',
        directories: 'no',
        left: screenLeft + ($(window).width() - width) / 2,
        top: screenTop + ($(window).height() - height) / 2,
        status: 'yes',
        menubar: 'no',
        scrollbars: 'yes',
        resizable: 'no',
        width: width,
        height: height
    };
    features_arr = [];

    for (var k in features_dict) {
        features_arr.push(k + '=' + features_dict[k]);
    }

    features_str = features_arr.join(',');
    var win = window.open(url, name, features_str);

    if (target == '_parent') {
        win = window.open(url, target, name, features_str);
    }
    win.focus();
    return false;
}

function openNewParentTab(url, name, width, height, left, top, scrollbars) {
    window.open(url, name, 'left=' + left + ', top=' + top + ', width=' + width + ', height=' + height + ', scrollbars=' + scrollbars + ', location=no, menubar=no, titlebar=no, hotkeys=no, toolbars=no, status =no, resizable=yes');
}

// GLOBAL ALERT
// must be include izi-toast plugin
window.buzzer = (arg) => {
    iziToast[arg.status]({
        timeout: arg.timeout ?? 3000,
        overlay: arg.overlay ?? true,
        close: arg.close ?? true,
        position: 'topCenter',
        title: '',
        message: arg.msg,
        onClosed: arg.onClosed ?? '',
        buttons: arg.button ?? '',
    });
}
