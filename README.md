todomvc-angular
===============

## 미리보기

이번 강의에서 만들 결과물을 미리 보자.

* 투두(Todo) 목록을 조회
* 추가, 편집, 삭제, 완료 처리 (CRUD)
* 투두의 상태에 따라 completed(완료), active(진행중)로 필터링

![screenshot](screenshot-preview.png)

## 프로젝트 구조

### 백엔드

* 서버는 [Node.js](https://nodejs.org/en/)기반의 [Express.js](http://expressjs.com) 웹프레임웍을 사용함
* 서버는 1) html, css, javascript 등의 정적 파일을 호스팅하고 2) ajax 기능을 수행할 api를 제공함  

### 프론트엔드

* 웹페이지는 [Angular.js](https://angularjs.org)를 사용한 하나의 페이지(index.html)로 구성됨
* 앵귤러 컨트롤러로 웹페이지를 조작하고 앵귤러 서비스를 통해 백엔드 api와 통신함

![screenshot-structure](screenshot-structure.jpg)

## 개발 환경

### Node.js

* [https://nodejs.org/en/](https://nodejs.org/en/)에서 다운로드 후 설치
* 웹서버 구동과 프로젝트 관리를 위해 사용

### NPM

* Node Package Manager
* 노드 패키지를 프로젝트에 추가, 삭제하거나 직접 작성한 패키지를 배포할 때 사용함.
* 본 프로젝트에서는 angularjs등 외부 라이브러리 설치시 사용
* 노드를 설치하면 자동으로 NPM도 설치됨
* 이후 Bower, Gulp 등 개발 툴은 상황에 따라 추가 설명할 예정

## 프로젝트 초기화

* Npm으로 프로젝트 초기화

```
$ mkdir todomvc && cd todomvc
$ npm init
```

* package.json: 프로젝트 정보를 담고 있음.
* 특히 dependencies에는 프로젝트에서 사용하는 외부 라이브러리 정보가 기록됨
* 다른 개발자가 `npm install`로 필요한 라이브러리를 한번에 설치할 수 있음

## 앵귤러 시작

* index.html 작성

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=yes">
  <title>Angular | TodoMVC</title>
</head>
<body>
</body>
</html>
```

* Npm 으로 앵귤러 설치:

```
$ npm install angular --save
```
* `--save` 옵션을 주는 것은 이 프로젝트가 앵귤러 라이브러리를 사용한다는 것을 알리는 것
* 이 정보는 package.json의 dependencies에 추가됨
* 앵귤러 라이브러리를 로딩하고 **모듈(module)**, **컨트롤러(controller)** 생성
* `ng-app`: 브라우져에게 앵귤러 모듈을 사용한다고 알림
* `ng-controller`: 브라우져에게 앵귤러 컨트롤러를 사용한다고 알림

```html
<!-- index.html -->
<html ng-app="todomvc">
  <body ng-controller="TodomvcCtrl">

  <script src="node_modules/angular/angular.js"></script>
  <script>
    angular
        .module('todomvc', [])  // 모듈 정의
        .controller('TodomvcCtrl', function ($scope) {  // 컨트롤러 정의
          $scope.message = 'Hello wordl!';
        });
  </script>
  </body>
</html>
```

## [tip] brower-sync

* [bower-sync](https://www.browsersync.io/)는 코드변화에 따라 브라우져를 갱신하는 툴
* 내부적으로 웹서버를 구동하여 index.html 파일을 호스팅함
* Npm을 이용해 글로벌로 설치

```
$ npm install -g browser-sync
$ browser-sync start --server --files "./**/*"
```

## Controller

* Html로 작성된 템플릿과 연결되어 데이터를 출력하고 사용자 입력을 처리하는 것이 컨트롤러의 역할
* `angular.module().controller()` 함수로 컨트롤러 정의

```javascript
// js/controllers/TodomvcCtrl.js:
angular.module('todomvc')
    .controller('TodomvcCtrl', function ($scope) {
      $scope.message = 'Hello world!';
    });
```

* 컨트롤러 생성과 동시에 스코프 변수(`$scope`)가 콜백함수의 파라매터로 넘어옴
* 이는 템플릿과 컨트롤러간의 연결을 위한 변수
* index.html에 스코프 변수 출력하기 (인터폴레이션)

```html
<!-- index.html -->
<body ng-controller="TodomvcCtrl">
  <p>
    {{ message }} <!-- "Hello world!" -->
  </p>
</body>

```

## 투두 목록 출력하기 (ngRepeat)

* 컨트롤러에 배열 데이터 `$scope.todos` 만들기

```javascript
// js/controllers/TodomvcCtrl.js
angular.module('todomvc')
    .controller('TodomvcCtrl', function ($scope) {
      $scope.todos = [{
        id: 1,
        title: '요가 수행하기',
        completed: false
      }, {
        id: 2,
        title: '어머니 용돈 드리기',
        completed: true
      }];
    });
```

* `ngRepeat`으로 배열 출력하기

```html
<!-- index.html -->
<ul ng-repeat="todo in todos track by $index">
  <li>
      <input type="checkbox" ng-model="todo.completed">
      <input type="text" ng-model="todo.title">
      <button type="button">Remove</button>
  </li>
</ul>
```

## 삭제 기능 만들기 (ngClick)

* ngClick 디렉티브를 이용해 버튼의 클릭 이벤트 후킹

```html
<!-- index.html -->
<button type="button" ng-click="remove(todo.id)">Remove</button>
```

* ngClick에 설정한 컨트롤러 함수를 이용해 이벤트 핸들러 구현


```javascript
// js/controllers/TodomvcCtrl.js
angular.module('todomvc')
    .controller('TodomvcCtrl', function ($scope) {
      $scope.remove = function (id) {
        if (!id) return;

        // 배열에서 제거할 인덱스를 검색
        var deleltedTodoIdx = $scope.todos.findIndex(function (todo) {
          return todo.id === id;
        });

        if (deleltedTodoIdx === -1) return;

        // 배열에서 제거
        $scope.todos.splice(deleltedTodoIdx, 1);
      }

    });
```

## 새로운 투두 추가하기 (ngForm)

* 앵귤러로 폼 작성하기
* 폼에서 submit 이벤트 발생시 ngSubmit 디렉티브에 설정한 컨트롤러 함수가 동작하는 구조
* 폼버튼을 만들고 ngSubmit에 컨트롤러 함수를 연결

```html
<!-- index.html -->
<form ng-submit="add(newTodoTitle)">
  <input type="text" ng-model="newTodoTitle" placeholder="Type todos" autofocus>
  <button type="submit">Add</button>
</form>
```

* ngSumbit에 연결된 컨트롤러 함수 구현

```javascript
// js/controllers/TodomvcCtrl.js
angular.module('todomvc')
    .controller('TodomvcCtrl', function ($scope) {
      $scope.addTodo = function (title) {
        title = title.trim();
        if (!title) return;

        // 새로 추가할 아이디 계산
        var newId = !$scope.todos.length ?
            1 : $scope.todos[$scope.todos.length - 1].id + 1;

        // 새로운 투두 객체
        var newTodo = {
          id: newId,
          title: title,
          completed: false
        };

        // todos 배열에 새로운 투두 추가
        $scope.todos.push(newTodo);
      };
    });
```

## 스타일 입히기 (Twitter Bootstrap)

* [Twitter Bootstrap](http://getbootstrap.com)은 반응형웹, 모바일 웹을 위한 스타일시트 라이브러리
* Npm으로 부트스트랩 설치

```
$ npm instsall bootstrap --save
```
* index.html에 라이브러리 로딩

```html
<!-- index.html -->
<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
```

* 부트스트랩 클래스 적용하기

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=yes">
  <title>Angular | TodoMVC</title>
  <link rel="stylesheet"
        href="node_modules/bootstrap/dist/css/bootstrap.min.css">
</head>
<body ng-app="todomvc">
<div ng-controller="TodomvcCtrl" class="container">
  <h1>Todos</h1>

  <ul class="list-unstyled">
    <li>
      <form ng-submit="add(newTodoTitle)">
        <div class="input-group">
          <input type="text" ng-model="newTodoTitle" class="form-control"
                 placeholder="Type todos" autofocus>
          <span class="input-group-btn">
            <button class="btn btn-success" type="submit">Add</button>
          </span>
        </div>
      </form>
    </li>
  </ul>

  <ul ng-repeat="todo in todos" class="list-unstyled">
    <li>
      <div class="input-group">
        <span class="input-group-addon">
          <input type="checkbox" ng-model="todo.completed">
        </span>
        <input type="text" class="form-control" ng-model="todo.title">
        <div class="input-group-btn">
          <button class="btn btn-danger" ng-click="remove(todo.id)">Remove</button>
        </div>
      </div>
    </li>
  </ul>
</div>

<script src="node_modules/angular/angular.js"></script>
<script src="js/app.js"></script>
<script src="js/controllers/TodomvcCtrl.js"></script>

</body>
</html>
```

## 투두 목록 필터링 (ngRepeat filter)

* 출력된 투두목록을 다음 기준으로 필터링 해보자.
* __completed__: 완료된 투두 리스트, __active__: 미완료된 투두 리스트, __all__: 모든 투두 리스트
* ngRepeat의 필터링 기능을 이용
* filter에 필터 조건을을 넣음

```html
<!-- index.html -->
<ul ng-repeat="todo in todos | filter: {completed: true}">
```

* 필터 버튼을 만들어 ngClick 디렉티브에 필터 변수값을 변경하는 코드 작성

```html
<!-- index.html -->
<ul ng-repeat="todo in todos | filter:statusFilter">
<div class="btn-group" role="group" aria-label="...">
  <button type="button" ng-click="status={completed:true}">Completed</button>
  <button type="button" ng-click="status={completed:false}">Active</button>
  <button type="button" ng-click="status={}">All</button>
</div>
```

## [diy] Clear All 버튼 만들기



## 디렉티브

* [디렉티브](https://docs.angularjs.org/guide/directive)는 특별한 역할을 하는 돔(DOM) 엘레먼트
* Jquery로 직접 돔을 조작하거나, 중복 코드를 리팩토링하거나, 새로운 마크업을 만들고 싶을때 사용함
* 하나의 투두를 표현하는 코드 덩어리를 디렉티브로 만들어 보자

```html
<!-- index.html -->
<ul ng-repeat="todo in todos | filter:status" class="list-unstyled">
  <li>
    <todo-item></todo-item>
  </li>
</ul>
```

* `angular.module().directive()` 함수로 todoItem 디렉티브 정의

```javascript
// js/directives/todoItem.js
angular.module('todomvc')
    .directive('todoItem', function () {
      return {
        restrict: 'E',
        template: '<div>todoItem</div>'
      };
    });
```

## [diy] 필터버튼을 디렉티브로 분리


## 서비스

* 기존 컨트롤러에는 두개 기능이 섞여 있음
* 1) 사용자 이벤트를 감지하고 템플릿에 데이터를 보내주는 역할, 즉 **템플릿과 직접 연결되는 부분**
* 2) todos 배열에서 투두를 제거하거나 추가하는 역할, 즉 **데이터를 핸들링 하는 부분** (-> 서비스로 분리)
* `angular.module().factory()` 함수로 서비스 정의

```javascript
// js/services/todoStorage.js
angular.module('todomvc')
    .factory('todoStorage', function () {
      var storage = {
        todos: [{
          id: 1,
          title: '요가 수행하기',
          completed: false
        }, {
          id: 2,
          title: '어머니 용돈 드리기',
          completed: true
        }],

        get: function () {
          return storage.todos;
        },
      };

      return storage;
    });
```

* 정의한 서비스를 컨트롤러에 주입하여 사용

```javascript
// js/controllers/TodomvcCtrl.js:
angular.module('todomvc')
    .controller('TodomvcCtrl', function ($scope, todoStorage) {
      $scope.todos = todoStorage.get();
    });
```

## [diy] add, delete, Clear Completed 도 서비스로 옮겨보자

## 서버와 클라이언트 코드 분리

* 폴더 구조

```
/client
  /controllers
  /directives
  /services
  app.js
/server
  app.js
```

## Express 웹서버 시작

* 웹서버의 기능: 1) 정적파일 호스팅, 2) API 기능
* 정적 파일 강의 참고: [생활코딩 Express-정적파일을 서비스하는 법](https://opentutorials.org/course/2136/11857)
* express 모듈 설치

```
$ npm install express --save
```  

* express 공식 사이트의 [hello world](http://expressjs.com/en/starter/hello-world.html) 코드 사용

```javascript
// server/app.js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

* node 명령어로 서버 구동

```
$ node server/app
Example app listening on port 3000!
```

## [tip] nodemon

* 자바스크립트 코드 변경을 감지하여 노드 서버를 재 실행하는 툴
* npm 글로벌 옵션으로 설치

```
$ npm install nodemon -g
$ node server/app
[nodemon] 1.9.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server/app.js`
Example app listening on port 3000!
```

* nodemon + browserSync 연동

```
$ browser-sync start --proxy "localhost:3000" --files "client/**/*"
```

* npm으로 통합

```json
{
  "scripts": {
    "nodemon": "nodemon server/app",
    "browser-sync": "browser-sync start --proxy localhost:3000 --files client/**/*"
  }
}
```

```
$ npm run nodemon
$ npm run browser-sync
```

## Static Files

### 익스프레스 미들웨어

* 익스프레스는 미들웨어를 통해 서버의 기능을 추가할 수 있음
* app.use()를 이용해 미들웨어를 추가할 수 있음

### express.static()

* html, css, javascript 등 정적파일을 웹서버에서 호스팅해야 함
* 익스프레스 객체는 이를 지원하는 static 미들웨어를 지원함 (express 객체가 지원하는 유일한 미들웨어)
* 클라이언트가 요청한 주소값(`req.url`)에 의해 서버에 있는 파일 위치를 결정함
* 예를 들어 localhost/index.html 주소로 요청할 경우 서버에서 설정한 정적파일 위치와 index.html을 조합하여 파일 위치를 찾음

```javascript
// server/app.js
app.use(express.static(path.join(__dirname, '../client')));
```

* 위의 경우 localhost/index.html 요청이 올 경우 서버의 client/indxe.html 파일을 찾아서 응답해 줌
* node_modules 폴더에 있는 라이브러리 파일도 정적 파일로 설정해야 함
* 특정 경로의 요청에 대한 정적파일 설정시 app.use() 함수의 첫번째 파라매터로 그 경로를 접두어로 설정할 수 있음

```javascript
// server/app.js
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
```

* 클라이언트에서 localhost/node_modules/bootstrap.css 요청이 올경우 서버는 node_modules/bootstrap.css 파일을 찾아 응답해 줌

## API

* 클라이언트와 서버간의 데이터 교환을 위한 프로토콜 필요
* 클라이언트는 Ajax를 이용해 서버로 데이터를 요청하는데 이것을 API라고 함
* 앵귤러는 $http 서비스를 이용해 ajax 통신을 처리함

### REST API

* 서버의 자원(resource)단위로 설계된 API
* 명사와 동사의 분리 (`GET /users` v.s `/get_users`)
* 우리가 만들 api 목록

Method	| Url	              | Role
--------|-------------------|---------------
GET	    | /api/todos	      | todo 목록 조회
POST	  | /api/todos	      | todo 생성
PUT	    | /api/todos/:id	  | todo 갱신
DELETE	| /api/todos/:id	  | todo 삭제

### GET /api/todos

* 투두 목록을 조회하는 기능
* 앵귤러로 만든 todoStorage의 배열을 백엔드로 이동
* 익스프레스 객체(app)는 app.METHOD(path, callback) 형식의 메소드로 라우팅 로직을 구현

```javascript
// server/app.js
var todos = [{
  id: 1,
  title: 'todo 1',
  completed: false
}, {
  id: 2,
  title: 'todo 2',
  completed: false
}, {
  id: 3,
  title: 'todo 3',
  completed: true
}];

// GET /api/todos 라우팅 설정
app.get('/api/todos', function (req, res) {
  res.json(todos);
});
```

## [tip] Postman

* [다운로드](https://www.getpostman.com/)
* REST API 개발 필수품

## POST /api/todos

### body-parser

* POST 메쏘드는 데이터를 보낼때 바디에 그 정보를 저장함
* express에서 리퀘스트 바디에 접속하기 위해서는 [body-parser](http://expressjs.com/ko/4x/api.html#req.body) 미들웨어가 필요함
* body-paser 설치:

```
$ npm isntall bady-parser --save
```

* 익스프레스 엔진에 body-parser 추가

```javascript
// server/app.js:
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

### POST /api/todos 구현

```javascript
// server/app.js
app.post('/api/todos', function (req, res) {
  if (!req.body.title) {
    return res.status(400).send();
  }

  var newId = !todos.length ?
      1 : todos[todos.length - 1].id + 1;

  var newTodo = {
    id: newId,
    title: req.body.title,
    completed: false
  };

  todos.push(newTodo);

  res.json(newTodo);
});
```

## [diy] DELETE, PUT도 구현해 보자!

## 앵귤러에서 백엔드 API 사용하기 ($http)

* 앵귤러 서비스에서 api 호출을 위해 앵귤러 라이브러리의 $http 서비스 사용
* $http는 ajax를 통신을 위한 목적

```javascript
// js/services/todoStorage.js:
angular.module('todomvc')
    .factory('todoStorage', function ($http) {
      var storage = {

        todos: [],

        get: function (callback) {
          $http.get('/api/todos')                 // GET /api/todos 요청
              .then(function success(res) {       // 성공
                callback(null, angular.copy(res.data, storage.todos));
              }, function error(err) {            // 실패
                callback(err);
              });
        },
      };
    });
```

* 서비스를 사용하는 컨트롤러 코드도 변경

```javascript
// js/controllers/TodomvcCtrl.js
angular.module('todomvc')
    .controller('TodomvcCtrl', function ($scope, todoStorage) {

      // 비동기 함수라서 콜백 함수를 파라매터로 넘겼다.
      todomvcStorage.get(function (err, todos) {
        if (err) return;
        $scope.todos = todos;
      });
    });    

```

## [diy] DELETE와 PUT도 구현해 보자!

## 라우팅 코드 리펙토링 (express.Router)

* express.Router는 라우팅을 모듈화할 수 있는 클래스
* 리소스 단위로 모듈화하여 라우팅 로직을 관리할 수 있음
* 모듈화된 라우팅 로직은 익스프레스 객체에 마운트하여 사용할 수 있음
* 폴더 구조 변경

```
/server
  /api
    todo.js // todo 리소스에 대한 라우팅 (/api/todos/*)
    user.js // user 리소스에 대한 라우팅 (/api/users/*)
  app.js    // 전체 라우팅 관리
```

```javascript
// server/app.js
app.use('/api/todos', require('./api/todo'));

// server/api/todo.js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

});

router.post('/', function (req, res) {

});

router.delete('/completed', function (req, res) {

});

router.delete('/:id', function (req, res) {

});

module.exports = router;
```

## REST API 위한 앵귤러 서비스 ngResource

* [ngResource](https://docs.angularjs.org/api/ngResource)는 리소스 단위 API인 REST API와 함께 사용하는 앵귤러 서비스
* $http 서비스로 만든 ajax 호출 로직을 한 단계 추상화하여 만들 수 있음

```
$ npm install angular-resourece --save
```

* 외부 앵귤러 모듈이므로 todomvc 모듈 정의시 이를 사용하기위해 모듈을 주입

```javascript
// client/js/app.js
angular.module('todomvc', ['ngResource']);
```

* todoStorage 서비스 개선

```javascript
angular.module('todomvc')
    .factory('todoStorage', function ($resource) {
      var Todo = $resource('/api/todos/:id', {id: '@id'})

      var storage = {
        todos: [],

        get: function () {
          storage.todos = Todo.query();
          return storage.todos;
        },

        create: function (title) {
          return Todo.save({title: title})
              .$promise
              .then(function (data) {
                storage.todos.push(data);
              })
        }
      };

      return storage;
    });
```

## 데이터베이스

### MongoDB
* [MongoDB](https://www.mongodb.com/) NoSQL 데이터베이스
* 설치: [OS X](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
* 데이테이베이스 실행

```
$ mongod // 데모 실행
$ mongo  // 디비에 접속하여 쉘 실행
```

* 쿼리

```
> show dbs;         // 디비 목록 조회
> use todomvc;      // 사용할 디비 선택
> show collections; // 컬렉션 목록 조회
> db.todos.find();  // 도큐멘트 목록 조회
```

### Mongoose

* [mongoose](http://mongoosejs.com/)는 몽고디비를 사용한 ORM (Object-relational mapping)
* 직접 몽고디비를 사용할 수도 있지만 추상화된 ORM 기능을 이용하여 빠르게 개발

```
$ npm install mongoose --save
```

* mongoose.model() 메소스로 모델링
* todos 컬렉션에 저장됨

```javascript
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
  title: String,
  completed: Boolean
});
```


## 테스트 (Mocha)

### Mocha

* [mocha](https://mochajs.org/)

```
$ npm instal mocha --save-dev
```

```javascript
// server/api/todo.spec.js
var assert = require('assert');

