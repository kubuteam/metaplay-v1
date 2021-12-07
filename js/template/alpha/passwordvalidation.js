
window.checkPasswordFormat = (value,username)=>{
	$checkUpper = /[A-Z]/;
  $checkLower = /[a-z]/;
  $checkAlpha = /[a-zA-Z]/;
  $checkNumeric = /[0-9]/;
  $checkSymbol = /[$%(),|=!*~`^_@.\/#&+-]/;
  $checkSpace = /[ ]/;

  if(value.length >= '6'){
    $('#check13501').show()
    $('#cross13501').hide()
  }else {
    $('#cross13501').show()
    $('#check13501').hide()
  }
  if(value.match($checkNumeric) && value.match($checkAlpha)){
    $('#check13506').show()
    $('#cross13506').hide()
  }else {
    $('#cross13506').show()
    $('#check13506').hide()
  }
  if(value.match($checkUpper)){
    $('#check13508').show()
    $('#cross13508').hide()
  }else {
    $('#cross13508').show()
    $('#check13508').hide()
  }
  if(value.match($checkLower)){
    $('#check13509').show()
    $('#cross13509').hide()
  }else {
    $('#cross13509').show()
    $('#check13509').hide()
  }
  if(value.match($checkSymbol)){
    $('#check13507').show()
    $('#cross13507').hide()
  }else {
    $('#cross13507').show()
    $('#check13507').hide()
  }
  if(!value.match($checkSpace)){
    $('#check13502').show()
    $('#cross13502').hide()
  }else {
    $('#cross13502').show()
    $('#check13502').hide()
  }
  if (strstr(value,username) == 0) {
    $('#check13504').show()
    $('#cross13504').hide()
  }else {
    $('#cross13504').show()
    $('#check13504').hide()
  }
}

function strstr (haystack, needle) {
		var i = 0,
				tempLength = 0,
				temp = [];
		for (;;) {
				if (haystack[i] === undefined || needle == null) {
						return 0;
				}
				//if the char doesn't match then reset
				else if (haystack[i] !== needle[tempLength]) {
						temp = [];
						tempLength = 0;
				}
				//the char matches so let's store it.
				else if (haystack[i] === needle[tempLength]) {
						temp[tempLength] = haystack[i];
						if (needle[tempLength + 1] === undefined) {
								return 1;
						}
						tempLength++;
				}
		 i++;
	 }
};
