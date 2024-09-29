angular
  .module("myapp", ["ngRoute"])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "trangchu.html?" + Math.random(),
        controller: "homeCtrl",
      })
      .when("/products", {
        templateUrl: "products.html?" + Math.random(),
        controller: "productsCtrl",
      })

      .when("/productsdetail/:id", {
        templateUrl: "product_details.html?" + Math.random(),
        controller: "product_detailsCtrl",
      })
      .when("/cart", {
        templateUrl: "giohang.html?" + Math.random(),
        controller: "cartCtrl",
      })
      .when("/cart/:id", {
        templateUrl: "giohang.html?" + Math.random(),
        controller: "cartCtrl",
      })
      .when("/contact", {
        templateUrl: "lienhe.html?" + Math.random(),
        controller: "contactCtrl",
      })
      .when("/account", {
        templateUrl: "signup.html?" + Math.random(),
        controller: "signupCtrl",
      })
      .when("/news", {
        templateUrl: "tintuc.html?" + Math.random(),
        controller: "newsCtrl",
      })
      .when("/news/:id", {
        templateUrl: "tintucchitiet.html?" + Math.random(),
        controller: "newsCtrl",
      })
      .when("/pay", {
        templateUrl: "thanhtoan.html?" + Math.random(),
        controller: "payCtrl",
      })
      .otherwise({
        template: "<h1>404 - Không tìm thấy trang</h1>", // default template
      });
  })
  .controller("myctrl", function ($scope, $http) {
    $scope.dssp = [];
    $http.get("js/main.json").then(
      function (response) {
        $scope.dssp = response.data;
      },
      function (response) {
        alert("Lỗi ");
      }
    );

    $scope.cart = [];
    $scope.radio = [];
    $scope.pay = [];
   

    $scope.cart = JSON.parse(localStorage.getItem("cart_local")) || [];

    $scope.saveCartToLocalStorage = function () {
      localStorage.setItem("cart_local", JSON.stringify($scope.cart));
    };

    // console.log(localStorage.getItem('cart_local'));


// login form
var loginForm = document.getElementById('loginForm');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');

console.log(localStorage.getItem('email'));
console.log(localStorage.getItem('password'));

var storedEmail = localStorage.getItem('email');
var storedPassword = localStorage.getItem('password');


if (storedEmail && storedPassword) {
  emailInput.value = storedEmail;
  passwordInput.value = storedPassword;
}
var users =JSON.parse(localStorage.getItem('users'));



loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  
  var email = emailInput.value;
  var password = passwordInput.value;


  var foundUser = users.find(function(user) {
    return user.email == email && user.password == password;
  });
  
  if (foundUser) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
   
   
    window.location.href = 'index.html';  
  } 
    
    
  
   
});


  })

  .controller("homeCtrl", function ($scope) {})

  .controller("productsCtrl", function ($scope, $routeParams, $http) {
    $scope.id = $routeParams.id;

    $scope.limit = 8;
    $scope.page = 1;
    $scope.start = ($scope.page - 1) * $scope.limit;
    $scope.totalPage = Math.ceil($scope.dssp.length / $scope.limit);

    $scope.pageList = [];
    for (var i = 1; i <= $scope.totalPage; i++) {
      $scope.pageList.push(i);
    }

    $scope.changePage = function (trang) {
      $scope.page = trang;
      $scope.start = ($scope.page - 1) * $scope.limit;
    };

    $scope.changeOrder = function (orderBy) {
      $scope.order = orderBy;
    };

    $scope.p = "name";
    $scope.sortBy = function (p) {
      $scope.p = p;
    };
  })

  .controller("product_detailsCtrl", function ($scope, $routeParams) {
    $scope.colors = [
      {
        value: "Nâu nhạt 145",
        class: "nau-nhat-145",
        hex: "#c58622",
        id: "swatch-0-nau-nhat-145",
      },
      {
        value: "Cam 197",
        class: "cam-197",
        hex: "#fc9f05",
        id: "swatch-0-cam-197",
      },
      {
        value: "Xanh đen 130",
        class: "xanh-den-130",
        hex: "#092f5c",
        id: "swatch-0-xanh-den-130",
      },
      {
        value: "Xanh lá 132",
        class: "xanh-la-132",
        hex: "#309751",
        id: "swatch-0-xanh-la-132",
      },
      {
        value: "Nâu 60",
        class: "nau-60",
        hex: "#b35304",
        id: "swatch-0-nau-60",
      },
      {
        value: "Kem 144",
        class: "kem-144",
        hex: "#d4af72",
        id: "swatch-0-kem-144",
      },
      {
        value: "Nâu bóng 86",
        class: "nau-bong-86",
        hex: "#4d2808",
        id: "swatch-0-nau-bong-86",
      },
      {
        value: "Xanh dương 06",
        class: "xanh-duong-06",
        hex: "#10669c",
        id: "swatch-0-xanh-duong-06",
      },
      {
        value: "Vàng 10",
        class: "vang-10",
        hex: "#ffc31d",
        id: "swatch-0-vang-10",
      },
      {
        value: "Đỏ 31",
        class: "do-31",
        hex: "#e20606",
        id: "swatch-0-do-31",
      },
    ];
    $scope.selectedColor = $scope.colors[0].hex;

    $scope.id = $routeParams.id;
    for (var i = 0; i < $scope.dssp.length; i++) {
      if ($scope.dssp[i].id == $scope.id) {
        $scope.product = $scope.dssp[i];
        break;
      }
    }

    $scope.addToCart = function () {
      var flag = false;
      for (var i = 0; i < $scope.cart.length; i++) {
        if ($scope.cart[i].id === $scope.product.id) {
          $scope.cart[i].qty++;
          flag = true;
          break;
        }
      }
      if (!flag) {
        $scope.product.qty = 1;
        $scope.cart.push($scope.product);
      }
      alert("Bạn vừa thêm " + $scope.cart.length + " sản phẩm vào giỏ hàng");
      $scope.saveCartToLocalStorage($scope.cart);
    };
  })

  .controller("cartCtrl", function ($scope, $routeParams) {
    // hàm tính
    $scope.calculateTotal = function () {
      let total = 0;
      for (let item of $scope.cart) {
        total += item.proPrice * item.qty;
      }
      return total;
    };

    // hàm update
    $scope.updateQuantity = function (item, delta) {
      if (typeof delta !== "undefined") {
        item.qty = parseInt(item.qty) + delta;

        if (item.qty < 1) {
          item.qty = 1;
        }
      } else {
        item.qty = parseInt($scope.p.qty);
        if (item.qty < 1) {
          item.qty = 1;
        }
      }
      $scope.saveCartToLocalStorage();
    };
    // hàm xóa sản phẩm
    $scope.removeItem = function (item) {
      const index = $scope.cart.indexOf(item);
      if (index > -1) {
        $scope.cart.splice(index, 1);
        $scope.saveCartToLocalStorage();
      }
    };

    $scope.addPay = $scope.cart;

    $scope.saveCartToLocalStorage($scope.pay);
  })

  .controller("contactCtrl", function ($scope) {})
  .controller("signupCtrl", function ($scope, $routeParams) {

let users = [];


const firstNameInput = document.querySelector('input[placeholder="Họ"]');
const lastNameInput = document.querySelector('input[placeholder="Tên"]');
const genderRadios = document.querySelectorAll('input[name="customer[gender]"]');
const birthdayInput = document.querySelector('#form-birthday input[type="date"]');
const emailInput = document.querySelector('#form-email input[type="email"]');
const passwordInput = document.querySelector('input.password');
const registerButton = document.querySelector('.action_bottom button[type="submit"]');


registerButton.addEventListener('click', (event) => {
  event.preventDefault();
 

  if (
    firstNameInput.value.trim() == '' ||
    lastNameInput.value.trim() == '' ||
    !genderRadios[0].checked && !genderRadios[1].checked ||
    birthdayInput.value.trim() == '' ||
    emailInput.value.trim() == '' ||
    passwordInput.value.trim() == ''
  ) 
   {
    
    alert('Vui lòng điền đầy đủ các trường bắt buộc.');
    return;
  }

  
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const gender = genderRadios[0].checked ? 'Nữ' : 'Nam';
  const birthday = birthdayInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();


  const newUser = {
    firstName,
    lastName,
    gender,
    birthday,
    email,
    password
  };

 
  users.push(newUser);
    
  
  localStorage.setItem('users', JSON.stringify(users));
  alert("Bạn đã đăng ký thành công");

 
})
})
  .controller("newsCtrl", function ($scope) {})
  .controller("newsCtrl", function ($scope, $http) {
 
    $scope.news= [];
    $http.get("js/news.json").then(
      function (response) {
        $scope.news = response.data;
      },
      function (response) {
        alert("Lỗi ");
      }
    );;

    $scope.showHide = function(id) {
      var element = document.getElementById(id);
      if (element.style.display == 'none') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    };
    
    // $scope.news_details = [
    //   {
    //     id: 1,
    //     background_img: "./img/background-news1.jpg",
    //     sb_title_article: "Bộ sản phẩm bao da cho iPhone 15 series",
    //     article_info_more: "Người viết: Khanh Nguyen lúc",
    //     date: "08.09.2023",
    //     article_pages:
    //       "Các bạn chờ đợi gì ở sự kiện apple đêm nay&nbsp;12/9/2023, Khắc Tên thì không chờ đợi nữa, bọn mình đã chuẩn bị sẵn các loại bao da cho iPhone 15, đủ để&nbsp;đáp ứng mọi nhu cầu của bạn. Cùng đặt hàng sớm&nbsp;để nhận ưu đãi 20%&nbsp;và sẵn sàn phụ kiện bảo vệ cho iPhone&nbsp;15 khi về tay nhé.",
    //   },
    // ];
   
    // for (var j = 0; j < $scope.products.length; j++) {
    //   if ($scope.news_details[j].id == $scope.id) {
    //     $scope.product = $scope.news_details[j];
    //     break;
    //   }
    // }
  })
  .controller("payCtrl", function ($scope, $routeParams, $http, $interval) {
    $scope.dsTinh = [];
    $http
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json?fbclid=IwZXh0bgNhZW0CMTAAAR1RZNkdl7K-HMk01seXgzwXQa6w5MbImkBhrfj0IapdxCB3UYYKA6nVu0Q_aem_AWi1KZuhJEdWScoWF6QVf6Ng26jHrgR55amkJyP1evYIDRUlzdfyw1p-PU3LoNSZtrSxuIbu1alS_riefUR293df"
      )
      .then(
        function (res) {
          $scope.dsTinh = res.data;
        },
        function (res) {
          alert("Lỗi không tải được dữ liệu");
        }
      );

    $interval(function () {
      $scope.now = new Date();
    }, 1000);

    $scope.pay = JSON.parse(localStorage.getItem("cart")) || [];
    $scope.disCountCodes = [
      { code: "VANTAI", discount: 0.1 },
      { code: "XUANTAI", discount: 0.2 },
      { code: "TAI1", discount: 0.5 },
    ];

    $scope.validateDiscount = function (code) {
      for (let i = 0; i < $scope.disCountCodes.length; i++) {
      if ($scope.disCountCodes[i].code === code) {
      return $scope.disCountCodes[i].discount;
      }
      }
      return null;
      };



      $scope.trangThaiMa = false;

      $scope.applyDiscount = function (code) {
      let applyDiscount = $scope.validateDiscount(code);
      if (applyDiscount !== null) {
        if(!$scope.trangThaiMa) {
          $scope.discountCodes = code; // Lưu mã giảm giá
          $scope.discountRate = applyDiscount;
          $scope.trangThaiMa = true;
          $scope.calculateTotal(); 
        }else{
          alert("Mã giảm giá đã được áp dụng , không thể áp dụng thêm.");
        }
      }else{
        alert("Mã giảm giá không hợp lệ.");
      }
     
      };
      
       
      
    $scope.calculateTotal = function () {
      let total = 0;
      for (let i = 0; i < $scope.cart.length; i++) {
        total += $scope.cart[i].proPrice * $scope.cart[i].qty;
      }
      // Trừ mã giảm giá
      let discountRate = $scope.validateDiscount($scope.discountCodes);
      if (discountRate !== null) {
        total = total * (1 -  discountRate);
      }

      // Cộng phí vận chuyển
      total += $scope.ship;
      return total;
    }

   

    $scope.ship = 0;

    $scope.selectOption = function (option) {
      switch (option) {
        case "option1":
          $scope.ship = 50; // Vận chuyển hỏa tốc
          break;
        case "option2":
          $scope.ship = 20; // Vận chuyển nhanh
          break;
        default:
          $scope.ship = 0;
      }
    }
  
  })
  .filter("searchProduct", function () {
    return function (input, keyword, attr) {
      if (!keyword) {
        return input;
      }
      var output = [];
      for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < attr.length; j++) {
          if (
            input[i][attr[j]]
              .toString()
              .toLowerCase()
              .indexOf(keyword.toLowerCase()) >= 0
          ) {
            output.push(input[i]);
          }
        }
      }
      return output;
    };
  });

