import { useEffect, useState } from 'react'
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState( [] )

  async function getUsers(){
    const usersFromApi = await api.get('/servicos')

   setUsers(usersFromApi.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastro</h1>
        <input placeholder="Nome" name="name" type='text'/>
        <input placeholder="Login" name="login" type='text'/>
        <input placeholder="Senha" name="senha" type='password'/>
        <button type='button'>Cadastrar</button>
      </form>

      {users.map( user => (

      <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Login: <span>{user.login}</span></p>
          <p>Senha: <span>{user.senha}</span></p>
        </div>
        <button>
          <img src={Trash}/>
        </button>
      </div>

      ))}

    </div>
  )

}

export default Home