$(document).ready(function () {
    var bank = $(document).find("#bank_name");
    checkMask(bank);
});

var bankLength = 0;
var bankMinLength = 0;

// FORM VALIDATION
document.addEventListener('DOMContentLoaded', function (e) {
    const form = document.getElementById('registerForm');
    const checkSelectBank = function () {
        return {
            validate: function (input) {
                let csbBankName = form.querySelector('[name="bank_name"]').value.length;

                if (csbBankName > 0) {
                    return {
                        valid: true,
                    };
                }

                return {
                    valid: false,
                };
            },
        };
    };

    FormValidation.validators.checkSelectBank = checkSelectBank;
    const fv = FormValidation.formValidation(
        form,
        {
            fields: {
                username: {
                    verbose: false,
                    validators: {
                        notEmpty: {
                            message: lang('required', 'username')
                        },
                        stringLength: {
                            min: 4,
                            max: 11,
                            message: lang('stringLength', 'username', 4, 11)
                        },
                        remote: {
                            message: lang('registered', 'username'),
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            method: 'POST',
                            url: location.origin + '/register/check_user',
                            delay: 1000,
                            data: function () {
                                return {
                                    'username': $('#check').val()
                                };
                            },
                        },
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: lang('required', 'password')
                        },
                        remote: {
                            url: location.origin + '/register/check_password',
                            delay: 1000,
                            data: function () {
                                return {
                                    'username': $("#username").val()
                                };
                            },
                            message: ' '
                        },
                    }
                },
                password_confirmation: {
                    validators: {
                        notEmpty: {
                            message: lang('required', 'password_confirmation')
                        },
                        identical: {
                            compare: function () {
                                return form.querySelector('[name="password"]').value;
                            },
                            message: lang('same', 'password_confirmation', "", "", "password")
                        }
                    }
                },
                email: {
                    icon: true,
                    validators: {
                        notEmpty: {
                            message: lang('required', 'email')
                        },
                        emailAddress: {
                            message: lang('email', 'email')
                        }
                    }
                },
                phone_number: {
                    validators: {
                        digits: {
                            message: lang('numeric', 'phone_number')
                        },
                        notEmpty: {
                            message: lang('required', 'phone_number')
                        },
                        stringLength: {
                            min: 8,
                            max: 13,
                            message: lang('numericLength', 'phone_number', 8, 13)
                        }
                    }
                },
                bank_name: {
                    validators: {
                        notEmpty: {
                            message: lang('required', 'bank_name')
                        }
                    }
                },
                account_name: {
                    validators: {
                        checkSelectBank: {
                            message: "Pilih Bank terlebih dahulu"
                        },
                        notEmpty: {
                            message: lang('required', 'account_name')
                        },
                        stringLength: {
                            min: 3,
                            message: lang('minString', 'account_name', 3)
                        }
                    }
                },
                account_number: {
                    validators: {
                        checkSelectBank: {
                            message: "Pilih Bank terlebih dahulu"
                        },
                        notEmpty: {
                            message: lang('required', 'account_number')
                        },
                        stringLength: {
                            min: '',
                            message: '',
                        },
                        remote: {
                            message: lang('registered', 'account_number'),
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            method: 'POST',
                            url: location.origin + '/register/check_bank_account',
                            delay: 1000,
                            data: function () {
                                return {
                                    'account_number': $("#account_number").val(),
                                    'bank_name': $("#bank_name").val()
                                };
                            },
                        },
                    }
                },
                validation_code: {
                    validators: {
                        notEmpty: {
                            message: lang('required', 'validation_code')
                        },
                        stringLength: {
                            min: 4,
                            message: lang('minString', 'validation_code', 4)
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger({
                    delay: {
                        username: 1,
                        password: 1,
                        account_number: 1,
                    },
                }),
                bootstrap: new FormValidation.plugins.Bootstrap({
                    // Do not show the error message in default area
                    defaultMessageContainer: false,
                }),
                submitButton: new FormValidation.plugins.SubmitButton(),
                defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                message: new FormValidation.plugins.Message({
                    clazz: "fv-help-block",
                    container: function (field, ele) {
                        if (field === "validation_code" || field === "phone_number" || field === "password" || field === "password_confirmation") {
                            return FormValidation.utils.closest(ele, '.form-group').nextElementSibling;
                        }
                        return FormValidation.utils.closest(ele, '.form-group');
                    },
                }),
            },
        }
    );

    fv.on('core.element.validating', function (event) {
        var message;
        var lengthbank = bankLength;
        var LengthbankMin = bankMinLength;
        if (LengthbankMin > 1) {
            message = 'minimal Input '+bankMinLength+' number';
        }else {
            message = 'minimal Input '+bankLength+' number';
        }
        var bankName = $('#account_name').val().slice(0, 3);
        // Update message
        if (event.element.getAttribute('id') == 'account_number') {
            if (event.element.value.match(/[0-9]/)) {
                if (event.element.value.replace(/-/g, '').length <= bankLength) {
                    var el = event.element.value.replace(/-/g, '').length;
                    var dash = event.element.value.match(/-/g);

                    if (dash) {
                        dash = dash.length;
                        lengthbank = lengthbank + dash;
                        bankMinLengths = bankMinLength + dash;

                        fv.updateValidatorOption('account_number', 'stringLength', 'message', message);

                        if (LengthbankMin > 1) {
                          event.element.setAttribute('minlength', bankMinLengths);
                          event.element.setAttribute('maxlength', lengthbank);
                          fv.updateValidatorOption("account_number", "stringLength", "min", bankMinLengths);
                          fv.updateValidatorOption("account_number", "stringLength", "max", lengthbank);
                        }else {
                          event.element.setAttribute('minlength', lengthbank);
                          fv.updateValidatorOption("account_number", "stringLength", "min", lengthbank);
                        }
                    } else {
                        fv.updateValidatorOption('account_number', 'stringLength', 'message', message);
                        if (LengthbankMin > 1) {
                          event.element.setAttribute('minlength', bankMinLength);
                          event.element.setAttribute('maxlength', bankLength);
                          fv.updateValidatorOption("account_number", "stringLength", "min", bankMinLength);
                          fv.updateValidatorOption("account_number", "stringLength", "max", bankLength);
                        }else {
                          event.element.setAttribute('minlength', bankLength);
                          fv.updateValidatorOption("account_number", "stringLength", "min", bankLength);
                        }
                    }

                }
            } else {
                event.element.value = '';
            }
        }
    });

    fv.on('core.form.valid', function () {
        btnLoadReg(true);
        window.register($('#registerForm').serialize())
    });
});
// END FORM VALIDATION

// AJAX REGISTER
window.register = function (serialize) {
    $.ajax({
        url: location.origin + '/register/submit',
        method: 'post',
        data: serialize,
        success: function success(response) {
            if (response.status === "success") {
                buzzer({
                    status: "success",
                    msg: response.message
                });

                setTimeout(function () {
                    window.location.reload();
                }, 2000);

            } else {
                $.each(response.errors, function (index, value) {
                    buzzer({
                        status: "error",
                        msg: value
                    });
                });
                var rand = Math.random();
                $('#captcha_register').attr('src', '/captcha/grey?' + rand);
                $('.validation_code').val('');
                btnLoadReg(false);
            }
        },
        error: function error(e) {
            btnLoadReg(false);
            buzzer({
                status: "error",
                msg: 'Something when wrong, please try again.'
            });
        }
    });
};

function btnLoadReg($con) {
    if ($con) {
        $(document).find('.registerButton').attr('disabled', true);
        $(document).find('.registerButton span').removeAttr('hidden');
    } else {
        $(document).find('.registerButton').attr('disabled', false);
        $(document).find('.registerButton span').attr('hidden', true);
    }
}

// END AJAX REGISTER

$(document).on("change", "#bank_name", function () {
    checkMask($(this))
})

$(document).on("click", "#reCaptcha", function () {
    $(document).find('#captcha_register').attr('src', '/captcha/grey?' + Math.random());
});

$(document).on('keyup', '#telephoneCheck', function () {
    let value = $(this).val();

    if(value.charAt(0) == 0){
      $(this).val(value.replace('0',''));
    }

    if (value.length > 0 && value.length < 2) {
        if (value == '0') {
            $(this).val('');
        }
    }

    let validate = /^[0-9]+$/.test(value);
    if (validate == false) {
        value = value.split('');
        value.pop();
        value = value.join('');
        $(this).val(value);
    }
});

// input account_number remove "-" charakter
$(document).on('keyup', '#account_number', function () {
  let value = $(this).val();
  if (value.substr(value.length - 1) == '-') {
      $(this).val(value.substr( 0 , value.length - 1))
  }
});

function checkMask(element) {
    var bankName = element.val().toUpperCase();

    $("#account_number").val('');
    $("#account_name").val('');
    if (bankName == "BCA") {
        $("#account_number").mask("999-999-9999");
        bankLength = 10;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "MANDIRI") {
        $("#account_number").mask("999-99-9999-9999");
        bankLength = 13;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "BNI") {
        $("#account_number").mask("999-999-9999");
        bankLength = 10;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "BRI") {
        $("#account_number").mask("999-99-9999-9999-99");
        bankLength = 15;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "CIMB") {
        $("#account_number").mask("999-999-9999-999");
        bankLength = 13;
        bankMinLength = 10;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "PERMATA") {
        $("#account_number").mask("999-999-9999-9999-99");
        bankLength = 10;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "MAYBANK") {
        $("#account_number").mask("999-999-9999");
        bankLength = 10;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "MEGA") {
        $("#account_number").mask("999-99-9999-9999-99");
        bankLength = 15;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "PANIN") {
        $("#account_number").mask("999-999-9999");
        bankLength = 10;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
  	} else if(bankName=="JENIUS"){
        $("#account_number").mask("999-9999-9999");
        bankLength = 11;
        removeAttr('#account_number');
        attrUpDownString('#account_name');
    } else if (bankName == "GJK") {
        $("#account_number").unmask();
        removeAttr('#account_name');
        removeAttr('#account_number');
        attrUpDownNumber('#account_number');
        bankLength = 10;
    } else if (bankName == "DANA" || bankName == "OVO" || bankName == "GOPAY" || bankName == "LINKAJA") {
        $("#account_number").mask("9999-9999-9999-9");
        bankLength = 13;
        bankMinLength = 10;
        attrUpDownString('#account_name');
        removeAttr('#account_number');
        attrUpDownNumber('#account_number');
    } else {
        bankLength = 20;
    }
}

$(document).on('keyup','#account_name',function() {
  if ($(this).val().slice(0,3).toUpperCase() == 'GJK') {

    bankLength = 20;
    bankMinLength = 10;
    $("#account_number").unmask();
    removeAttr('#account_name');
    attrUpDownNumber("#account_number");

    var key = $(this).val().substring(0,3)+'-';
    var text = key+$(this).val().substring(4);

    $('#account_name').val(text);
  }
})

function removeAttr(id) {
    $(id).removeAttr('onkeyup onkeydown');
}

function attrUpDownNumber(id) {
    $(id).attr({
        onkeydown: "this.value=this.value.replace(/[^0-9]/g,'');",
        onkeyup: "this.value=this.value.replace(/[^0-9]/g,'');"
    });
}

function attrUpDownString(id) {
    $(id).attr({
        onkeydown: "this.value=this.value.replace(/[^a-zA-Z ]/,'');",
        onkeyup: "this.value=this.value.replace(/[^a-zA-Z ]/,'');"
    });
}