// .run(function ($rootScope, $timeout) {
//   $rootScope.$on("$routeChangeStart", function () {
//     $rootScope.loading = true;
//   });
//   $rootScope.$on("$routeChangeSuccess", function () {
//     $timeout(function () {
//       $rootScope.loading = false;
//     });
//   });
//   $rootScope.$on("$routeChangeError", function () {
//     $rootScope.loading = false;
//     alert("Lỗi, không tải được teamplate");
//   });
// });

(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

$scope.calculateTotal = function() {
  let total = 0;
  for (let i = 0; i < $scope.cart.length; i++) {
    total += $scope.cart[i].proPrice * $scope.cart[i].qty;
  }
  return total;
};





// $scope.updateQuantity = function(item) {
//   for (let i = 0; i < $scope.cart.length; i++) {
//     if ($scope.cart[i] === item) {
//       $scope.cart[i].qty = parseInt($scope.p.qty);
//       if ($scope.cart[i].qty < 1) {
//         $scope.cart[i].qty = 1;
//       }
//       break;
//     }
//   }
//   $scope.saveCartToLocalStorage();
// };

// $scope.removeItem = function(item) {
//   for (let i = 0; i < $scope.cart.length; i++) {
//     if ($scope.cart[i] === item) {
//       $scope.cart.splice(i, 1);
//       $scope.saveCartToLocalStorage();
//       break;
//     }
//   }
// };

// $scope.addPay = $scope.cart;

// $scope.saveCartToLocalStorage($scope.pay);
