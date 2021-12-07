$('#withdraw').val(0);
$('#withdraw').focus();

$(document).on('keyup', '#withdraw', function (event) {
    let nominal = $(this).val().replace(/\D/g, '');
    let limit = (5 * 1e8);

    $(this).val(nominal).priceFormat({
        prefix: '',
        centsLimit: 0,
        thousandsSeparator: '.'
    });

    if (nominal > limit) {
        $(this).val(limit).priceFormat({
            prefix: '',
            centsLimit: 0,
            thousandsSeparator: '.'
        });
    }

    $('#withdraw_nominal').val(nominal);

});

$('#formWithdraw').submit(function (e) {
    if ($('#btnWithdraw').attr('disabled')) {
        e.preventDefault();
        return false;
    } else {
        e.preventDefault();
        // if (foo($('#withdraw_nominal').val())) {
            $('#btnWithdraw').attr('disabled', true);
            $('#btnWithdraw').html('loading...');

            $.ajax({
                url: location.origin + '/withdraw/request',
                method: 'post',
                data: $(this).serialize(),
                success: function (response) {

                    if (response.status == "success") {

                        buzzer({
                            status: "success",
                            msg: response.message
                        });

                        setTimeout(function () {
                            window.location.reload();
                        }, 1500);

                    } else {
                        $.each(response.errors, function (key, value) {
                            buzzer({
                                status: "error",
                                msg: value
                            });
                        });

                        $('#btnWithdraw').html('Kirim');
                        $('#btnWithdraw').attr('disabled', false);
                    }
                },
                error: function (e) {
                    buzzer({
                        status: "error",
                        msg: "Something when wrong, please report to customer service."
                    });

                    $('#btnWithdraw').html('Kirim');
                    $('#btnWithdraw').attr('disabled', false);

                }
            });

        // } else {
        //
        //     buzzer({
        //         status: "error",
        //         msg: 'withdraw harus kelipatan : 1.000'
        //     });
        //
        //     $('#btnWithdraw').html('Kirim');
        //     $('#btnWithdraw').attr('disabled', false);
        //
        // }
    }
});

function foo(nominal) {
    if (nominal % 1000 == 0) {
        return true
    } else {
        return false
    }
}

// delay on keyup stop
function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}
