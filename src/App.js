import React, { useEffect, useState } from "react";

import "./styles.css";
import api from './services/api'

function App() {


  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadRepositories() {
      const { data } = await api.get('repositories')

      setRepositories([...repositories, ...data])
    }
    loadRepositories()
    // eslint-disable-next-line
  }, [])

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: 'https://github.com/filippinheiro/bligewater',
      techs: ['ReactJS', 'Node']
    })
    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      < ul data-testid="repository-list" >
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            )
          })
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
