$(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  //var img = new Image();
  //img.onload = draw;
  //img.src = 'C:/Users/Michu/Downloads/02-thumbnail.jpg';
  var backup;
  document.getElementById('upload').onchange = function(e) {
    var img = new Image();
    img.onload = draw;
    img.src = URL.createObjectURL(this.files[0]);
    backup = img.src;
  };

  function draw() {
    var canvas = document.getElementById('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);
  }
  //---------------------------------------------------//

  var jasnosc = document.getElementById('jasnosc');
  jasnosc.addEventListener('change', function(event) {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    applyBrightness(imgData.data, parseInt(jasnosc.value, 10));
    ctx.putImageData(imgData, 0, 0);
    console.log("Jasnosc");
  })

  var kontrast = document.getElementById('kontrast');
  kontrast.addEventListener('change', function(event) {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    applyContrast(imgData.data, parseInt(kontrast.value, 10));
    ctx.putImageData(imgData, 0, 0);
    console.log("Kontrast");
  })

  var inwersja = document.getElementById('inwersja');
  inwersja.addEventListener('click', function(event) {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    applyInvert(imgData.data);
    ctx.putImageData(imgData, 0, 0);
    console.log("Inwersja");
  })

  var custom = document.getElementById('custom');
  custom.addEventListener('click', function(event) {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    applyCustom(imgData.data, parseInt(custom.value, 10));
    ctx.putImageData(imgData, 0, 0);
    console.log("custom");
  })

  var reset = document.getElementById('reset');
  reset.addEventListener('click', function(event) {
    console.log("reset");
    var img = new Image();
    img.onload = draw;
    img.src = backup;
  })

  download_img = function(el) {
    var image = canvas.toDataURL("image/jpg");
    el.href = image;
  };


  //---------------------------------------------------//
  function applyBrightness(imgData, brightness) {
    for (var i = 0; i < imgData.length; i += 4) {
      imgData[i] += 255 * (brightness / 100);
      imgData[i + 1] += 255 * (brightness / 100);
      imgData[i + 2] += 255 * (brightness / 100);
    };
  }

  function applyInvert(imgData) {
    for (var i = 0; i < imgData.length; i += 4) {
      imgData[i] = imgData[i] ^ 255;
      imgData[i + 1] = imgData[i + 1] ^ 255;
      imgData[i + 2] = imgData[i + 2] ^ 255;
    };
  }

  function truncateColor(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 255) {
      value = 255;
    }
    return value;
  }

  function applyContrast(data, contrast) {
    var factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));
    for (var i = 0; i < data.length; i += 4) {
      data[i] = truncateColor(factor * (data[i] - 128.0) + 128.0);
      data[i + 1] = truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
      data[i + 2] = truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
    }
  }

  function applyCustom(imgData, gamma) {
    for (var i = 0; i < imgData.length; i += 4) {
      imgData[i] = imgData[i] * gamma;
      imgData[i + 1] = imgData[i + 1] + gamma;
      imgData[i + 2] = imgData[i + 2] - gamma / 2;
    };
  }

  function download() {
    var download = document.getElementById("zapisz");
    var image = document.getElementById("canvas").toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
  }

});
