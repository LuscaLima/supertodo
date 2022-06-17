import { ChangeEvent, useEffect, useState } from 'react'
import Modal from './components/Modal'
import Header from './components/Header'
import Footer from './components/Footer'
import Collection, { CollectionData } from './components/Collection'
import Todo, { TodoData } from './components/Todo'
import Form from './components/Form'
import Input from './components/Input'
import Textarea from './components/Textarea'
import Button from './components/Button'
import { CaretLeft, List, Plus } from 'phosphor-react'

import '@/scss/app.scss'

import noDataImage from '@/assets/img/no_data.svg'

const ls = localStorage

export default function App() {
  const INITIAL_COLLECTION = {} as CollectionData
  const INITAL_DELETE_CLOUSE = () => () => {}
  const fixedCollection: CollectionData = {
    id: 1,
    title: 'General',
    todosAmount: 0,
    todosDone: 0
  }
  const [collections, setCollections] = useState([fixedCollection])
  const [selectedCollection, setSelectedCollection] =
    useState(INITIAL_COLLECTION)
  const [newCollection, setNewCollection] = useState('')
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [showTodoModal, setShowTodoModal] = useState(false)
  const [showTodoDeleteModal, setShowTodoDeleteModal] = useState(false)
  const [todoDeleteClosure, setTodoDeleteClosure] =
    useState(INITAL_DELETE_CLOUSE)
  const [todos, setTodos] = useState<Record<number, TodoData[]>>({})

  function handleSelectCollection(collection: CollectionData) {
    setSelectedCollection(collection)
  }

  function getTodosAmount(collectionId: number) {
    return todos[collectionId]?.length ?? 0
  }

  function getTodosDone(collectionId: number) {
    return todos[collectionId]?.filter(todo => todo.done).length ?? 0
  }

  function toggleShowCollectionModal() {
    setShowCollectionModal(!showCollectionModal)
  }

  function handleInputNewCollection(event: ChangeEvent<HTMLInputElement>) {
    setNewCollection(event.target.value)
  }

  function handleAddNewCollection() {
    setCollections(state => {
      const newState = [
        ...state,
        {
          id: Date.now(),
          title: newCollection,
          todosAmount: 0,
          todosDone: 0
        }
      ]
      localStorage.setItem('collections', JSON.stringify(newState))
      return newState
    })
    setNewCollection('')
    toggleShowCollectionModal()
  }

  function toggleShowTodoModal() {
    setShowTodoModal(!showTodoModal)
  }

  function handleInputNewTodo(
    event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) {
    setNewTodo({
      ...newTodo,
      [event.target.name]: event.target.value
    })
  }

  function handleAddNewTodo() {
    const todosList = todos[selectedCollection.id] ?? []

    todosList.unshift({
      id: Date.now(),
      collectionId: selectedCollection.id,
      done: false,
      ...newTodo
    })

    setTodos(state => {
      const newState = {
        ...state,
        [selectedCollection.id]: todosList
      }
      localStorage.setItem('todos', JSON.stringify(newState))
      return newState
    })
    setNewTodo({ title: '', description: '' })
    toggleShowTodoModal()
  }

  function handleToggleDoneTodo(id: number) {
    const todosList = todos[selectedCollection.id]
    const todo = todosList.find(todo => todo.id === id)

    if (todo) {
      todo.done = !todo.done
    }

    setTodos(state => {
      const newState = {
        ...state,
        [selectedCollection.id]: todosList
      }
      ls.setItem('todos', JSON.stringify(newState))
      return newState
    })
  }

  function openTodoDeleteModal(id: number) {
    setShowTodoDeleteModal(true)
    setTodoDeleteClosure(() => () => handleDeleteTodo(id))
  }

  function closeTodoDeleteModal() {
    setShowTodoDeleteModal(false)
    setTodoDeleteClosure(INITAL_DELETE_CLOUSE)
  }

  function handleDeleteTodo(id: number) {
    const todosList = todos[selectedCollection.id]

    setTodos(state => {
      const newState = {
        ...state,
        [selectedCollection.id]: todosList.filter(todo => todo.id !== id)
      }
      ls.setItem('todos', JSON.stringify(newState))
      return newState
    })
    closeTodoDeleteModal()
  }

  function handleBackToCollections() {
    setSelectedCollection({} as CollectionData)
  }

  useEffect(() => {
    const persistedCollections = JSON.parse(ls.getItem('collections') ?? '[]')
    const persistedTodos = JSON.parse(ls.getItem('todos') ?? '{}')

    if (!persistedCollections.length) {
      ls.setItem('collections', JSON.stringify(collections))
    }

    setCollections(persistedCollections)
    setTodos(persistedTodos)
  }, [])

  const isCollectionSelected = !!Object.keys(selectedCollection).length
  const [generalCollection, ...allCollections] = collections
  const allTodos = todos[selectedCollection.id] ?? []

  return (
    <>
      <Modal
        title="New collection"
        show={showCollectionModal}
        okText="Add"
        okHandler={handleAddNewCollection}
        closeHandler={toggleShowCollectionModal}
      >
        <Form>
          <Input
            label="Title"
            value={newCollection}
            onInput={handleInputNewCollection}
          />
        </Form>
      </Modal>

      <Modal
        title="New Todo"
        show={showTodoModal}
        okText="Add"
        okHandler={handleAddNewTodo}
        closeHandler={toggleShowTodoModal}
      >
        <Form>
          <Input
            label="Title"
            name="title"
            value={newTodo.title}
            onInput={handleInputNewTodo}
          />
          <Input label="Collection" value={selectedCollection.title} disabled />
          <Textarea
            label="Description"
            name="description"
            value={newTodo.description}
            onInput={handleInputNewTodo}
          />
        </Form>
      </Modal>

      <Modal
        title="Delete todo"
        show={showTodoDeleteModal}
        okText="Delete"
        okHandler={todoDeleteClosure}
        closeHandler={closeTodoDeleteModal}
      >
        Do you really want to delete this Todo? This operation cannot be undone
      </Modal>

      <Header />
      <div className="container">
        {!isCollectionSelected ? (
          <>
            <div className="title">
              <h2>Collections</h2>
            </div>
            <div className="collections">
              <Collection
                id={generalCollection.id}
                title={generalCollection.title}
                todosAmount={getTodosAmount(generalCollection.id)}
                todosDone={getTodosDone(generalCollection.id)}
                onSelected={handleSelectCollection}
              />
              {allCollections.map(collection => (
                <Collection
                  key={collection.id}
                  id={collection.id}
                  title={collection.title}
                  todosAmount={getTodosAmount(collection.id)}
                  todosDone={getTodosDone(collection.id)}
                  onSelected={handleSelectCollection}
                />
              ))}
              <div
                className="new-collection"
                onClick={toggleShowCollectionModal}
              >
                <Plus />
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginTop: '1rem' }}>
              <Button
                selfType="secondary"
                rounded
                onClick={handleBackToCollections}
              >
                <CaretLeft size="1.5rem" />
              </Button>
            </div>
            <div className="title">
              <h2>
                <List />
                <strong>{selectedCollection.title}</strong> todos
              </h2>
              <Button onClick={toggleShowTodoModal}>
                <Plus /> New Todo
              </Button>
            </div>
            {allTodos.length ? (
              <div className="todos">
                {allTodos.map(todo => (
                  <Todo
                    key={todo.id}
                    {...todo}
                    toggleDone={handleToggleDoneTodo}
                    onDelete={openTodoDeleteModal}
                  />
                ))}
              </div>
            ) : (
              <div className="no-data">
                <img src={noDataImage} alt="This collection is empty" />
                <strong>This collection is empty</strong>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
