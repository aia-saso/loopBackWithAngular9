// // var myApp = angular.module("phoneBookRecords", ['lbServices']);
// myApp.controller("phoneBookRecordsController", function ($scope, $http, Record) {
//   $scope.records = Record.find();
//   $scope.newRecordName = '';
//   $scope.newRecordPhoneNumper = '';

//   $scope.pushRecord = function () {
//     if ($scope.newRecordPhoneNumper != "") {
//       document.getElementById('phoneNumberError').style.display = 'none';
//       if ($scope.newRecordName.length > 3) {
//         document.getElementById('nameLengthError').style.display = 'none';
//         Record.create({ name: $scope.newRecordName, phoneNumber: $scope.newRecordPhoneNumper }).$promise.then(function (name) {
//           $scope.records.push(name);
//           $scope.newRecordName = '';
//           $scope.newRecordPhoneNumper = '';
//         })
//       } else {
//         document.getElementById('nameLengthError').style.display = 'block';
//       }
//     } else {
//       document.getElementById('phoneNumberError').style.display = 'block';
//     }
//   }

$scope.deleteRecord = function (index) {
  Record.deleteById({ id: $scope.records[index].id }).$promise.then(function () {
    $scope.records.splice(index, 1);
  })
}

$scope.updateRecord = function (index) {
  $scope.newRecordPhoneNumper = $scope.records[index].phoneNumber;
  $scope.newRecordName = $scope.records[index].name;

  Record.deleteById({ id: $scope.records[index].id }).$promise.then(function () {
    $scope.records.splice(index, 1);
  })
}
$scope.searchRecordByName = function (searchName) {
  if (searchName != "") {
    $scope.records = [];
    $scope.records = Record.find({
      filter: {
        where: { name: searchName }
      }
    });
  }
  else {
    $scope.records = Record.find();
  }
}
})
