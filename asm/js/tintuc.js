
function showHide(id) {
    var element = document.getElementById(id);
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    } else {
      element.classList.add('active');
    }
  }