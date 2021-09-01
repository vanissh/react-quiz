import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-9f171-default-rtdb.firebaseio.com/'
})