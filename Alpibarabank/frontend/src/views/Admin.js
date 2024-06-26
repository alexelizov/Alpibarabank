import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Admin.css';

function Admin() {
  async function AddCalc() {
    const json = document.getElementById('json').value
    const login = document.getElementById('login').value
    const pass = document.getElementById('pass').value

    const loginApi = 'http://127.0.0.1:9001/login'
    let jwt
    const loginJson = {
      login: login,
      password: pass
    }

    await fetch(loginApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginJson)
    })
      .then((result) => result.json())
      .then((result) => {
        if (Object.hasOwn(result, 'token')) {
          jwt = result.token
        } else {
          document.getElementById('message').innerText = result.message
        }
      })

    if (jwt === null) {
      return
    }

    const api = 'http://127.0.0.1:9001/calculator/add'
    const obj = JSON.parse(json)
    const data = {
      token: jwt,
      calculator: obj
    }

    await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => {
        document.getElementById('message').innerText = result.message
      })
  }

  const exampleJson = {
    "nameCalc": "Test",
    "numberFields": [
      {
        "fieldName": "Field 1",
        "field": "a"
      },
      {
        "fieldName": "Field 2",
        "field": "b"
      },
      {
        "fieldName": "Field 3",
        "field": "c"
      }
    ],
    "formula": "a + b + c"
  }


  return (
    <>
      <Header />
      <div className='Admin'>
        <div className='content'>
          <p>Создать калькулятор:</p>
          <p>
            Для создания калькулятора используйте JSON. Вот пример кода:
          </p>
          <pre>
            {JSON.stringify(exampleJson, null, 2)}
          </pre>
          <p>nameCalc - это имя калькулятора</p>
          <p>
            numberFields - это поля калькулятора (JSON-массив объектов).
            Внутри каждого объекта в массиве есть 2 поля - field и fieldName.
            field - это внутреннее имя поля для формулы math.js.
            fieldName - это имя формы извне.
          </p>
          <p>formula - это формула в формате math.js</p>
          <textarea id="json" placeholder="Введите JSON-код" />
          <input id="login" type="text" placeholder="Введите логин от админа" />
          <input id="pass" type="password" placeholder="Введите пароль от админа" />
          <button id="create" onClick={() => AddCalc()}>Создать</button>
          <p id='message'></p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;