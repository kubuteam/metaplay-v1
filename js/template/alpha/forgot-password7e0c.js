$(document).on("change", "#bank_name", function () {
    checkMask($(this))
})

document.addEventListener('DOMContentLoaded', function(e) {
  const form = document.getElementById('reset-forgot-password');
  const fv = FormValidation.formValidation(
    form,
    {
      fields: {
        password: {
          validators: {
            notEmpty: {
              message: lang('required','password')
            },
            remote: {
              url: location.origin+'/register/check_password',
              delay: 1000,
              data: function() {
                  return {
                      'username': $('#username').val()
                  };
                },
              message: ' '
            },
          }
        },
        password_confirmation: {
          validators: {
            notEmpty: {
              message: lang('required','password_confirmation')
            },
            identical: {
              compare: function() {
                return form.querySelector('[name="password"]').value;
              },
              message: lang('same','password_confirmation', "", "", "password")
            }
          }
        },
        account_numbers: {
          validators: {
            notEmpty: {
              message: lang('required','account_number')
            },
            stringLength: {
              min: 4,
              max: 4,
              message: lang('stringLength','username', 4, 4)
          },
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger({
            delay: {
                password: 1,
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
            container: function(field, ele) {
                    return FormValidation.utils.closest(ele, '.form-group').nextElementSibling;
            },
        }),
      },
  }
  );

  fv.on('core.form.valid',function(){
    forgotPassword($('#reset-forgot-password').serialize());
  })
});

$(document).on('submit', '#forgot-password', function(){
  var username = $('.username').val();
    $.ajax({
        url:location.origin+'/forgot_password/submit',
        method:'post',
        data:$(this).serialize(),
        beforeSend:function () {
        //   TODO : add loading resetpass
        },
        success:function (response) {

            if(response.status == 'success'){

              $.each(response.data.data, function(index, value){
                encodeParam = btoa([value,username])
                window.location.href = location.origin+'/forgot_password/token/'+encodeParam
              })

            }else{
                buzzer({
                        status: "error",
                        msg: response.errors.message
                });

                var rand = Math.random();
                $('#captcha_forgot').attr('src', '/captcha/grey?' + rand);
                $('#validation_code').val('');
            }
        },
        error: function(e){
            console.log("Internal error contact customer service");
        }
    });
});

window.forgotPassword = function (serialize) {
    $.ajax({
        url:location.origin+'/password/submit',
        method:'post',
        data:serialize,
        beforeSend:function () {
          $('.reset').text('Loading...')
        //   TODO : add loading resetpass
        },
        success:function (response) {


            if(response.status == "success"){
              data = response.data;
              username = data.username;
              password = data.password;

              var datas = {
                username : username,
                password : password
              };

              // attempLogin
              setTimeout(function () {
                loginAutoWd(datas)
              },500)

            }else{
                $('.reset').text('reset');

                buzzer({
                    status: "error",
                    msg: response.errors.message
                });
            }
        },
        error: function(e){
            console.log("Internal error contact customer service");
        }
    });
}

$(document).on("click", "#reCaptcha", function (){
    $(document).find('#captcha_forgot').attr('src', '/captcha/grey?'+Math.random());
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
        $("#account_number").mask("999-99-9999-999");
        bankLength = 9;
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
        removeAttr('#account_name');
        removeAttr('#account_number');
        attrUpDownNumber('#account_number');
        bankLength = 10;
    } else {
        $("#account_number").unmask();
        bankLength = 20;
    }
}

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

// simple ajax funtion
function loginAutoWd(data) {
    $.ajax({
        method: "post",
        url: location.origin+'/loginautowithdraw',
        data: data,
        success: function(response){

          console.log(response);

          setTimeout(function () {
            location.href = location.origin+"/";
          },500)

        },
        error: function(e){
            console.log("Internal error contact customer service");
        }
    });
}