describe('test suite', function () {
  it('test unit', function () {
    assert.equal(true, true);
  })
});
```

```
$ node_modules/.bin/mocha server/api/todo.spec.js

  test suite
    ✓ test unit

  1 passing (9ms)
```

### Supertest

* [supertest](https://github.com/visionmedia/supertest)

```
$ npm isntall supertest --save-dev
```

```javascript
before('Init database', function (done) {
  mongoose.connect('mongodb://localhost:27017/todomvc_test', function (err) {
    if (err) throw err;
    done();
  });
});

after('Cleanup database', function (done) {
  mongoose.connection.db.dropDatabase(function () {
    done();
  });
});

it('POST /api/todos should return new todo', function (done) {
  request(app)
      .post('/api/todos')
      .send({title: 'new todo'})
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        assert.equal(res.body.hasOwnProperty('_id'), true);
        assert.equal(res.body.hasOwnProperty('title'), true);
        assert.equal(res.body.hasOwnProperty('completed'), true);
        done();
      })
});
```

## Should

* [should](https://github.com/shouldjs/should.js)

```
$ npm install should --save-dev
```

```javascript
res.body.should.have.properties('_id', 'title', 'completed');
res.body._id.should.be.type('string');
res.body.title.should.be.type('string');
res.body.completed.should.be.type('boolean');
```


## Reference

* [yeoman](http://yeoman.io/), The web's scaffolding tool
* [angular-fullstack](https://github.com/angular-fullstack/generator-angular-fullstack)
* [fullstack-demo](https://github.com/DaftMonk/fullstack-demo)
* [UI Bootstrap](http://angular-ui.github.io/bootstrap/)




### angular-fullstack
